const Profile = require('../models/Profile');
const User = require('../models/User');
const { uploadImageToCloudinary } = require('../utils/imageUploader');
const { convertSecondsToDuration } = require('../utils/secToDuration');
const Course  = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
//Method for updating a profile
exports.updateProfile = async (req, res) => {
    try {
        //get data
        const { dateOfBirth = '', about = '', contactNumber, gender = '' } = req.body;
        //get userId
        const id = req.user.id;

        //Find the profile by id
        const user = await User.findById(id);
        const profile = await Profile.findById(user.additionalDetails);

        //update profile fields
        profile.dateOfBirth = dateOfBirth;
        profile.about = about;
        profile.contactNumber = contactNumber;
        profile.gender = gender;

        //Save the updated profile
        await profile.save();

        //return response
        return res.status(200).json({
            success: true,
            message: 'Profile Updated Successfully',
            profile,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error in Updating Profile',
            error: error.message,
        });
    }
};

//delete Account
//Explore -> How can we schedule
exports.deleteAccount = async (req, res) => {
    try {
        //TODO: Find More on Job Schedule
        //Const job = schedule.scheduleJob('10 * * * * *', function () {
        //    console.log('The answer to life');
        //})
        //console.log(job);
        // console.log('Printing ID: ', req.user.id);

        //get id
        const id = req.user.id;
        //validation of id
        const user = await User.findById({ _id: id })
        //delete profile
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User Not Found',
            });
        }
        //delete associated profile with user
        await Profile.findByIdAndDelete({ _id: user.additionalDetails });
        //TODO: HW unenroll user form all enroled courses
        //Now delete user
        await User.findByIdAndDelete({ _id: id });
        //return response
        return res.status(200).json({
            success: true,
            message: 'User Deleted Successfully',
        });

    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: 'User Cannot Be Deleted',
                error: error.message,
            });
    }
}

exports.getAllUserDetails = async (req, res) => {
    try {
        //get id
        const id = req.user.id;

        //validation and get user details
        const userDetails = await User.findById(id)
            .populate('additionalDetails')
            .exec();
        console.log(userDetails);
        //return response
        return res.status(200).json({
            success: true,
            message: 'User Data Fetched Successfully',
            data: userDetails,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
        const displayPicture = req.files.displayPicture;
        const userId = req.user.id;
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        console.log(image);
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
        )
        res.send({
            success: true,
            message: `Image Updated Successfully`,
            data: updatedProfile,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;

        let userDetails = await User.findOne({ _id: userId })
            .populate({
                path: 'courses',
                populate: {
                    path: 'courseContent',
                    populate: {
                        path: 'subSection',
                    },
                },
            })
            .exec();
            console.log("1")
        userDetails = userDetails.toObject()
        console.log("1.5")
        console.log(userDetails);   
        var SubsectionLength = 0
        for (var i = 0; i < userDetails.courses.length; i++) {
            let totalDurationInSeconds = 0
            SubsectionLength = 0
            for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
                totalDurationInSeconds += userDetails.courses[i].courseContent[
                    j
                ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
                userDetails.courses[i].totalDuration = convertSecondsToDuration(
                    totalDurationInSeconds
                )
                SubsectionLength +=
                    userDetails.courses[i].courseContent[j].subSection.length
            }
            let courseProgressCount = await CourseProgress.findOne({
                courseID: userDetails.courses[i]._id,
                userId: userId,
            })
            courseProgressCount = courseProgressCount?.completedVideos.length
            if (SubsectionLength === 0) {
                userDetails.courses[i].progressPercentage = 100
            } else {
                // To make it up to 2 decimal point
                const multiplier = Math.pow(10, 2)
                userDetails.courses[i].progressPercentage =
                    Math.round(
                        (courseProgressCount / SubsectionLength) * 100 * multiplier
                    ) / multiplier
            }
        }
        console.log("2")
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with ID: ${userId}`,
            });
        }
        console.log("3")
        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id })
    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course?.studentsEnrolled?.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats
    })

    res.status(200).json({ courses: courseData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}