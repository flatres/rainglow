import { defineStore } from 'pinia'
import { _axios } from 'boot/axios'
import { LocalStorage } from 'quasar'

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: null,
    auth: null,
    name: null,
    email: null
  }),
  getters: {
    profile: (state) => {
      return {
        name: state.name,
        email: state.email,
        about: state.about,
        profileUrl: state.profileUrl
      }
    },
    isLoggedIn: (state) => state.auth !== null && state.auth !== false
  },
  actions: {
    increment () {
      this.counter++
    },
    softLogout () {

    },
    login (authData) {
      return new Promise((resolve, reject) => {
        _axios.post('/user/login', {
          login: authData.login,
          password: authData.password
        })
          .then(response => {
            this.cookiesAccepted = true
            this.saveData(response.data)
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    loginWithKey (data) {
      this.saveData(data)
    },
    tryAutoLogin () {
      this.getGeo()
      const auth = LocalStorage.getItem('auth')
      console.log('suto', auth)
      if (auth) {
        this.cookiesAccepted = true
        const userId = LocalStorage.getItem('userId')

        this.saveData({
          auth,
          userId,
          name: LocalStorage.getItem('name'),
          email: LocalStorage.getItem('email'),
          isAdmin: LocalStorage.getItem('isAdmin')
        })

        this.setAxiosHeader(auth)

        return true
      } else {
        return false
      }
    },
    logout () {
      LocalStorage.clear()
      this.saveData({
        auth: false,
        userId: false,
        name: false,
        email: false
      })
      this.setAxiosHeader('')
    },
    saveData (data) {
      this.auth = data.auth
      this.userId = data.userId
      this.name = data.name
      this.email = data.email
      this.setAxiosHeader(data.auth)
      this.saveToLocal(data)
      console.log(this.isLoggedIn)
    },
    saveToLocal (data) {
      LocalStorage.set('auth', data.auth)
      LocalStorage.set('userId', data.userId)
      LocalStorage.set('email', data.email)
    },
    acceptCookies () {

    },
    setAxiosHeader (auth) {
      _axios.defaults.headers.common.Authorization = auth
    },
    getGeo () {
      return new Promise((resolve, reject) => {
        _axios.get('/user/geo')
          .then(response => {
            console.log('geo', response.data)
            this.geoCountryId = response.data.id
            this.geoCountry = response.data.country
            this.geoContinent = response.data.continent
            this.geoIp = response.data.ip
            this.geoCurrency = response.data.isoCurrency
            this.geoCurrencySymbol = response.data.curencySymbol
            this.geoPhonePrefix = response.data.phonePrefix
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }

})
