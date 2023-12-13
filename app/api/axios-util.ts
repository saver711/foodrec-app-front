import axios from "axios";
import { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";

const baseURL = 'http://localhost:1337/api/'
export const request = axios.create({
    baseURL
})

// , headers: {
    // Authorization: `Bearer token`,
    // "Content-Type": `application/json`,
    // "Content-Type": `multipart/form-data`,
    // Accept: 'text/html'
// }

// export const request = async <T>(options: AxiosRequestConfig) => {
//     const onSuccess = (res: AxiosResponse<T>) => res.data
//     const onError = (err: AxiosError) => err

//     return await client(options).then(onSuccess).catch(onError)
// }