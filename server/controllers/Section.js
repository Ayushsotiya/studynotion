const Section = require('../models/Section');
const Course = require('../models/Course');

//Create a new section
exports.createSection = async (req, res) => {
    try {
        //data fetch 
        const {sectionName, courseId} = req.body;
        //data validation
        if(!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: 'Missing required properties'
            });
        }
        //create a new section
        const newSection = await Section.create({sectionName});
        //update course with setion objectID
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id,
                }
            },
            {new: true},
        )
        //HW: use populate to replace section /sub-section both in the updatedCourseDetails
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        //return updated course object in response
        return res.status(200).json({
            success: true,
            message: 'Section Created Successfully',
            updatedCourseDetails,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        })
    }
}

//Update a section
exports.updateSection = async (req, res) => {
	try {
		const { sectionName, sectionId,courseId } = req.body;
		const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);

		const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();

		res.status(200).json({
			success: true,
			message: section,
			data:course,
		});
	} catch (error) {
		console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};


//Delete a section
exports.deleteSection = async (req, res) => {
	try {
		const { sectionId, courseId }  = req.body;

		// Remove section reference from course
		await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		});

		// Find the section
		const section = await Section.findById(sectionId);
		console.log("SECTION FOUND:", section);

		if (!section) {
			return res.status(404).json({
				success: false,
				message: "Section not Found",
			});
		}

		// Delete all sub-sections safely
		if (section?.subSection?.length > 0) {
			await SubSection.deleteMany({ _id: { $in: section.subSection } });
		}

		// Delete the section
		await Section.findByIdAndDelete(sectionId);

		// Return updated course
		const course = await Course.findById(courseId).populate({
			path: "courseContent",
			populate: {
				path: "subSection",
			},
		}).exec();

		res.status(200).json({
			success: true,
			message: "Section deleted",
			data: course,
		});
	} catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};
  