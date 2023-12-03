import { useState } from "react";
import { axiosInstanceApi } from "../../libs/API";
import { useToast } from "@chakra-ui/react";
export const useDeleteTodo =  () => {
  const toast = useToast()
    const [dataDeleted,setDataDeleted] = useState()
    const deleteTodo = async (id:string|undefined) => {

        try {
          const response = await axiosInstanceApi.delete("/todos/delete/"+id);
          setDataDeleted(response.data)
          toast({
            title: "task deleted",
            status: "success",
            position: "top",
          });
          setDataDeleted(response.data.data)
          return response.data.data;
        } catch (error) {
          toast({
            title: "failed delete",
            status: "error",
            position: "top",
          });
          console.error(error);
        }
      };
      return{deleteTodo,dataDeleted}
}
    