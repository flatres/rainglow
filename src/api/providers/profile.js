import { _axios } from 'boot/axios'

export default {
  postProfile (successFn, errorFn, data) {
    _axios.put('/providers/profile', data)
      .then(response => {
        successFn(response.data)
      })
      .catch(error => {
        console.log(error)
        errorFn()
      })
  }
}
