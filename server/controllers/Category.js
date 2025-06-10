const Category = require('../models/Category');
const Course = require('../models/Course');
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }
//create tag handler
exports.createCategory = async (req, res) => {
    try {

        //fetch data
        const {name, description} = req.body;
        //validation
        if(!name) {
            return res
                .status(404)
                .json({
                success: false,
                message: 'All fields are required'
            })
        }

        //create entry in DB
        const CategoryDetails = await Category.create({
            name: name,
            description: description,
        });
        console.log(CategoryDetails);
        //return response
        return res.status(200).json({
            success: true,
            message: 'Category Created Successfully',
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.showAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find(
            {}, 
            {name: true, description: true}
        );
        res.status(200).json({
            success: true,
            message: "All tags returned successfully",
            data: allCategories,
        })

    } catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//categoryPageDetails
exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body

      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: "ratingAndReviews",
        })
        .exec()
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }

      // Handle the case when there are no courses
      if (selectedCategory.courses.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }

      // Get courses for other categories
      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      })

      let differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec()
      const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "instructor",
        },
        })
        .exec()

      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)

       // console.log("mostSellingCourses COURSE", mostSellingCourses)
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

exports.addCourseToCategory = async (req, res) => {
	const { courseId, categoryId } = req.body;
	// console.log("category id", categoryId);
	try {
		const category = await Category.findById(categoryId);
		if (!category) {
			return res.status(404).json({
				success: false,
				message: "Category not found",
			});
		}
		const course = await Course.findById(courseId);
		if (!course) {
			return res.status(404).json({
				success: false,
				message: "Course not found",
			});
		}
		if(category.courses.includes(courseId)){
			return res.status(200).json({
				success: true,
				message: "Course already exists in the category",
			});
		}
		category.courses.push(courseId);
		await category.save();
		return res.status(200).json({
			success: true,
			message: "Course added to category successfully",
		});
	}
	catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
}