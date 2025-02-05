
import React from 'react';
import NavBar from './components/common/NavBar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home  from './pages/home';
const router = createBrowserRouter([
  {path:"/",element:<div><NavBar></NavBar> <Home/></div>}
])
export default function App() {
  return (
    <div className='w-screen min-h-screen bg-richblue-900 flex flex-col font-inter'>
      
      <RouterProvider router={router} />
    </div>
  )
}