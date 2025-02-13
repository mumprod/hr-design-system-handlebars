import { uxAction } from 'base/tracking/pianoHelper.subfeature'

export default function contactForm(formId, jsonUrl, errorMessages, multipart, trackingInformations, hasSpamProtection, jsonp = false) {
    return {
        isPosting: false,
        wasPosted: false,
        wasPostedWithSuccess: false,
        wasPostedWithError: false,
        isWebview: window.parent.document.documentElement.classList.contains('webview'),
        ajaxTimeout: 60 * 1000,
        form: this.$refs[formId],
        formWrapper: this.$refs[formId].closest("#formWrapper"),
        honeypot: this.$refs[formId].querySelector('input[data-name="x-message"]'),
        actionUrl: this.form && this.form.getAttribute('action'),
        interacted: true,

        checkForJsonURL () {
            if (jsonUrl) {
                this.actionUrl = jsonUrl
            }
        },
        formInit(){
            
            this.checkForJsonURL()
            this.$store.forms.submissionAttempted[formId] = false; 
            this.$store.forms.errorMessages = JSON.parse(errorMessages.replace(/&quot;/g,'"'))
            console.log('hasSpamProtection:', hasSpamProtection);
            if(hasSpamProtection){
                console.log('Spam Protection');
                this.initSpamProtection();
            }

        },
        initSpamProtection(){
            this.interacted = false;
            addEventListener('mousemove', () => this.interacted = true );
            addEventListener('keypress', () => this.interacted = true );
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
            if (this.honeypot) {
                this.honeypot.removeAttribute('required');
            }
            if(this.form.reportValidity() && this.interacted){                  
                this.handleSubmit(event,this.form)                                       
            } else {
                this.scrollToElementAndCenterWithTimeout(document.activeElement, 50)    
                if (this.honeypot) {
                    this.honeypot.setAttribute('required', '');
                }            
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
            console.log('ajaxOptions:', ajaxOptions);
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