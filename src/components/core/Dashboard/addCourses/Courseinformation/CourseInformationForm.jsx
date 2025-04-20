import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI'


const CourseInformationForm = () => {

  const {register , handleSubmit , setValue, getValues , formState: {errors}} = useForm();
  const dispatch = useDispatch();
  const {course , editCourse } = useSelector((state)=>state.course);
  const [loading , setLoading] = useState(false);
  const [courseCategories , setCourseCategories] = useState([]);

  useEffect (()=>{
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      if(categories.length>0){
      setCourseCategories(data);
      }
      setLoading(false);
    }
    if(editCourse){
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }
   
  })
  return (
    <form>

    </form>
  )
}

export default CourseInformationForm