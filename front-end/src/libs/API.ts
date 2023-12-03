import axios from "axios";

export const axiosInstanceApi = axios.create({
    baseURL:"http://localhost:3000"
})
    