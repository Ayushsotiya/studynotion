import React, { useEffect } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath } from 'react-router-dom';
import { NavbarLinks } from "../../data/navbar-links"
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoCartOutline } from "react-icons/io5";
import { useState } from 'react';
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { apiConnector } from '../../services/apiconnector';
import { categories } from '../../services/apis';
import { TiArrowSortedDown } from "react-icons/ti";
const NavBar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const matchRoute = (route) => {
    const location = useLocation();
    return matchPath({ path: route }, location.pathname);
  }
  const [subLinks , setSubLinks] = useState([]);
  const fetchSublinks = async()=>{
      try{
         const result = await apiConnector("GET",categories.CATEGORIES_API)
         console.log("printing ",result)
         setSubLinks(result.data.data);
      }catch(error){
        console.log("Could not fetch the category list")
      }
  }
  useEffect(()=>{
    fetchSublinks ();
  },[])





  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>

      <div className='flex w-11/12 max-w-maxContent items-center justify-between flex-row'>
        <Link to={"/"}>
          <img src={logo} width={160} height={42} loading='lazy' />
        </Link>


        <nav>
          <ul className='flex gap-x-6 text-richblack-25'>
            {
              NavbarLinks.map((link, index) => (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div className='flex items-center gap-2 group relative'>
                      <p>{link.title} </p>
                      <TiArrowSortedDown />
                      <div className='invisible translate-x-[-50%] z-20 translate-y-[50%] absolute left-[50%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]'>
                        <div className='absolute  left-[50%] top-0 h-5 w-5 translate-y-[-5px] rotate-45 rounded-45 bg-richblack-5 invisible opacity-0 group-hover:visible group-hover:opacity-100  transition-all duration-200 '></div>
                        {
                          subLinks.length ? (
                            subLinks.map((sublink, index) => (
                              <Link key={index} to={sublink.link}>
                                <p>{sublink.title}</p> {/* Access `title` from the `sublink` object */}
                              </Link>
                            ))
                          ) : (
                            <div></div> 
                          )
                        }
                      </div>
                    </div>
                  ) : (
                    <Link to={link?.path}>
                      <p className={`${matchRoute(link?.path) ? "text-yellow-25 " : "text-richblack-25"} `}>
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              ))
            }
          </ul>
        </nav>

        <div className='flex gap-x-4 items-center'>
          {
            user && user?.accountType != "Instrutor" && (
              <Link to={"/dashboard/cart"} className='relative'>
                <IoCartOutline />
                {
                  totalItems > 0 && <span>{totalItems}</span>
                }
              </Link>
            )
          }
          {
            token === null && (
              <Link to="/login" >
                <button className='border border-richblack-700 bg-richblack-800 px-3 py-[8px] text-richblack-100 rounded-md' >
                  Log in
                </button>
              </Link>
            )
          }
          {
            token === null && (
              <Link to="/signup">
                <button className='border border-richblack-700 bg-richblack-800 px-3 py-[8px] text-richblack-100 rounded-md' >
                  signup
                </button>
              </Link>
            )
          }
          {
            token !== null && <ProfileDropDown />
          }
        </div>

      </div>

    </div>
  )
}

export default NavBar;