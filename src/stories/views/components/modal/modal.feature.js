import DefaultModal from 'components/modal/defaultModal.subfeature'
import UserConsentModal from 'components/modal/userConsentModal.subfeature'

const Modal = (context) => {
    const { options } = context,
        { element: rootElement } = context,
        type = options.type || "default"

    switch (type) {
        case "userConsent":
            new UserConsentModal(options, rootElement)
            break;
        default:
            new DefaultModal(options, rootElement)
            break;
    }
}

export default Modal
