
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
const CourseDetails = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const disptach = useDispatch();
  const { courseId } = useParams();
  const navigate = useNavigate();

  
  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, disptach);
      return;
    }
  }
  return (
    <div className="flex item-center ">
      <button className='bg-yellow-50 p-6 mt-10 ' onClick={() => handleBuyCourse()}>Buy now</button>
    </div>
  )
}

export default CourseDetails