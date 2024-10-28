import { uxAction } from 'base/tracking/pianoHelper.subfeature'

export default function contactForm(formId, jsonUrl, errorMessages, multipart, trackingInformations, jsonp = false) {
    return {
        isPosting: false,
        wasPosted: false,
        wasPostedWithSuccess: false,
        wasPostedWithError: false,
        isWebview: window.parent.document.documentElement.classList.contains('webview'),
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
        },
        submitButtonHandler(event) {
            if(this.form.reportValidity()){
                this.handleSubmit(event,this.form)
            } else {
                this.$store.forms.submissionAttempted[formId] = true;
            }
        },
        retryHandler() {
            this.wasPosted = false;
            this.wasPostedWithError = false;  
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
                uxAction(trackingInformations); 
            }
        
            if (this.isPosting) return;
            this.isPosting = true;
            
            console.log('DATA:', new URLSearchParams(new FormData(form)).toString());
        
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
                ajaxOptions.body = new URLSearchParams(new FormData(form)).toString(); 
            } else if (multipart) {
                ajaxOptions = {
                    method: 'POST',
                    url: this.actionUrl,
                    timeout: 600 * 1000,
                    body: new FormData(form), 
                    processData: false,
                    headers: {}
                };
            } else {
                ajaxOptions.url = `${this.actionUrl}?${responseFormatParam}`;
            }
        
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
                                    break;
                                default:
                                    console.log("default");
                                    this.wasPosted = true;
                                    this.wasPostedWithError = true;
                                    break;
                            }
                        } else {
                            
                            this.wasPosted = true;
                            this.wasPostedWithError = true;
                        }
                        if (formId) {
                            window.location.hash = formId;
                        } 
                    } else {
                        this.wasPosted = true;
                        this.wasPostedWithError = true;
                        throw new Error('Network response was not ok.');
                        
                    }
                })
                .catch((error) => {
                    console.error('Fail:', error);
                    this.wasPosted = true;
                    this.wasPostedWithError = true;
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