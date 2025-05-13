
import React from 'react';
import NavBar from './components/common/NavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from './pages/ForgotPassword';
import OpenRoute from "./components/core/Auth/OpenRoute";
import UpdatePassword from "./pages/UpdatePassword"
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About"
import Contact from "./pages/Contact"
import PrivateRoute from "./components/core/Auth/PrivateRoute"
import DashBoard from "./pages/DashBoard"
import MyProfile from './components/core/Dashboard/MyProfile';
import Settings from './components/core/Dashboard/settings/index';
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses';
import Cart from './components/core/Dashboard/cart/index';
import { useSelector } from 'react-redux';
import { ACCOUNT_TYPE } from "./utils/constants";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getUserDetails } from './services/operations/profileAPI';
import AddCourses from "./components/core/Dashboard/addCourses/index"
import './App.css';

export default function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.profile)
  console.log(user?.accountType)

  return (
    <div className='w-screen min-h-screen bg-richblue-900 flex flex-col font-inter'>
      <NavBar />

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<OpenRoute><Login /></OpenRoute>}></Route>
        <Route path='/signup' element={<OpenRoute><Signup /></OpenRoute>}></Route>
        <Route path='/forgot-password' element={<OpenRoute><ForgotPassword /></OpenRoute>}></Route>
        <Route path='/update-password/:id' element={<OpenRoute><UpdatePassword /></OpenRoute>}></Route>
        <Route path='/verify-email' element={<OpenRoute><VerifyEmail /></OpenRoute>}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route element={<PrivateRoute><DashBoard /></PrivateRoute>}>
          <Route path="/dashboard/my-profile" element={<MyProfile />}></Route>
          <Route path='/dashboard/settings' element={<Settings />}></Route>
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />}/>
                <Route path="/dashboard/cart" element={<Cart />} />
              </>
            )
          }
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="dashboard/add-course" element={<AddCourses />}/>
              </>
            )
          }
        </Route>
        <Route path='*' element={<h1 className='text-white'>404 Not Found</h1>}></Route>
      </Routes>
    </div>
  )
}