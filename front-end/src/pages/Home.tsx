import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useFetchingTodo from "../hooks/todos/useFetchingTodo";
import React from "react";
import setAuthToken from "../libs/AuthorizationUser";
import { useDeleteTodo } from "../hooks/todos/useDeleteTodo";
import useCreateTodo2 from "../hooks/todos/useCreateTodo";
import useUpdateTodo from "../hooks/todos/useUpdateTodo";
import useSearchTodos from "../hooks/todos/useFilterTodos";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  // search filter based on category
  const [isOpenFilter, setIsOpenFIlter] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { todosFilter } = useSearchTodos(searchQuery);

  const { deleteTodo, dataDeleted } = useDeleteTodo();
  setAuthToken(localStorage.token);

  const [categoryClick, setIsCategoryClick] = useState<string>("");
  // get todos
  const { dataTitle, fetchDataTitle, dataTodosFilter, fetchDataTodosFilter } =
    useFetchingTodo();
  // fetch category !duplicate
  const datasDuplicate = Array.from(
    new Set(dataTitle?.map((item) => item.title))
  );
  // color based on category
  const bgColorCategory = {
    sports: "red",
    groceries: "blue",
    work: "green",
    coding: "black",
    favourites: "salmon",
    game: "skyBlue",
    study: "purple",
  };
  // get category based on click
  const renderCategoryname = datasDuplicate?.map((name, index) => (
    <React.Fragment key={index}>
      <Input
        type="text"
        py={5}
        mb={2}
        ms={-3}
        _placeholder={{ fontSize: "24px", color: "black" }}
        cursor={"pointer"}
        _focus={{ borderColor: "transparent" }}
        readOnly
        _hover={{ borderColor: "transparent" }}
        placeholder={name}
        borderColor={"transparent"}
        onClick={() => {
          setIsCategoryClick(name as string);
          setIsOpenFIlter(false);
        }}
        name={name}
      />
    </React.Fragment>
  ));

  //update completed
  const { handleCheckboxChange, todos } = useUpdateTodo();
  // create
  const {
    createTitle,
    handleChangeTite,
    handleSubmitTitle,
    isAddingCategory,
    setIsAddingCategory,
    handleChangeDescription,
    handleSubmitDescription,
    createDescription,
  } = useCreateTodo2();
  // seach filter
  const renderTasks = searchQuery
    ? todosFilter
    : dataTodosFilter?.filter((item) => item.description);

  useEffect(() => {
    fetchDataTodosFilter(categoryClick);
  }, [categoryClick, dataDeleted, createDescription, todos]);

  useEffect(() => {
    fetchDataTitle();
  }, [createTitle]);

  // logout
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    navigate("/login");
  };
  // END ACTION
  return (
    <Box display={"flex"} pos={"fixed"} flex={2} w={"100%"} h={"100vh"}>
      <Box
        style={{ filter: "blur(70px)" }}
        pos={"absolute"}
        h={"50px"}
        w={"300px"}
        top={-5}
        left={-20}
        bgGradient="linear(to-l, #7928CA, #FF0080)"
      ></Box>
      <Box
        style={{ filter: "blur(110px)" }}
        pos={"absolute"}
        h={"50px"}
        w={"300px"}
        bottom={20}
        right={-20}
        bgGradient="linear(to-l, #7928CA, #FF0080)"
      ></Box>
      <Box
        style={{ filter: "blur(160px)" }}
        pos={"absolute"}
        h={"50px"}
        w={"300px"}
        top={20}
        right={-20}
        bgGradient="linear(to-l, blue, #FF0080)"
      ></Box>
      <Box
        w={"23%"}
        bg={"whiteSmoke"}
        borderRight={"1px solid #D8D8D8"}
        h={"100%"}
      >
        <Flex h={"100%"} flexDirection={"column"} mt={5} p={10} ps={16}>
          <Heading
            cursor={"pointer"}
            onClick={() => {
              fetchDataTodosFilter();
              setIsCategoryClick("");
              setIsOpenFIlter(true);
            }}
            fontSize={30}
            mb={5}
          >
            All Tasks
          </Heading>

          {/* start map */}
          <Flex
            flexDirection={"column"}
            fontSize={24}
            gap={3}
            overflowY={"scroll"}
            sx={{
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {renderCategoryname}

            {isAddingCategory ? (
              <form onSubmit={handleSubmitTitle}>
                <Input
                  type="text"
                  name="title"
                  placeholder="+ New Category"
                  mb={5}
                  autoFocus={isAddingCategory}
                  onChange={handleChangeTite}
                  value={createTitle.title}
                />
                <Button w={"100%"} colorScheme="teal" type="submit">
                  Add
                </Button>
              </form>
            ) : (
              <Text
                color={"#ABABAB"}
                cursor={"pointer"}
                onClick={() => setIsAddingCategory(true)}
              >
                + New category
              </Text>
            )}
          </Flex>
          {/* end map */}
        </Flex>
      </Box>
      {/* MAP TODOS */}

      <Box w={"77%"} h={"100%"}>
        <Button
          leftIcon={<ArrowBackIcon />}
          fontWeight={"bold"}
          onClick={() => handleLogout()}
          colorScheme="telegram"
          pos={"fixed"}
          top={6}
          right={6}
        >
          {" "}
          Logout{" "}
        </Button>
        <Box m={10}>
          <Heading mb={5}> {categoryClick || "all task"} </Heading>
          <form
            onSubmit={
              isOpenFilter
                ? (null as any)
                : (e) => handleSubmitDescription(e, categoryClick)
            }
          >
            <Input
              placeholder={isOpenFilter ? "Search Your Task" : "Add a new task"}
              _placeholder={{ color: "#ABABAB", fontSize: "20" }}
              bg={"#E1DEDE"}
              w={"50%"}
              name="description"
              onChange={
                isOpenFilter
                  ? (e) => setSearchQuery(e.target.value)
                  : handleChangeDescription
              } //
              value={isOpenFilter ? searchQuery : createDescription.description} //
            />
            <Button
              type={isOpenFilter ? "button" : "submit"}
              ms={5}
              bg={"black"}
              colorScheme="black"
            >
              {isOpenFilter ? "Search" : "Create"}
            </Button>
          </form>
        </Box>
        <Box
          display={"block"}
          sx={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
          overflowY={"auto"}
          w={"70%"}
          h={"70%"}
        >
          {(renderTasks?.length as any) > 0 && (
            <>
              {renderTasks?.map((item) => (
                <Flex ms={10} key={item._id} pos={"relative"} mb={3} gap={5}>
                  {renderTasks.length < 1 && (
                    <Heading>data not found...</Heading>
                  )}
                  <>
                    <Checkbox
                      size={"lg"}
                      isInvalid={!item.completed}
                      colorScheme="green"
                      name="completed"
                      style={{
                        position: "absolute",
                        top: 5,
                        // height: "24px",
                        // width: "24px",
                      }}
                      isChecked={item.completed}
                      onChange={() => handleCheckboxChange(item)}
                    />

                    <Text
                      textDecorationLine={
                        item.completed ? "line-through" : "unset"
                      }
                      color={item.completed ? "red" : "black"}
                      textDecorationColor={"red"}
                      fontSize={20}
                      ms={10}
                    >
                      {item.description}
                    </Text>
                    {/* <Heading> {loading? "loading...":"" } </Heading> */}
                    <Button
                      cursor={"default"}
                      bg={
                        bgColorCategory[
                          item.category as keyof typeof bgColorCategory
                        ] || "gray.400"
                      }
                      mt={1}
                      color={"white"}
                      colorScheme="none"
                      size={"xs"}
                      borderRadius={"20px"}
                      px={5}
                    >
                      {item.category}
                    </Button>

                    <Button
                      size={"xs"}
                      borderRadius={"20px"}
                      px={5}
                      bg={"yellow.400"}
                      color={"black"}
                      colorScheme="red"
                      _hover={{ color: "red.600" }}
                      onClick={() => deleteTodo(item._id)}
                    >
                      delete
                    </Button>
                  </>
                </Flex>
              ))}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
