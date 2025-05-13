import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAverageRating } from '../../../../services/operations/courseDetailsAPI';
import ReactStars from 'react-stars';
import { GiNinjaStar } from 'react-icons/gi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { removeFromCart } from '../../../../slices/cartSlice';

const RenderCartCourses = () => {
  const { cart } = useSelector((state) => state.cart);
  const [ratings, setRatings] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRatings = async () => {
      const newRatings = {};
      for (const course of cart) {
        try {
          const data = await getAverageRating(course._id);
          newRatings[course._id] = data?.averageRating || 0;
        } catch (error) {
          console.error("Failed to fetch rating for course:", course._id);
          console.log(error.message);
          newRatings[course._id] = 0;
        }
      }
      setRatings(newRatings);
    };

    if (cart.length > 0) {
      fetchRatings();
    }
  }, [cart]);

  if (cart.length === 0) {
    return <p className="text-center text-gray-500">Your cart is empty.</p>;
  }

  return (
    <div className="space-y-6">
      {cart.map((course) => (
        <div key={course._id} className="border p-4 rounded flex gap-4">
          <img
            src={course?.thumbnail}
            alt={course.courseName}
            className="w-40 h-28 object-cover rounded"
          />

          <div className="flex flex-col justify-between flex-1">
            <div>
              <h3 className="text-lg font-semibold">{course?.courseName}</h3>
              <p className="text-sm text-gray-500">{course?.category?.name}</p>

              <div className="flex items-center gap-2 mt-2">
                <span>{ratings[course._id]?.toFixed(1) || "N/A"}</span>
                <ReactStars
                  count={5}
                  value={ratings[course._id] || 0}
                  size={20}
                  activeColor="#FFD700"
                  emptyIcon={<GiNinjaStar />}
                  fullIcon={<GiNinjaStar />}
                  edit={false}
                />
                <span className="text-sm text-gray-400">
                  {course?.ratingAndReviews?.length || 0} Ratings
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => dispatch(removeFromCart(course._id))}
                className="flex items-center text-red-500 hover:underline"
              >
                <RiDeleteBin6Line className="mr-1" onClick={()=>dispatch(removeFromCart(course._id))} /> Remove
                <span>Remove</span>
              </button>
              <p>Rs {course?.price }</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderCartCourses;
