import axios from 'axios'
import {API} from './api'

axios.defaults.baseURL = API.BASE_URL
axios.defaults.withCredentials = false
axios.defaults.timeout = 100000
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const request = function (url, params, config, method) {
  return new Promise((resolve, reject) => {
    axios[method](url, params, Object.assign({}, config)).then(response => {
      resolve(response.data)
    }, err => {
      if (err.Cancel) {
        console.log(err)
      } else {
        reject(err)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

const httpPost = (url, params, config = {}) => {
  return request(url, params, config, 'post')
}

const httpGet = (url, params, config = {}) => {
  return request(url, params, config, 'get')
}
//3.导出cancel token列表供全局路由守卫使用
export {httpPost, httpGet}