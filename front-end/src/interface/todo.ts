import { Iuser } from "./user"

export interface Itodo {
    _id?:string
    title?:string
    user?:Iuser
    category?:string
    completed?:boolean
    description?:string
}