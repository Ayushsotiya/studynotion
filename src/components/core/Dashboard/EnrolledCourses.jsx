import React from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react';
import { useEffect } from 'react';
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';
const EnrolledCourses = () => {

  const {token} = useSelector((state)=>state.auth);
  const [enrolledCourses,setEnrolledCourses] = useState(null);

  const getEnrolledCourses = async() =>{
    try{
         const response = await getUserEnrolledCourses(token);
         setEnrolledCourses(response);
    }catch(error){
      console.log("Error in getting enrolled courses",error);
    }
  }

  useEffect(()=>{
    getEnrolledCourses();
  },[]);

  return (
    <div className='text-white'>
      <div className='text-3xl font-bold  text-white'>Enrolled Courses</div>
      {
        !enrolledCourses ? (<div>Loading ...</div>) : !enrolledCourses.length?(<>You have not enrolled in any course yet </>) :(
          <div>
            <div>
              <p>Course Name</p>
              <p>Duration</p>
              <p>Progress</p>
            </div>
            {
              enrolledCourses.map((course,index) => (
                <div key={index} className='flex flex-col gap-2'>
                  <div>
                     <img src={course.thumbnail}></img>
                     <div>
                        <p>{course.courseName}</p>
                        <p>{course.courseDescription}</p>
                     </div>
                  </div>
                  <div>
                    <p>{course.duration}</p>
                  </div>
                  <div>
                     <p>Progress : {course.progressPercentage || 0} %</p>
                     <ProgressBar completed={course.progressPercentage|| 0} height='8px' isLabelVisible={false}></ProgressBar>
                  </div>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default EnrolledCourses