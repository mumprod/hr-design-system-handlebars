export default function inputHandler(element, formId, errorMandatory, type, errorEmail, prefilledText = '', name) {
    return { 
        [element]: prefilledText,
        valid: false, 
        wasFocused: false, 
        isFocused: false,
        typeMismatch: true,
        valueMissing: true,
        outputText: "",
        isFileSelected: false,

        setFile(event) {
            const file = event.target.files[0];
            if (file) {
                this.fileName = file.name;
                this.isFileSelected = true;
            }
            else{
                this.fileName = "";
                this.isFileSelected = false;
            }
        },
        getFileName() {
            return this.fileName;
        },
        clearFile() {
            this.fileName = "";
            this.isFileSelected = false;
            this.valid = false;
            var uploadEelement = document.getElementById(element);
            uploadEelement.value = null;
        },

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
                    //to-do: Server error
                    return Boolean((!this.valid && this.wasFocused && !this.isFocused) || (!this.valid && !this.isFocused && this.$store.forms.submissionAttempted[formId]));
                case "upload":
                    return Boolean((!this.valid && this.wasFocused && !this.isFocused) || (!this.valid && !this.isFocused && this.$store.forms.submissionAttempted[formId]) || (this.hasServerError() && !this.isFocused ));
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
        validateUpload() {
            var choice = document.getElementById(element)  
            this.valid = choice.checkValidity()
        },
        hasServerError() {
            return Boolean(this.$store.forms.serverErrorFields[formId]?.[name]);
        },
        getServerError() {
            let errorName = this.$store.forms.serverErrorFields[formId][name]
            let serverError = this.$store.forms.errorMessages[errorName] 
            return serverError
        }
    };
}