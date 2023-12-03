import { Button } from "@chakra-ui/button";
export const ButtonSign = (props:any)=>{
    const {value,type} = props
    return (
        <Button w={"100%"} bg="#1571DE" colorScheme="facebook" type={type}> {value} </Button>
    )
}
