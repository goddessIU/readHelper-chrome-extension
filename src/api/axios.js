const axios = require('axios')

const instance = axios.create({})


instance.interceptors.response.use(function (response) {
    console.log(response)
})

export default instance
