import { useState, useEffect } from 'react';
import { axiosInstanceApi } from '../../libs/API';
import { Itodo } from '../../interface/todo';

const useSearchTodos = (description: string) => {
  const [todosFilter, setTodos] = useState<Itodo[]>([]);
  const [message, setMessage] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const filterFetchData = async () => {
      try {
        const response = await axiosInstanceApi.get<Itodo[]>(
          `/todos/description/${description}`
        );
        setTodos(response.data);
      } catch (error) {
        setMessage('Error fetching todos');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // Check if description is not empty before making the API request
    if (description.trim() !== '') {
      setLoading(true);
      filterFetchData();
    } else {
      // If description is empty, reset todos and show a message
      setTodos([]);
      setMessage('Task description is required');
      setLoading(false);
    }
  }, [description]);

  return { todosFilter, message, loading };
};

export default useSearchTodos;
