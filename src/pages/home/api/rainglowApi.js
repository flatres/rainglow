// https://github.com/vuejs/vuex/tree/dev/examples/shopping-cart/api
import { _axios } from 'boot/axios'
export default {
  getStatus (successFn, errorFn, parameters) {
    _axios.get('/home/state')
      .then(response => {
        successFn(response.data)
      })
      .catch(error => {
        console.log(error)
        // reject(error)
      })
  }
}
