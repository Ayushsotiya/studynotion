import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom'
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"
const ViewCourse = () => {
    const [reviewModal, setReviewModal] = useState(false);
    const { courseId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        const setCourseSpecificDetails = async () => {
            const courseData = await getFullDetailsOfCourse(courseId, token);
            dispatch(setCourseSectionData(courseData.data.data.courseDetails.courseContent));
            dispatch(setEntireCourseData(courseData.data.data.courseDetails));
            dispatch(setCompletedLectures(courseData.data.data.completedVideos));
            let lectures = 0;
            courseData?.courseDetails?.courseContent?.forEach((sec) => {
                lectures += sec.subSection.length;
            })
            dispatch((setTotalNoOfLectures(lectures)));
        }
        setCourseSpecificDetails();
    }, [])
    return (
        <>
            <div className="relative flex min-h-[calc(100vh-3.5rem)]">
                <VideoDetailsSidebar setReviewModal={setReviewModal} />
                <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                    <div className="mx-6">
                        <Outlet />
                    </div>
                </div>
            </div>
            {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
        </>
    )
}

export default ViewCourse;