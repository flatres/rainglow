<template>
    <q-select
      v-if='countriesOptions.length > 0'
      ref="countries"
      class="col text-bold q-ml-sm text-none"
      :outlined = '!filled'
      :filled = 'filled'
      roundedx
      square
      dense
      v-model="country"
      :options="countriesOptionsFiltered"
      @update:model-value="addCountry"
      popup-content-class="x-dark"
      input-class="x-dark"
      :label="label"
      :bg-color="dark? 'primary' : 'none'"
      :dark="dark"
      use-input
      hide-selected
      fill-input
      input-debounce="0"
      @filter="countryFilterFn"
      :popup-content-style="popupStyle"
      offset="[50,50]"
  />
</template>

<script>
// import { useI18n } from 'vue-i18n'
// inside of a Vue file
import { useQuasar } from 'quasar'
import SelectApi from '../api/user/selectApi.js'

export default {
  name: 'country-select',
  props: {
    exclusions: {
      type: Array,
      default: () => []
    },
    keep: {
      type: Boolean,
      default: false
    },
    countryId: {
      type: Number
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
    phone: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      required: false
    }
  },
  emits: ['change', 'update:countryId'],
  data () {
    return {
      countries: [],
      countriesOptions: [],
      countriesOptionsFiltered: [],
      country: null,
      $q: useQuasar(),
      loading: true
    }
  },
  methods: {
    processCountries (data) {
      if (this.any && this.loading) data.unshift({ id: 0, name: 'All' })

      this.countriesOptions = data.map(x => {
        if (this.exclusions.find(y => y.value === x.id)) {
          return null
        }
        return {
          value: x.id,
          label: this.phone ? x.name + ' (+' + x.phonePrefix + ')' : x.name
        }
      })

      this.countries = data
      this.countriesOptions = this.countriesOptions.filter(x => x !== null)
      this.countriesOptionsFiltered = this.countriesOptions

      // console.log(this.countries, this.countriesOptions, this.countriesOptionsFiltered)

      if (this.countryId !== null && this.loading) {
        this.country = this.countriesOptions.find(x => x.value === this.countryId)
      }
      this.loading = false
    },
    countryFilterFn (val, update, abort) {
      update(() => {
        if (!val) return this.countriesOptions
        const needle = val.toLowerCase()
        this.countriesOptionsFiltered = this.countriesOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    addCountry (value) {
      this.$emit('update:countryId', this.country.value)

      if (this.country) this.$emit('change', this.country)

      if (!this.keep) {
        this.country = null
        // this.courseOptionsFiltered = this.courseOptions
        this.$refs.countries.updateInputValue(null)
      }
      this.$refs.countries.hidePopup()
      this.processCountries(this.countries)
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
    exclusions () {
      this.processCountries(this.countries)
    },
    initial () {

    },
    countryId (i) {
      if (i === 0) {
        this.country = { value: 0, label: 'All' }
        // this.country = 0
      }
    }
  },
  created () {
    if (this.any) {
      this.countriesOptions = [{ value: 0, label: 'All' }]
      this.countriesOptionsFiltered = [{ value: 0, label: 'All' }]
    }
  },
  mounted () {
    if (!this.available) {
      SelectApi.getCountries(this.processCountries, this.$errorHandler, this.$i18n.locale)
    } else {
      if (this.courses) {
        SelectApi.getAvailableCountriesCourses(this.processCountries, this.$errorHandler, this.$i18n.locale)
      } else {
        SelectApi.getAvailableCountriesProviders(this.processCountries, this.$errorHandler, this.$i18n.locale)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.x-dark {
  color: white!important;
}

.q-menu .q-item__label {
  color: white!important;
}

.x-dark .q-item--active {
  background-color: var(--q-primary) !important; /* background color */
  color: red
}
</style>
