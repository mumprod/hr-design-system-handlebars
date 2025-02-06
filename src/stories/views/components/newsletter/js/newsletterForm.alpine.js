import { uxAction } from 'base/tracking/pianoHelper.subfeature'

export default function newsletterForm(formId,trackingInformations) {
    return {
        isPosting: false,
        wasPosted: false,
        wasPostedWithSuccess: false,
        wasPostedWithError: false,
        wasPostedAlreadyRegistered: false,
        isWebview: window.parent.document.documentElement.classList.contains('webview'),
        ajaxTimeout: 60 * 1000,
        form: this.$refs[formId],
        formWrapper: this.$refs[formId].closest("#formWrapper"),
        actionUrl: "",
        formInit(){
            this.$store.forms.submissionAttempted[formId] = false; 
            //this.$store.forms.errorMessages = JSON.parse(errorMessages.replace(/&quot;/g,'"'))
            this.actionUrl = this.form.getAttribute('action')
            console.log("FORMID: "+formId)
            console.log("FORM: ", this.form)
            console.log("ACTION: "+this.actionUrl)
            console.log("GETATTRIBUTE "+ this.form.getAttribute('action'))
        },
        scrollToElementAndCenterWithTimeout(element, timeout){
            setTimeout(() => {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                 });
             }, timeout);
        },
        submitButtonHandler(event) {
            this.$store.forms.submissionAttempted[formId] = true;
            if(this.form.reportValidity()){               
                this.handleSubmit(event)
            } else {
                this.scrollToElementAndCenterWithTimeout(document.activeElement, 50)                
            }
        },
        retryHandler() {
            this.wasPosted = false;
            this.wasPostedWithError = false;
            this.scrollToElementAndCenterWithTimeout(this.formWrapper.previousElementSibling, 50)
            
        },
        handleValidationErrors(errors) {
            console.log('Validation Errors:', errors);
            this.$store.forms.serverErrorFields[formId] = errors;
            console.log('Validation Errors in Store:', this.$store.forms.serverErrorFields);
        },
        resetValidationErrors() {    
            this.$store.forms.serverErrorFields[formId] = {}
        },
        async postData() {
            const formData = new FormData(this.form)
            // use timestamp in seconds because the newsletter tool cannot handle milliseconds
            formData.set('confirm-data-protection', Math.ceil(Date.now() / 1000))
    
            const response = await fetch(this.actionUrl, {
                method: 'POST',
                body: formData,
            })
            return response
        },
        handleSubmit (event) {
            event.preventDefault();
        
            if (!this.isWebview) {    
                uxAction(trackingInformations); 
            }
        
            if (this.isPosting) return;
            this.isPosting = true;

            this.postData()
                .then(async response => {
                    console.log(await response)
                    if (!response.ok) {
                       
                        throw new Error('Netzwerk- oder Serverfehler')
                    }
                    return response
                })
                .then(async response => {
                    const data = await response.text();
                    const responseData = JSON.parse(data);
                    console.log(responseData);
                    switch (responseData.status) {
                        case 'OK':
                            console.log("OK");
                            this.wasPosted = true;
                            this.wasPostedWithSuccess = true;
                            this.scrollToElementAndCenterWithTimeout(this.formWrapper.previousElementSibling, 0)
                            break
                        case 'no_valid_newsletters':
                            console.log("Already registered");
                            this.wasPosted = true;
                            this.wasPostedAlreadyRegistered = true;
                            this.scrollToElementAndCenterWithTimeout(this.formWrapper.previousElementSibling, 0)
                            break
                        default:
                            console.log("default");
                            this.wasPosted = true;
                            this.wasPostedWithError = true;
                            this.scrollToElementAndCenterWithTimeout(this.formWrapper.previousElementSibling, 0)
                            
                    }
                })
                .catch((error) => {
                    console.error('Beim Ausführen des Fetch ist ein Fehler aufgetreten.', error)
                    this.wasPosted = true;
                    this.wasPostedWithError = true;
                    this.scrollToElementAndCenterWithTimeout(this.formWrapper.previousElementSibling, 0)
                })
        },   
        handleOldSubmit(event, form ) {
            event.preventDefault();
        
            if (!this.isWebview) {    
                uxAction(trackingInformations); 
            }
        
            if (this.isPosting) return;
            this.isPosting = true;
            
            console.log('DATA:', new URLSearchParams(new FormData(form)).toString());
        
            let ajaxOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                timeout: this.ajaxTimeout,
                body: new URLSearchParams(new FormData(form)),
            };
                
            fetch(ajaxOptions.url, ajaxOptions)
                .then(async (response) => {
                    const data = await response.text();
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
                                    this.wasPosted = true;
                                    this.wasPostedWithSuccess = true;
                                    this.scrollToElementAndCenterWithTimeout(this.formWrapper.previousElementSibling, 0)
                                    
                                    break;
                                default:
                                    console.log("default");
                                    this.wasPosted = true;
                                    this.wasPostedWithError = true;
                                    this.scrollToElementAndCenterWithTimeout(this.formWrapper.previousElementSibling, 0)
                                    break;
                            }
                        } else {
                            
                            this.wasPosted = true;
                            this.wasPostedWithError = true;
                            this.scrollToElementAndCenterWithTimeout(this.formWrapper.previousElementSibling, 0)
                        }
                        if (formId) {
                            window.location.hash = formId;
                        } 
                    } else {
                        this.wasPosted = true;
                        this.wasPostedWithError = true;
                        this.scrollToElementAndCenterWithTimeout(this.formWrapper.previousElementSibling, 0)
                        throw new Error('Network response was not ok.');
                        
                        
                    }
                })
                .catch((error) => {
                    console.error('Fail:', error);
                    this.wasPosted = true;
                    this.wasPostedWithError = true;
                    this.scrollToElementAndCenterWithTimeout(this.formWrapper.previousElementSibling, 0)
                })
                .finally(() => {
                    console.log('Always');
                    this.isPosting = false;
                });
        },
        getSubmissionAttempted() {
            return this.$store.forms.submissionAttempted[formId]
        }        
    }
}