import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.BASEURL || "http://localhost:8000",
})

// axiosInstance.interceptors.request.use(
//   function (config){
//       // console.log(config)
//       const token = sessionStorage.getItem('token')
//       if(token){
//           config.headers['Authorization'] = `Bearer ${token}`
//       }

//       return config
//   },
//   function(error){
//       return Promise.reject(error)
//   }
// )

export default axiosInstance