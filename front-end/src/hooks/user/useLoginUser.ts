import { FormEvent, useState } from "react";
import { Iuser } from "../../interface/user";
import { axiosInstanceApi } from "../../libs/API";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import setAuthToken from "../../libs/AuthorizationUser";
// import setAuthToken from "../../libs/AuthorizationUser";
export default function useLoginUser() {
  const navigate = useNavigate()
  const toast = useToast()
  const [formLogin, setFormLogin] = useState<Iuser>({
    user_name: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormLogin({
      ...formLogin,
      [name]: value,
    });
  };
  const handleSubmit = async (event:FormEvent) => {
    event.preventDefault()
    try {
      const response = await axiosInstanceApi.post("/login", formLogin);
      localStorage.setItem("token",response.data.token)
      console.log("register succes: ",response.data);
      toast({
        title: "login success",
        status: "success",
        position: "top",
        description: `hello ${formLogin.user_name} 👋` 
      });
      navigate("/")
      return response.data.user;
    } catch (error) {
      toast({
        title: "login failed",
        status: "error",
        description: "invalid email or password",
        position: "top",
      });
      console.error(error);
    }
  };
  return { handleChange, handleSubmit, formLogin};
}
