import { _axios } from 'boot/axios'

export default {
  putProfile (successFn, errorFn, data) {
    _axios.put('/user/profile', data)
      .then(response => {
        successFn(response.data)
      })
      .catch(error => {
        console.log(error)
        errorFn()
      })
  },
  postProfilePic (successFn, errorFn, base64) {
    _axios.post('/user/profile/pic', base64)
      .then(response => {
        successFn(response.data)
      })
      .catch(error => {
        console.log(error)
        errorFn()
      })
  },
  putNotificationAsRead (successFn, errorFn, notification) {
    _axios.put('/user/notifications/read/' + notification.id)
      .then(response => {
        successFn(response.data)
      })
      .catch(error => {
        console.log(error)
        errorFn()
      })
  }
}
