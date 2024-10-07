export default function contactForm(formId) {
    return {
        formInit(){
            this.$store.forms.submissionAttempted[formId] = false;
            console.log("this.$store.forms.submissionAttempted",this.$store.forms.submissionAttempted[formId]);
        },
        clickHandler() {
            console.log('check for Error:',formId);
            const form = this.$refs[formId];
            console.log('form',form);
            const formData = new FormData(form);
            const fields = Array.from(form.elements); // Array of all form fields

            // Loop through each field, focus it, blur it, and serialize the data
        
            if(form.reportValidity()){
                this.submitData();
            } else {
                this.$store.forms.submissionAttempted[formId] = true;
            }
        },
        submitData() {
            const formData = new FormData(this.$refs[formId]);
            // Convert the FormData to a serialized string
            const serializedData = Array.from(formData.entries())
                .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                .join('&');

            // Log the serialized form data
            console.log('DATA: ' + serializedData);
        },
        getSubmissionAttempted() {
            return this.$store.forms.submissionAttempted[formId]
        }
    }
}