
import React from 'react';
import NavBar from './components/common/NavBar';
import { Route,Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from './pages/ForgotPassword';
import OpenRoute from "./components/core/Auth/OpenRoute";
import UpdatePassword from "./pages/UpdatePassword"
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About"
import Contact from "./pages/Contact"
export default function App() {
  return (
    <div className='w-screen min-h-screen bg-richblue-900 flex flex-col font-inter'>
      <NavBar/>
     
      <Routes>
          <Route path='/' element={ <Home/>}></Route>
          <Route path='/login' element={<OpenRoute><Login/></OpenRoute>}></Route>
          <Route path='/signup' element={<OpenRoute><Signup/></OpenRoute>}></Route>
          <Route path='/forgot-password' element={<OpenRoute><ForgotPassword/></OpenRoute>}></Route>
          <Route path='/update-password/:id' element={<OpenRoute><UpdatePassword/></OpenRoute>}></Route>
          <Route path='/verify-email' element={<OpenRoute><VerifyEmail/></OpenRoute>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path= "/contact" element={<Contact/>}></Route>
      </Routes>
    </div>
  )
}