export default function inputHandler(element, formId, errorMandatory, type, errorEmail, prefilledText = '') {
    return { 
        [element]: prefilledText,
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
                return errorMandatory
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
                    return Boolean((!this.valid && this.wasFocused && !this.isFocused) || (!this.valid && !this.isFocused && this.$store.forms.submissionAttempted[formId]));
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
        }
    };
}