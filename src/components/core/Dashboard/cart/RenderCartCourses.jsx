import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {getAverageRating} from '../../../../services/operations/courseDetailsAPI';
import ReactStars from 'react-stars'
import { GiNinjaStar } from 'react-icons/gi';
import {RiDeleteBin6Line} from "react-icons/ri"
import { toast } from 'react-hot-toast';
import { removeFromCart } from '../../../../slices/cartSlice';
import { useDispatch } from 'react-redux';

const RenderCartCourses = () => {
  const { cart } = useSelector((state) => state.cart);
  const [ratings, setRatings] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchRatings = async () => {
      const newRatings = {};
      for (const course of cart) {
        try {
          const data = await getAverageRating(course._id); // assuming _id is course id
          newRatings[course._id] = data?.averageRating || 0;
        } catch (err) {
          console.error("Failed to fetch rating for course:", course._id);
          newRatings[course._id] = 0;
        }
      }
      setRatings(newRatings);
    };

    if (cart.length > 0) {
      fetchRatings();
    }
  }, [cart]);

  return (
    <div>
      {
        cart.map((course) => (
       <div>
          <div key={course._id} className="mb-4 p-4 border rounded">
            <img src={course?.thumbnail} alt={course.title} className='w-full h-40 object-cover' />
            <div>
              <p>{course?.courseName}</p>
              <p>{course?.category?.name}</p>
              <div className='flex items-center gap-2'>
                <span>{ratings[course._id]?.toFixed(1) || "N/A"}</span>
                <ReactStars count={5} value={ratings[course._id] || 0} size={24} activeColor="#FFFF00" emptyIcon={<GiNinjaStar/>} fullIcon={<GiNinjaStar/>} edit={false} />
                <span className="text-richblack-400">{course?.ratingAndReviews?.length} Ratings</span>
              </div>
            </div>
          </div>
          <div>
             <button onClick={dispatch(removeFromCart(course._id))}><RiDeleteBin6Line/><span>Remove</span></button>
             <p>{course?.price}</p>
          </div>
         </div>
        ))
      }
    </div>
  );
};

export default RenderCartCourses;
