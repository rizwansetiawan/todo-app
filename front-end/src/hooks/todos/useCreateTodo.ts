import React, { FormEvent, useState } from "react";
import { Itodo } from "../../interface/todo";
import { useToast } from "@chakra-ui/react";
import { axiosInstanceApi } from "../../libs/API";

export default function useCreateTodo2 () {
    const toast = useToast()
    const [isAddingCategory,setIsAddingCategory] = useState<boolean>(false)
    const [createTitle, setCreateTitle] = useState<Itodo>({
        title: "",
      });
    const handleChangeTite = (event:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = event.target
        setCreateTitle({
            ...createTitle,
            [name]:value
        })
    }
    const handleSubmitTitle = async (event:FormEvent) => {
        event.preventDefault()
        try {
          const response = await axiosInstanceApi.post("/todos/title", createTitle);
          toast({
            title: "category added",
            status: "success",
            position: "top",
          });
          setCreateTitle({
            title:""
          })
           setIsAddingCategory(false)
          return response.data;
        } catch (error) {
          toast({
            title: "category already exist",
            status: "error",
            position: "top",
          });
          console.error(error);
        }
      };
      const [createDescription, setCreateDescription] = useState<Itodo>({
        description:""
      });
    const handleChangeDescription = (event:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = event.target
        setCreateDescription({
            ...createDescription,
            [name]:value
        })
    }
    const handleSubmitDescription = async (event:FormEvent,description:string) => {
        event.preventDefault()
        try {
          const response = await axiosInstanceApi.post("/todos/description/"+description, createDescription);
          toast({
            title: "new task added",
            status: "success",
            position: "top",
          });
          setCreateDescription({
            description:""
          })
          return response.data;
        } catch (error) {
          toast({
            title: "failed create task",
            status: "error",
            position: "top",
          });
          console.error(error);
        }
      };
      // update todos description

    return{handleSubmitTitle,handleChangeTite,createTitle,isAddingCategory,setIsAddingCategory,handleChangeDescription,handleSubmitDescription,createDescription}
}