import {
  Box,
  Flex,
  FormControl,
  Heading,
  Text,
  InputGroup,
  InputRightElement,
  Button,
  Img,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { ButtonSign } from "../components/Buttons/ButtonSign";
import { useState } from "react";
import { InputSign } from "../components/Input/InputSign";
import { Label } from "../components/Label/FormLabel";
import TodosPhoto from "../assets/images/MacBook Pro 14_ - 1 1.png";
import { Link } from "react-router-dom";
import useRegisterUser from "../hooks/user/useRgisterUser";
export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {handleChange,handleSubmit} = useRegisterUser()
  return (
      <Box
        display={"flex"}
        pos={"fixed"}
        flex={2}
        w={"100%"}
        h={"100vh"}
        bg={"whiteSmoke"}
      >
        <Box w={"67%"} bg={"whiteSmoke"} h={"100%"}>
        <Box
            style={{ filter: "blur(70px)" }}
            pos={"absolute"}
            h={"50px"}
            w={"300px"}
            top={-5}
            left={-20}
            bgGradient='linear(to-l, #7928CA, #FF0080)'
          ></Box>
          <Box
            style={{ filter: "blur(160px)" }}
            pos={"absolute"}
            h={"50px"}
            w={"300px"}
            bottom={20}
            right={-20}
            bgGradient='linear(to-l, #7928CA, #FF0080)'
          ></Box>
          <Flex flexDirection={"column"} gap={5} ms={24} mt={20}>
            <Heading
              fontSize={70}
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              fontWeight={900}
              w={"220px"}
            >
              TO DO LIST
            </Heading>
            <Box w={"80%"} h={"50vh"}>
              <Img w={"100%"} h={"100%"} src={TodosPhoto} />
            </Box>
          </Flex>
        </Box>

        <Box w={"33%"} bg={"white"}>
          <Box w={"100%"} display={"flex"} justifyContent={"center"}>
            <Flex flexDirection={"column"} w={"85%"} py={5} h={"100vh"}>
              <Heading
                sx={{
                  color: "#5D5871",
                  fontSize: 20,
                  //
                  fontWeight: "500",
                  letterSpacing: 0.1,
                  wordWrap: "break-word",
                }}
              >
                Welcome to To Do List 👋
              </Heading>
              <Text
                sx={{
                  color: "#6D6B7A",
                  fontSize: 13,

                  fontWeight: "400",
                  wordWrap: "break-word",
                }}
              >
                Please sign-in to your account, and start manage further
              </Text>
              <Text mt={7} fontSize={20}>
                Sign Up
              </Text>
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <Label value="Name" />
                  <InputSign onChange={handleChange} type="text" name="name" placeholder="your name" />

                  <Label value="Phone Number" />
                  <InputSign onChange={handleChange}
                    type="number"
                    name="phone_number"
                    placeholder="+62"
                  />
                  <Label value="email" />
                  <InputSign onChange={handleChange}
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                  />

                  <Label value="Username" />
                  <InputSign onChange={handleChange}
                    type="text"
                    placeholder="your username"
                    name="user_name"
                  />

                  <Label value="password" />
                  <InputGroup>
                    <InputRightElement>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                      </Button>
                    </InputRightElement>
                    <InputSign onChange={handleChange}
                      mb={5}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="password"
                    />
                  </InputGroup>

                  <ButtonSign value="Sign Up" type="submit" />
                  <Text fontSize={13} mt={5} textAlign={"center"}>
                    Already have an account ?{" "}
                    <Link to={"/login"} color={"blue"}>
                      {" "}
                      Sign In{" "}
                    </Link>{" "}
                  </Text>
                </FormControl>
              </form>
            </Flex>
          </Box>
        </Box>
      </Box>
  );
}
