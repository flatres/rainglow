import { _axios } from 'boot/axios'

export default {
  postLinkedin (successFn, errorFn, data) {
    _axios.post('/user/login/linkedin', data)
      .then(response => {
        successFn(response.data)
      })
      .catch(error => {
        console.log(error)
        errorFn(error)
      })
  },
  postGoogle (successFn, errorFn, data) {
    _axios.post('/user/login/google', data)
      .then(response => {
        successFn(response.data)
      })
      .catch(error => {
        console.log(error)
        errorFn(error)
      })
  },
  postSignup (successFn, errorFn, data) {
    _axios.post('/user/signup', data)
      .then(response => {
        successFn(response.data)
      })
      .catch(error => {
        console.log(error)
        errorFn(error)
      })
  },
  postGuestSignup (successFn, errorFn, data) {
    _axios.post('/user/signup/guest', data)
      .then(response => {
        successFn(response.data)
      })
      .catch(error => {
        console.log(error)
        errorFn()
      })
  },
  postVerify (successFn, errorFn, data) {
    _axios.post('/user/verify', data)
      .then(response => {
        successFn(response.data)
      })
      .catch(error => {
        console.log(error)
        errorFn()
      })
  },
  postReset (successFn, errorFn, data) {
    _axios.post('/user/reset', data)
      .then(response => {
        successFn(response.data)
      })
      .catch(error => {
        console.log(error)
        errorFn(error)
      })
  },
  postResetPassword (successFn, errorFn, data) {
    _axios.post('/user/reset/password', data)
      .then(response => {
        successFn(response.data)
      })
      .catch(error => {
        console.log(error)
        errorFn(error)
      })
  }
}
