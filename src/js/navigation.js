const $ = require('jquery')
const templates = require('../templates/navigation')

module.exports = class Navigation {
  constructor ($el, entries) {
    this.$el = $el
    this.entries = entries.entries
    this.categories = entries.categories
    this.hiddenClass = 'hidden'

    let $categories = this.generateCategoriesList(this.categories)

    $categories.removeClass(this.hiddenClass).appendTo(this.$el)
  }

  generateCategoriesList (categories) {
    let listTemplate = templates.categoriesList
    let $categoryList = $(listTemplate)

    for (let category of categories) {
      let itemTemplate = templates.categoriesItem(category)
      let $categoryItem = $(itemTemplate)

      if (category.categories) {
        let $subList = this.generateCategoriesList(category.categories)
        $subList.appendTo($categoryItem)
      }

      let $entriesList = this.generateEntriesList(category.slug)

      if ($entriesList) {
        $entriesList.addClass(this.hiddenClass).appendTo($categoryItem)
        $categoryItem.appendTo($categoryList)
      }
    }

    return $categoryList.addClass(this.hiddenClass)
  }

  generateEntriesList (categorySlug) {
    let entries = this.entries[categorySlug]

    if (!entries) {
      console.log('Can not find entries of category', categorySlug)
      return false
    }

    let listTemplate = templates.entriesList
    let $entriesList = $(listTemplate)

    for (let entry of entries) {
      let itemTemplate = templates.entriesItem(entry)
      $(itemTemplate).appendTo($entriesList)
    }

    return $entriesList
  }
}
