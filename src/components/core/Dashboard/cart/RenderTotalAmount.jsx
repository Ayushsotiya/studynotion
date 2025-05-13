import IconBtn from "../../../common/IconBtn";
import { useSelector } from 'react-redux'
const RenderTotalAmount = () => {
  const { total ,cart } = useSelector((state) => state.cart);
  const handleBuyCourse = () => {
       const courses  = cart.map((course)=> course._id);
       console.log("Bougt these course:" , courses);
      //  TODO : API INTEGRATION FOR PAYMENT GATEWAY
  }

  return (
    <div>
      <p>Total : </p>
      <p>{total}</p>
      <IconBtn
        text="buy now"
        onclick={handleBuyCourse}
        customClasses={"w-full justify-center"}
      />
    </div>
  )
}

export default RenderTotalAmount