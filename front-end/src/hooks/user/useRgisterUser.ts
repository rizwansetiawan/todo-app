import { FormEvent, useState } from "react";
import { Iuser } from "../../interface/user";
import { axiosInstanceApi } from "../../libs/API";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
export default function useRegisterUser() {
  const navigate = useNavigate()
  const toast = useToast()
  const [formRegister, setFormRegister] = useState<Iuser>({
    name: "",
    user_name: "",
    email: "",
    phone_number: 0,
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormRegister({
      ...formRegister,
      [name]: value,
    });
  };
  const handleSubmit = async (event:FormEvent) => {
    event.preventDefault()
    try {
      const response = await axiosInstanceApi.post("/register", formRegister);
      console.log("register succesfull :",response.data);
      toast({
        title: "register success",
        status: "success",
        position: "top",
      });
      navigate("/login")
      return response.data;
    } catch (error) {
      toast({
        title: "register failed",
        status: "error",
        description: "username already exist",
        position: "top",
      });
      console.error(error);
    }
  };
  return { handleChange, handleSubmit };
}
