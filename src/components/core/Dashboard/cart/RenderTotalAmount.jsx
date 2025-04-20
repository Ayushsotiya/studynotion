import React from 'react'
import { useSelector } from 'react-redux'
const RenderTotalAmount = () => {
  const {total} = useSelector((state) => state.cart);
  const {cart} = useSelector((state) => state.cart);
  const handleBuyCourse = () => {
    const courses = cart.map((course)=> course._id);
    console.log("Buy course clicked!");
  }
  return (
    <div>
         <p>Total : </p>
         <p>{total}</p>
         <IconBtn text="buy now" onclick = {handleBuyCourse} customClasses = {"w-full justify-center"}></IconBtn>
    </div>
  )
}

export default RenderTotalAmount