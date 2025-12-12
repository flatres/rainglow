<template>
    <q-select
      v-if='categoriesOptions.length > 0'
      ref="categories"
      class="col text-bold q-ml-sm"
      :outlined = '!filled'
      :filled = 'filled'
      square
      dense
      v-model="category"
      :options="categoriesOptionsFiltered"
      @update:model-value="addCategory"
      :label="label"
      :bg-color="dark? 'primary' : 'white'"
      :dark="dark"
      use-input
      hide-selected
      fill-input
      input-debounce="0"
      :popup-content-style="popupStyle"
      @filter="categoryFilterFn"
  />
</template>

<script>
// import { useI18n } from 'vue-i18n'
// inside of a Vue file
import { useQuasar } from 'quasar'
import SelectApi from '../api/user/selectApi.js'

export default {
  name: 'category-select',
  props: {
    exclusions: {
      type: Array,
      default: () => []
    },
    categoryId: {
      type: Number
    },
    keep: {
      type: Boolean,
      default: false
    },
    any: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Search'
    },
    available: {
      type: Boolean,
      default: false
    },
    courses: {
      type: Boolean,
      default: false
    },
    providers: {
      type: Boolean,
      default: false
    },
    filled: {
      type: Boolean,
      default: false
    },
    courseCountryId: {
      type: Number
    },
    dark: {
      type: Boolean
    }
  },
  emits: ['change', 'update:categoryId'],
  data () {
    return {
      categories: [],
      categoriesOptions: [],
      categoriesOptionsFiltered: [],
      category: null,
      $q: useQuasar(),
      loading: true
    }
  },
  methods: {
    processCategories (data) {
      if (this.any && this.loading) data.unshift({ id: 0, name: 'All' })
      this.categoriesOptions = data.map(x => {
        if (this.exclusions.find(y => y.value === x.id)) {
          return null
        }
        return {
          value: x.id,
          label: x.name
        }
      })
      this.categories = data
      this.categoriesOptions = this.categoriesOptions.filter(x => x !== null)
      this.categoriesOptionsFiltered = this.categoriesOptions

      if (this.categoryId !== null && this.loading) {
        this.category = this.categoriesOptions.find(x => x.value === this.categoryId)
      }
      this.loading = false
    },
    categoryFilterFn (val, update, abort) {
      update(() => {
        if (!val) return this.categoriesOptions
        const needle = val.toLowerCase()
        this.categoriesOptionsFiltered = this.categoriesOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    addCategory (value) {
      this.$emit('update:categoryId', this.category.value)
      if (this.category) this.$emit('change', this.category)

      if (!this.keep) {
        this.category = null
        this.$refs.categories.updateInputValue(null)
      }
      console.log('here')
      // this.$refs.categories.hidePopup()
      this.$refs.categories.blur()
      this.$refs.categories.setOptionIndex(-1)
      this.processCategories(this.categories)
    }
  },
  computed: {
    popupStyle () {
      if (this.dark) {
        return 'color: white!important; background: var(--q-primary); width: 300px'
      } else {
        return ''
      }
    }
  },
  watch: {
    // category () {
    //   const category = this.categories.find(x => x.id === this.category)
    //   this.$emit('change', category)
    // },
    exclusions () {
      this.processCategories(this.categories)
    },
    courseCountryId (id) {
      SelectApi.getCoursesCategoriesCountry(this.processCategories, () => {}, id)
    },
    categoryId (i) {
      if (i === 0) {
        this.category = { value: 0, label: 'All' }
        // this.country = 0
      }
    }
  },
  created () {
    if (this.any) {
      this.categoriesOptions = [{ value: 0, name: 'any' }]
      this.categoriesOptionsFiltered = [{ value: 0, name: 'any' }]
    }
  },
  mounted () {
    if (!this.available) {
      if (!this.courseCountryId) {
        SelectApi.getCategories(this.processCategories, () => {}, this.$i18n.locale)
      } else {
        SelectApi.getCoursesCategoriesCountry(this.processCategories, () => {}, this.countryId)
      }
    } else {
      if (this.courses) {
        SelectApi.getAvailableCategoriesCourses(this.processCategories, () => {}, this.$i18n.locale)
      } else {
        SelectApi.getAvailableCategoriesProviders(this.processCategories, () => {}, this.$i18n.locale)
      }
    }
  }

}
</script>
