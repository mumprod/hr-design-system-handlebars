export default function inputHandler(element, formId, errorMandatory, type, errorEmail, prefilledText = '', name) {
    return { 
        [element]: prefilledText,
        valid: false, 
        wasFocused: false, 
        isFocused: false,
        typeMismatch: true,
        valueMissing: true,

        errorMessage() { 
            if( type == "email"){
                return this.valueMissing ? errorMandatory : errorEmail
            } 
            else {
                if(this.hasServerError()){
                    return this.getServerError()
                } else {
                    return errorMandatory
                }
            }
        },
        anyChecked() {
            var formElement = document.getElementById(formId);
            var form_data = new FormData(formElement)
            if(form_data.has(name)){
                this.valid = true
            }else{
                this.valid = false
            }
        },
        hideDescription() {
            switch (type) {
                case "email":
                    return Boolean((!this.valid && this.wasFocused && !this.isFocused) || (this.typeMismatch && this.wasFocused && !this.isFocused) || (!this.valid && !this.isFocused && this.$store.forms.submissionAttempted[formId]) || (this.hasServerError() && !this.isFocused ));
                case "checkbox":
                    return Boolean((!this.valid && this.wasFocused && !this.isFocused) || (!this.valid && !this.isFocused && this.$store.forms.submissionAttempted[formId]) || (this.hasServerError() && !this.isFocused ));
                case "select":
                    return Boolean((!this.valid && this.wasFocused && !this.isFocused) || (!this.valid && !this.isFocused && this.$store.forms.submissionAttempted[formId]) || (this.hasServerError() && !this.isFocused ));
                case "choice-group":
                    return Boolean((!this.valid && this.wasFocused && !this.isFocused) || (!this.valid && !this.isFocused && this.$store.forms.submissionAttempted[formId]));
                default:
                    return Boolean((!this.valid && this.wasFocused && !this.isFocused) || (!this.valid && !this.isFocused && this.$store.forms.submissionAttempted[formId]) || (this.hasServerError() && !this.isFocused ));
            }
        },
        hideError() { 
            return Boolean(!this.hideDescription())  
        },
        validateField() {
            var field = document.getElementById(element)  
            this.typeMismatch = field.validity.typeMismatch;
            this.valueMissing  = field.validity.valueMissing;
            this.valid = field.checkValidity()
        },
        validateChoice() {
            var choice = document.getElementById(element)  
            this.valid = choice.checkValidity()
        },
        hasServerError() {
            return Boolean(this.$store.forms.serverErrorFields[formId]?.[name]);
        },
        getServerError() {
            let serverError = "Server Error: "
            switch (this.$store.forms.serverErrorFields[formId][name]) {

                case 'form_error_required':
                    serverError += "Pflichtfeld"
                    break
                case 'form_error_max':
                    serverError += "Zu viele Zeichen"
                    break
                case 'form_error_validurl':
                    serverError += "Ungültige URL"
                    break
                case 'form_error_empty':
                    serverError += "Darf nicht ausgefüllt werden"
                    break
                case 'form_error_constants_or_null':
                    serverError += "Ungültiger Wert"
                    break
                case 'form_error_constants':
                    serverError += "Ungültiger Wert"
                    break
                case 'form_error_max_multivalue':
                    serverError += "Die maximale Anzahl an Antwortmöglichkeiten wurde überschritten"
                    break
                case 'vote_error_identity_already_used':
                    serverError += "Unter dieser E-Mail-Adresse wurde bereits abgestimmt. Eine weitere Abstimmung ist nicht möglich."
                    break
                case 'vote_error_token_request_count_exceeded':
                    serverError += "Die maximale Anzahl an Bestätigungs-E-Mails wurde bereits verschickt."   
                    break               
                case 'form_error_email':
                    serverError += "Ungültige E-Mail-Adresse"   
                    break 
                default:
                    return false     
            }
            return serverError
        }
    };
}