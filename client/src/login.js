import axios from './axios'

export default (username, password) => {
    return axios.post('/login', { username, password })
        .then(res => {
            alert('Login successful')
            localStorage.setItem('algint-accessToken', res.data.accessToken)
        })
        .catch(err => {
            console.log('error login: ', err)
            alert(`Error Logging In: ${err}`)
        })
}