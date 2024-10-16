export default function contactForm(formId, jsonUrl, errorMessages, multipart, trackingInformations, jsonp = false) {
    return {
        isPosting: false,
        isWebview:false,
        ajaxTimeout: 60 * 1000,
        form: this.$refs[formId],
        formWrapper: this.$refs[formId].closest("#formWrapper"),
        actionUrl: this.form && this.form.getAttribute('action'),
        checkForJsonURL () {
            if (jsonUrl) {
                this.actionUrl = jsonUrl
            }
        },
        formInit(){
            this.checkForJsonURL()
            console.log("%cformId:", 'color: green' ,formId);
            console.log("%cform:", 'color: green' ,this.form);
            console.log("%cformWrapper:", 'color: green' ,this.formWrapper);
            console.log("%cactionUrl:", 'color: green' ,this.actionUrl);
            console.log("%cjsonUrl:", 'color: green', jsonUrl);
            console.log("%cerrorMessages:", 'color: green', errorMessages);
            console.log("%cmultipart:", 'color: green', multipart);
            console.log("%ctrackingInformations:", 'color: green', trackingInformations);
            
            this.$store.forms.submissionAttempted[formId] = false; 
        },
        clickHandler(event) {
            console.log("event:",event);
            console.log('check for Error:',formId); 
            console.log('form:',this.form);
     
            if(this.form.reportValidity()){
               // this.logData(event,form);
                this.handleSubmit(event,this.form)
            } else {
                this.$store.forms.submissionAttempted[formId] = true;
            }
        },
        logData(event,form) {
            // TODO - FOR DEBUGGIN CN BE REMOVED AT THE END
            const formData = new FormData(form);
            const fields = Array.from(form.elements);
            // Log the serialized form data
            console.log(fields);

            // Convert the FormData to a serialized string
            const serializedData = Array.from(formData.entries())
                .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                .join('&');

            // Log the serialized form data
            console.log('serialized DATA: ' + serializedData);
            console.log('DATA:', new URLSearchParams(new FormData(form)).toString());
            
        },
        // TODO - Validation error handler (adapt to your case)
        handleValidationErrors(errors) {
            console.log('Validation Errors:', errors);
            this.$store.forms.serverErrorFields[formId] = errors;
            console.log('Validation Errors in Store:', this.$store.forms.serverErrorFields);
        },
        resetValidationErrors() {    
            this.$store.forms.serverErrorFields[formId] = {}
        },
        
        handleSubmit(event, form ) {
            event.preventDefault();
        
            if (!this.isWebview) {
                //uxAction(trackingInformations); // Assuming this is a tracking library
            }
        
            if (this.isPosting) return;
            this.isPosting = true;
            
            // TODO mit alpine umsetzen
            //const preloadIcon = formWrapper.querySelector('.js-preloadIcon');
            //const loadingIcon = formWrapper.querySelector('.js-loadingIcon');
        
            // Show loading indicator
            //preloadIcon.classList.add('-isHidden');
            //loadingIcon.classList.remove('-isHidden');
        
            console.log('DATA:', new URLSearchParams(new FormData(form)).toString());
        
            // Define ajaxOptions based on form type (without jQuery $.ajax)
            let ajaxOptions = {
                method: jsonp ? 'GET' : 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                timeout: this.ajaxTimeout,
                body: new URLSearchParams(new FormData(form)),
            };
        
            if (jsonp) {
                ajaxOptions.url = this.actionUrl;
                ajaxOptions.headers['Content-Type'] = 'application/json; charset=utf-8';
                ajaxOptions.body = new URLSearchParams(new FormData(form)).toString(); // For JSONP case
            } else if (multipart) {
                ajaxOptions = {
                    method: 'POST',
                    url: this.actionUrl,
                    timeout: 600 * 1000,
                    body: new FormData(form), // No URLSearchParams, we use FormData for multipart
                    processData: false,
                    headers: {}
                };
            } else {
                ajaxOptions.url = `${this.actionUrl}?${responseFormatParam}`;
            }
        
            // Using fetch API instead of $.ajax
            fetch(ajaxOptions.url, ajaxOptions)
                .then(async (response) => {
                    const data = await response.text(); // Assuming the rponse is text or JSON
                    if (response.ok) {
                        console.log('Done');
                        console.log(data);
                        if (jsonUrl) {
                            const responseData = JSON.parse(data);
                            switch (responseData.status) {
                                case 'VALIDATION_ERROR':
                                    this.resetValidationErrors();
                                    this.handleValidationErrors(responseData.errors);
                                    break;
                                case 'OK':
                                    console.log("OK");
                                    this.replaceAnimated(
                                        this.formWrapper,
                                        this.form.querySelector('#successMessage').innerHTML,
                                        true
                                    ); 
                                    break;
                                default:
                                    console.log("default");
                                    this.replaceAnimated(
                                        this.formWrapper,
                                        this.form.querySelector('#errorMessage').innerHTML,
                                        true
                                    ); 
                                    break;
                            }
                        } else {
                            this.replaceAnimated(this.formWrapper, data, true);
                        }
/*         
                        if (eventOnSuccess) {
                            fireEvent(eventOnSuccess, true);
                        } */
        
/*                         if (rootElement.id) {
                            window.location.hash = rootElement.id;
                        } */
                    } else {
                        throw new Error('Network response was not ok.');
                    }
                })
                .catch((error) => {
                    console.error('Fail:', error);
                    this.replaceAnimated(
                        this.formWrapper,
                        '<div class="c-form success">Das hat leider nicht funktioniert!</div>',
                        true
                    );
                })
                .finally(() => {
                    console.log('Always');
                    // TODO MIT ALPINE UMSETZEN
                    //preloadIcon.classList.remove('-isHidden');
                    //loadingIcon.classList.add('-isHidden');
                    this.isPosting = false;
                });
        },
        // Helper function to replace content with animation (replacing hrQuery's replaceAnimated)
        replaceAnimated(wrapper, newContent, withFade = true)  {
            if (withFade) {
                wrapper.style.opacity = 0;
                setTimeout(() => {
                    wrapper.innerHTML = newContent;
                    wrapper.style.opacity = 1;
                }, 300);
            } else {
                wrapper.innerHTML = newContent;
            }
        },
        // Fire event utility (could be Alpine.js specific or custom)
        fireEvent(eventName, success){
            const event = new CustomEvent(eventName, { detail: success });
            document.dispatchEvent(event);
        },
        getSubmissionAttempted() {
            return this.$store.forms.submissionAttempted[formId]
        }
        
    }
}


