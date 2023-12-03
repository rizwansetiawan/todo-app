import { axiosInstanceApi } from "./API";

export default function setAuthToken (token:string | null) {
    if(token){
        axiosInstanceApi.defaults.headers.common["Authorization"] = ` Bearer ${token}`
    } else {
        delete axiosInstanceApi.defaults.headers.common["Authorization"]
    }
}