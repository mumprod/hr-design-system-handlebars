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
            this.$store.forms.submissionAttempted[formId] = false; 
            this.$store.forms.errorMessages = JSON.parse( "{" + errorMessages.replace(/&quot;/g,'"') + "}")

            console.log("%cformId:", 'color: green' ,formId);
            console.log("%cform:", 'color: green' ,this.form);
            console.log("%cformWrapper:", 'color: green' ,this.formWrapper);
            console.log("%cactionUrl:", 'color: green' ,this.actionUrl);
            console.log("%cjsonUrl:", 'color: green', jsonUrl);
            console.log("%cerrorMessages:", 'color: green', errorMessages);
            console.log("%cerrorMessages store:", 'color: green', this.$store.forms.errorMessages);
            console.log("%cmultipart:", 'color: green', multipart);
            console.log("%ctrackingInformations:", 'color: green', trackingInformations);
 
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
                // TODO TRACKING
                // uxAction(trackingInformations); 
            }
        
            if (this.isPosting) return;
            this.isPosting = true;
            
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
                                    //TODO: replaceAnimated mit alpine umsetzen
                                    this.replaceAnimated(
                                        this.formWrapper,
                                        this.form.querySelector('#successMessage').innerHTML,
                                        true
                                    ); 
                                    break;
                                default:
                                    console.log("default");
                                    //TODO: replaceAnimated mit alpine umsetzen
                                    this.replaceAnimated(
                                        this.formWrapper,
                                        this.form.querySelector('#errorMessage').innerHTML,
                                        true
                                    ); 
                                    break;
                            }
                        } else {
                            //TODO: replaceAnimated mit alpine umsetzen
                            this.replaceAnimated(this.formWrapper, data, true);
                        }
                        if (formId) {
                            window.location.hash = formId;
                        } 
                    } else {
                        throw new Error('Network response was not ok.');
                    }
                })
                .catch((error) => {
                    console.error('Fail:', error);
                    //TODO: replaceAnimated mit alpine umsetzen
                    this.replaceAnimated(
                        this.formWrapper,
                        '<div class="c-form success">Das hat leider nicht funktioniert!</div>',
                        true
                    );
                })
                .finally(() => {
                    console.log('Always');
                    this.isPosting = false;
                });
        },
        // Helper function to replace content with animation (replacing hrQuery's replaceAnimated)
        // TODO: replaceAnimated mit alpine umsetzen
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
        getSubmissionAttempted() {
            return this.$store.forms.submissionAttempted[formId]
        }        
    }
}