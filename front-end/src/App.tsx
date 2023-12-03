import { Route, Routes, useNavigate, } from "react-router-dom"
import RegisterPage from "./pages/Register"
import LoginPage from "./pages/Login"
import HomePage from "./pages/Home"
import { useEffect } from "react"

function App (){
const navigate = useNavigate()
useEffect(()=>{
  if(!localStorage.token){
    navigate("/login")
  }
},[])
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage /> }/>
    </Routes> 
  )
}
export default App