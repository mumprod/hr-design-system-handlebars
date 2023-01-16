export default function contentNavigationHandler(id) {
    return {
        open: false,
        contentNavDropdownIsOpen: false,

        shouldContentBeShown(teasersize, isDropdown, isMixed) {
            return this.contentNavDropdownIsOpen          
        }
    }
}
