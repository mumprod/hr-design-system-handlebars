export default function selectHandler(element) {
    return { 
        [element]: '',
        valid: false, 
        wasFocused: false, 
        isFocused: false,
        validEmail: false,
        hideDescription() {             
            return Boolean(!this.valid && this.wasFocused && !this.isFocused)            
        },
        hideError() { 
            return Boolean(!this.hideDescription())  
        } 
    };
}