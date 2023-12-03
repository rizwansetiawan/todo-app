import { axiosInstanceApi } from "../../libs/API";
import { Itodo } from "../../interface/todo";
import { useState } from "react";

export default function useFetchingTodo() {
  const [data, setData] = useState<Itodo[]>();
  const [dataTitle,setDataTitle] = useState<Itodo []>()
  const [dataTodosFilter,setDataTodosFilter] = useState<Itodo []>()
  const fetchData = async () => {
    try {
      const response = await axiosInstanceApi.get("/todos/nonempty");
      setData(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };
  const fetchDataTitle = async () => {
    try {
      const response = await axiosInstanceApi.get("/todos");
      setDataTitle(response.data);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };
  const fetchDataTodosFilter = async (title?:string) => {
    try {
      const response = await axiosInstanceApi.get(title?"/todos/title/"+title:"/todos");
      setDataTodosFilter(response.data);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };
  return { fetchData, data, fetchDataTitle,dataTitle, fetchDataTodosFilter, dataTodosFilter };
}

