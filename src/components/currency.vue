<template>
  <!-- ...... -->
  <div>
    <q-select
      v-if='currencyOptions.length > 0'
      v-model="currency"
      :options="currencyOptions"
      dense
      borderlessx
      outlined
      emit-value
      map-options
      options-dense
      stylex="min-width: 150px"
    >
      <!-- <template v-slot:prepend>
        <q-icon name="payments" color='black'/>
      </template> -->
    </q-select>
  </div>
  <!-- ...... -->
</template>

<script>
// import { useI18n } from 'vue-i18n'
// inside of a Vue file
import { useQuasar } from 'quasar'
import CurrencyApi from '../api/user/selectApi.js'

export default {
  name: 'currency-select',
  props: {
  },
  emits: ['change'],
  data () {
    return {
      currencies: [],
      currencyOptions: [],
      currency: null,
      $q: useQuasar()
    }
  },
  methods: {
    processCurrencies (data) {
      this.currencyOptions = data.map(x => {
        return {
          value: x.id,
          label: x.code
        }
      })
      this.currencies = data
      this.currencyOptions = this.currencyOptions.filter(x => x !== null)
      this.currency = this.currencyOptions[0].value
    }
  },
  watch: {
    currency () {
      const currency = this.currencies.find(x => x.code === this.currency)
      this.$emit('change', currency)
    }
  },
  created () {
    CurrencyApi.getCurrencies(this.processCurrencies, this.$errorHandler)
  }

}
</script>
../api/user/selectApi.js
