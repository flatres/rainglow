<template>
  <!-- ...... -->
  <div>
    <q-select
      v-if='localesOptions.length > 0'
      v-model="locale"
      :options="localesOptions"
      dense
      borderlessx
      outlined
      emit-value
      map-options
      options-dense
      stylex="min-width: 150px"
    >
      <!-- <template v-slot:prepend>
        <q-icon name="fas fa-check" color='black'/>
      </template> -->
    </q-select>
  </div>
  <!-- ...... -->
</template>

<script>
// import { useI18n } from 'vue-i18n'
// inside of a Vue file
import { useQuasar } from 'quasar'
import LocaleApi from '../api/user/selectApi.js'

export default {
  name: 'locale-select',
  props: {
    english: {
      type: Boolean,
      default: false
    },
    exclusions: {
      type: Array,
      default: () => []
    }
  },
  emits: ['change'],
  data () {
    return {
      locales: [],
      localesOptions: [],
      locale: null,
      $q: useQuasar()
    }
  },
  methods: {
    processLocales (data) {
      this.localesOptions = data.map(x => {
        if (this.exclusions.find(y => y === x.code)) return null
        return {
          value: x.code,
          label: this.english ? x.name : x.localName
        }
      })
      this.locales = data
      this.localesOptions = this.localesOptions.filter(x => x !== null)
      if (this.exclusions.length === 0) {
        this.$i18n.locale = this.$q.lang.getLocale()
        this.locale = this.$q.lang.getLocale().replace(/-/g, '')
      }
    }
  },
  watch: {
    locale () {
      if (this.exclusions.length === 0) this.$i18n.locale = this.locale
      const locale = this.locales.find(x => x.code === this.locale)
      this.$emit('change', locale)
    }
  },
  created () {
    LocaleApi.getLanguages(this.processLocales, this.$errorHandler)
  }

}
</script>
../api/user/selectApi.js
