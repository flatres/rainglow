import { _axios } from 'boot/axios'

export default {
  postProviderClick (successFn, errorFn, id) {
    _axios.post('/analytics/provider/' + id)
      .then(response => {
        successFn(response.data)
      })
      .catch(error => {
        console.log(error)
        errorFn()
      })
  },
  postCourseClick (successFn, errorFn, id) {
    _axios.post('/analytics/course/' + id)
      .then(response => {
        successFn(response.data)
      })
      .catch(error => {
        console.log(error)
        errorFn()
      })
  },
  postVisitor (successFn, errorFn, isMobile) {
    _axios.post('/analytics/visitor/' + isMobile)
      .then(response => {
        successFn(response.data)
      })
      .catch(error => {
        console.log(error)
        errorFn()
      })
  },
  postPage (successFn, errorFn, data) {
    _axios.post('/analytics/page', data)
      .then(response => {
        successFn(response.data)
      })
      .catch(error => {
        console.log(error)
        errorFn()
      })
  },

  homePage (successFn, errorFn) {
    _axios.post('/analytics/homepage')
      .then(response => {
        successFn(response.data)
      })
      .catch(error => {
        console.log(error)
        errorFn()
      })
  }
}
