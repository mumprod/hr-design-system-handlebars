export default function contentNavigationHandler(id) {
    return {
        open: false,
        contentNavDropdownIsOpen: false,

        shouldDropdownBeShown(teasersize, isDropdown, isMixed) {
            if (isDropdown) {
                return true
            }

            if (isMixed) {
                if (teasersize === 100 || teasersize === 66 || teasersize === 50) {
                    if (this.$screen('lg')) return false
                    if (this.$screen('md')) return false
                    if (this.$screen('xs')) return true
                } else if (teasersize === 33 || teasersize === 25) {
                    return true
                }
            }
        },

        shouldContentBeShown(teasersize, isDropdown, isMixed) {
            if (isDropdown) {
                return this.contentNavDropdownIsOpen
            }
            if (isMixed) {
                if (teasersize === 100 || teasersize === 66 || teasersize === 50) {
                    if (this.$screen('lg')) return true
                    if (this.$screen('md')) return true
                    if (this.$screen('xs')) return this.contentNavDropdownIsOpen
                } else if (teasersize === 33 || teasersize === 25) {
                    return this.contentNavDropdownIsOpen
                }
            }

            return false
        },
        chooseListItemStyles(teasersize, isList, isMixed, isDropdown, isFlow) {
            let classes = []
            console.log(`teasersize:${teasersize}`)

            switch (teasersize) {
                case 100:
                    classes.push('w-full', 'md:w-fit')
                    isList
                        ? classes.push('border', 'hover:no-underline')
                        : isMixed
                        ? classes.push(
                              '!w-full',
                              'md:!w-fit',
                              '!mb-0',
                              'mx-2',
                              'md:!mb-2',
                              'md:mr-2',
                              'border-l-0',
                              'border-r-0',
                              'border-t-0',
                              'border-b',
                              'last:border-b-0',
                              'md:!border',
                              'md:border-content-nav',
                              'border-gray-400',
                              'hover:underline',
                              'hover:text-content-nav',
                              'hover:!bg-white',
                              'hover:!fill-content-nav',
                              'md:hover:no-underline',
                              'md:hover:text-white',
                              'md:hover:!bg-content-nav',
                              'md:hover:!fill-white'
                          )
                        : isDropdown
                        ? classes.push(
                              '!w-full',
                              'ml-0',
                              'md:!w-full',
                              'md:mb-0',
                              'md:!mr-0',
                              'border-gray-400',
                              'border-l-0',
                              'border-r-0',
                              'border-t-0',
                              'border-b',
                              'last:border-b-0',
                              'hover:underline',
                              'hover:text-content-nav',
                              'hover:!bg-white',
                              'hover:!fill-content-nav'
                          )
                        : isFlow
                        ? classes.push('!w-fit', 'border', 'hover:no-underline')
                        : ''
                    break
                case 66:
                    classes.push('w-fit')
                    isList == true
                        ? classes.push('border', 'mb-2', 'mr-2', 'md:!mr-2', 'hover:no-underline')
                        : isMixed
                        ? classes.push(
                              '!w-full',
                              'md:!w-fit',
                              '!mb-0',
                              'md:!mb-2',
                              'md:mr-2',
                              'border-l-0',
                              'border-r-0',
                              'border-t-0',
                              'border-b',
                              'last:border-b-0',
                              'md:!border',
                              'hover:text-content-nav',
                              'hover:!fill-content-nav',
                              'hover:!bg-white',
                              'md:hover:!bg-content-nav',
                              'md:hover:!text-white',
                              'md:hover:no-underline',
                              'md:hover:!fill-white'
                          )
                        : isDropdown
                        ? classes.push(
                              '!w-full',
                              'md:!w-full',
                              'md:mb-0',
                              'md:!mr-0',
                              'border-l-0',
                              'border-r-0',
                              'border-t-0',
                              'border-b',
                              'last:border-b-0',
                              'hover:underline',
                              'hover:text-content-nav',
                              'hover:!bg-white',
                              'hover:!fill-content-nav'
                          )
                        : isFlow
                        ? classes.push('!w-fit', 'border', 'hover:no-underline')
                        : ''
                    break
                case 50:
                    classes.push('w-full')
                    isList
                        ? classes.push('border', 'hover:no-underline')
                        : isMixed
                        ? classes.push(
                              '!w-full',
                              'border',
                              'md:mb-2',
                              'last:mb-0',
                              'border-gray-400',
                              'border-l-0',
                              'border-r-0',
                              'border-t-0',
                              'md:border',
                              'md:border-content-nav',
                              'hover:underline',
                              'hover:!bg-white',
                              'hover:text-content-nav',
                              'hover:fill-content-nav',
                              'md:hover:!bg-content-nav',
                              'md:hover:!text-white',
                              'md:hover:fill-white',
                              'md:hover:no-underline'
                          )
                        : isDropdown
                        ? classes.push(
                              '!w-full',
                              'md:!w-full',
                              'md:mb-0',
                              'md:!mr-0',
                              'border-l-0',
                              'border-r-0',
                              'border-t-0',
                              'border-b',
                              'last:border-b-0',
                              'border-gray-400',
                              'hover:underline',
                              'hover:!text-content-nav',
                              'hover:!bg-white',
                              'hover:!fill-content-nav'
                          )
                        : isFlow
                        ? classes.push('!w-fit', 'border', 'hover:no-underline')
                        : ''
                    break
                case 33:
                    classes.push('w-full')
                    isList
                        ? classes.push('border', 'hover:no-underline')
                        : isMixed
                        ? classes.push(
                              '!w-full',
                              '!mb-0',
                              'border-b',
                              'last:border-b-0',
                              'hover:!bg-white',
                              'hover:underline',
                              'hover:text-content-nav',
                              'hover:!fill-content-nav'
                          )
                        : isDropdown
                        ? classes.push(
                              '!w-full',
                              'md:!w-full',
                              'md:mb-0',
                              'md:!mr-0',
                              'border-l-0',
                              'border-r-0',
                              'border-t-0',
                              'border-b',
                              'last:border-b-0',
                              'hover:underline',
                              'hover:!text-content-nav',
                              'hover:!bg-white',
                              'hover:!fill-content-nav'
                          )
                        : isFlow
                        ? classes.push('!w-fit', '!mr-2', 'border', 'mb-2', 'hover:no-underline')
                        : ''
                    break
                case 25:
                    classes.push('w-full')
                    isList
                        ? classes.push('border', 'hover:no-underline')
                        : isMixed
                        ? classes.push(
                              '!w-full',
                              '!mb-0',
                              'border-b',
                              'last:border-b-0',
                              'hover:!bg-white',
                              'hover:underline',
                              'hover:!text-content-nav',
                              'hover:!fill-content-nav'
                          )
                        : isDropdown
                        ? classes.push(
                              '!w-full',
                              'md:!w-full',
                              'md:mb-0',
                              'md:!mr-0',
                              'border-l-0',
                              'border-r-0',
                              'border-t-0',
                              'border-b',
                              'last:border-b-0',
                              'hover:underline',
                              'hover:text-content-nav',
                              'hover:!bg-white',
                              'hover:!fill-content-nav'
                          )
                        : isFlow
                        ? classes.push('!w-fit', '!mr-2', 'border', 'mb-2', 'hover:no-underline')
                        : ''
                    break
            }
            for (let i = 0; i < classes.length; i++) {
                this.$el.classList.add(classes[i])
            }
        },
    }
}
