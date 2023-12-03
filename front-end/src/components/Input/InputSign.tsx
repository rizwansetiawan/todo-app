import { Input } from "@chakra-ui/react";
export const InputSign = (props:any)=>{
    const {name,type,placeholder,mb,onChange} = props
    return (
        <Input type={type} name={name} mb={mb} onChange={onChange} _placeholder={{fontSize:"13px"}} placeholder={placeholder} />
    )
}
