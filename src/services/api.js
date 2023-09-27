import axios from 'axios'

const apiCodeBurguer = axios.create({
  baseURL: 'https://codeburguerapi-production.up.railway.app/'
})
apiCodeBurguer.interceptors.request.use(async config => {
  const userData = await localStorage.getItem('codeburguer:userData')
  const token = userData && JSON.parse(userData).token
  config.headers.Authorization = `Bearer ${token}`
  return config
})
export default apiCodeBurguer
