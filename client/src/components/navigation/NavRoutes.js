import React, {useState, useContext} from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";
import NewActivity from '../pages/search/NewActivity'
import Home from '../pages/home/Home';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Planner from '../pages/planner/Planner';
import ProtectedRoutes from './ProtectedRoutes';
import AuthContext from '../assets/context/AuthContext';
import PersonalPage from '../pages/home/components/PersonalPage';
import { postData } from '../assets/context/APIHooks';

const StackNav = () => {  

  const [isOpen, setIsOpen] = useState(false)
  const {authenticated, removeAuthState} = useContext(AuthContext)
  const navigate = useNavigate()

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const logoutUser = async () => {
    const result = await postData("http://localhost:5000/logout")
    navigate("/")
    removeAuthState({value: result.data.authenticated, message: ""})
}

  return (
    <>
    {!authenticated?.value ?
    <Home/>
    :
    <>
    <Navbar toggle={toggle} logoutUser={logoutUser}/>
    <Sidebar isOpen={isOpen} toggle={toggle} logoutUser={logoutUser}/>
    <Routes>
      <Route element={<ProtectedRoutes authenticated={authenticated.value}/>}>
        <Route path="/" exact element={<PersonalPage/>} />
        <Route path="/search" exact element={<NewActivity/>} />
        <Route path="/planner" exact element={<Planner/>} />
      </Route>
    </Routes>
    </>
    } 
    </>
  )
}

export default StackNav
