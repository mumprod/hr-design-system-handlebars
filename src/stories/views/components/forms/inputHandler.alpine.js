export default function inputHandler(element, formId, errorMandatory, type, errorEmail, prefilledText = '') {
    return { 
        [element]: prefilledText,
        name: document.getElementById(element).getAttribute("name"),
        valid: false, 
        wasFocused: false, 
        isFocused: false,
        isChecked: false,
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
        hideDescription() {
            switch (type) {
                case "email":
                    return Boolean((!this.valid && this.wasFocused && !this.isFocused) || (this.typeMismatch && this.wasFocused && !this.isFocused) || (!this.valid && !this.isFocused && this.$store.forms.submissionAttempted[formId]));
                case "checkbox":
                    return Boolean(!this.valid && this.wasFocused && !this.isFocused && !this.isChecked || (!this.valid && !this.isFocused && this.$store.forms.submissionAttempted[formId]));
                case "select":
                    return Boolean((!this.valid && this.wasFocused && !this.isFocused) || (!this.valid && !this.isFocused && this.$store.forms.submissionAttempted[formId]))
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
        hasServerError() {
            return Boolean(this.$store.forms.serverErrorFields[formId][this.name])
        },
        getServerError() {
            let serverError = "Server Error: "
            switch (this.$store.forms.serverErrorFields[formId][this.name]) {

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