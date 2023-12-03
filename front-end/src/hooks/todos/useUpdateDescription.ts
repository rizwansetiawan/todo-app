import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { axiosInstanceApi } from "../../libs/API";
import { Itodo } from "../../interface/todo";

export default function useUpdateDescription() {
  const toast = useToast();
  const [updatedDescription, setUpdatedDescription] = useState("");

  const handleUpdateDescription = async (currentDescription:Itodo, newDescription:string) => {
    try {
      const response = await axiosInstanceApi.put(
        `/todos/description/update/${currentDescription.description}`,
        {
          description: newDescription,
        }
      );

      setUpdatedDescription(response.data.data.description);

      toast({
        status: "success",
        title: "Deskripsi To-Do berhasil diperbarui",
        position: "top",
      });
    } catch (error) {
      toast({
        status: "error",
        title: "Terjadi kesalahan saat memperbarui deskripsi To-Do",
        position: "top",
      });

      console.error(error);
    }
  };

  // Mengembalikan fungsi dan state yang diperlukan
  return { handleUpdateDescription, updatedDescription };
}
