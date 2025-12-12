import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
console.log(process.env.API_URL)
const _axios = axios.create({ baseURL: process.env.API_URL })

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = _axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  // app.config.globalProperties.$api = _axios
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { _axios }

// axios app plugin file (src/boot/axios.js)

// import axios from 'axios'

// // We create our own axios instance and set a custom base URL.
// // Note that if we wouldn't set any config here we do not need
// // a named export, as we could just `import axios from 'axios'`
// const _axios = axios.create({
//   // baseURL: process.env.PROD ? '/api/v1/public' : 'http://localhost'
//   baseURL: process.env.API_URL
// })

// axios.defaults.port = 80

// export default ({ Vue }) => {
//   // for use inside Vue files through this.$axios
//   Vue.prototype.$axios = _axios
// }

// // Here we define a named export
// // that we can later use inside .js files:
// export { _axios }
