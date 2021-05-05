import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8000'
})

client.interceptors.request.use(function (request) {
  if(request.url !== '/register/users' || request.url !== '/login'){
    request.headers['Authorization'] = `Bearer ${localStorage.getItem('algint-accessToken')}`
  }
  return request;
}, function (error) {
  return Promise.reject(error);
});

export default client
