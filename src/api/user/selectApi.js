import { _axios } from 'boot/axios'

export default {
  getLanguages (successFn, errorFn) {
    _axios.get('/user/languages')
      .then(response => {
        successFn(response.data)
      })
      .catch(error => {
        console.log(error)
        errorFn()
      })
  },
  getCurrencies (successFn, errorFn) {
    _axios.get('/user/currencies')
      .then(response => {
        successFn(response.data)
      })
      .catch(error => {
        console.log(error)
        errorFn()
      })
  },
  getCountries (successFn, errorFn) {
    _axios.get('/user/countries')
      .then(response => {
        successFn(response.data)
      })
      .catch(error => {
        console.log(error)
        errorFn()
      })
  },
  getCategories (successFn, errorFn, locale) {
    _axios.get('/user/categories/' + locale)
      .then(response => {
        successFn(response.data)
      })
      .catch(error => {
        console.log(error)
        errorFn()
      })
  },
  getCoursesCategoriesCountry (successFn, errorFn, countryId) {
    _axios.get('/search/categories/courses/' + countryId)
      .then(response => {
        successFn(response.data)
      })
      .catch(error => {
        console.log(error)
        errorFn()
      })
  },
  getAvailableCountriesProviders (successFn, errorFn) {
    _axios.get('/user/countries/available/providers')
      .then(response => {
        successFn(response.data)
      })
      .catch(error => {
        console.log(error)
        errorFn()
      })
  },
  getAvailableCountriesCourses (successFn, errorFn) {
    _axios.get('/user/countries/available/courses')
      .then(response => {
        successFn(response.data)
      })
      .catch(error => {
        console.log(error)
        errorFn()
      })
  },
  getAvailableCategoriesProviders (successFn, errorFn, locale) {
    _axios.get('/user/categories/available/providers/' + locale)
      .then(response => {
        successFn(response.data)
      })
      .catch(error => {
        console.log(error)
        errorFn()
      })
  },
  getAvailableCategoriesCourses (successFn, errorFn, locale) {
    _axios.get('/user/categories/available/courses/' + locale)
      .then(response => {
        successFn(response.data)
      })
      .catch(error => {
        console.log(error)
        errorFn()
      })
  }
}
