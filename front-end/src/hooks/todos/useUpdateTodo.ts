import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { axiosInstanceApi } from "../../libs/API";
import { Itodo } from "../../interface/todo";

export default function useUpdateTodo() {
  const toast = useToast();
  const [isCompleted, setisCompleted] = useState<boolean>(false);

  const handleCheckboxChange = async (completedTodo: Itodo) => {
    try {
      const response = await axiosInstanceApi.put(
        `/todos/description/${completedTodo.description}/completed`,
        {
          completed: !completedTodo.completed,
        }
      );
      setisCompleted(response.data.data.completed);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === completedTodo._id
            ? { ...todo, completed: response.data.data.completed }
            : todo
        )
      );

      toast({
        status: "success",
        title: `${
          response.data.data.completed
            ? "Great! Kamu menyelesaikannya 👍"
            : "Semangat! Kamu pasti bisa 💪"
        }`,
        position: "top",
      });
    } catch (error) {
      toast({
        status: "error",
        title: "Terjadi kesalahan saat memperbarui status Todo",
        position: "top",
      });

      console.error(error);
    }
  };

  // State untuk menyimpan daftar todos hehe
  const [todos, setTodos] = useState<Itodo[]>([]);

  return { handleCheckboxChange, isCompleted, todos };
}
