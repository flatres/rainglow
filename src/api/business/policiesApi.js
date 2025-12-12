import { _axios } from 'boot/axios'

export default {
  getPrivacy (successFn, errorFn, data) {
    _axios.get('/business/privacy', data)
      .then(response => {
        successFn(response.data)
      })
      .catch(error => {
        console.log(error)
        errorFn()
      })
  },
  getCookies (successFn, errorFn, data) {
    _axios.get('/business/cookies', data)
      .then(response => {
        successFn(response.data)
      })
      .catch(error => {
        console.log(error)
        errorFn()
      })
  },
  getTerms (successFn, errorFn, data) {
    _axios.get('/business/terms', data)
      .then(response => {
        successFn(response.data)
      })
      .catch(error => {
        console.log(error)
        errorFn()
      })
  }
}
