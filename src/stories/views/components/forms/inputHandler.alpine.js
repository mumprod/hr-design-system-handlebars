export default function inputHandler(element, errorMandatory, errorEmail, isEmail = false, prefilledText = '') {
    return { 
        [element]: prefilledText,
        valid: false, 
        wasFocused: false, 
        isFocused: false,
        validEmail: false,
        errorMessage() { 
            if( Boolean(isEmail)){
                return !this.valid ? errorMandatory : errorEmail
            } else {
                return errorMandatory
            }
        },
        hideDescription() { 
            if( Boolean(isEmail)){
                return Boolean((!this.valid && this.wasFocused && !this.isFocused) || (!this.validEmail && this.wasFocused && !this.isFocused))
            } else {
                return Boolean(!this.valid && this.wasFocused && !this.isFocused)
            }
        },
        hideError() { 
                return Boolean(!this.hideDescription())  
        },
        validateEmail() {
            var emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
            this.validEmail = emailRegex.test( this[element]);  
        }  
    };
}