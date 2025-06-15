const mongoose = require('mongoose');

const ratingAndReviewSchema = new mongoose.Schema({
    course:{
        type:mongoose.Types.ObjectId,
        ref:"Course",
        required:true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User",
    },
    reviews: {
        type: String,
        required: true,
    },
    ratings: {
        type: Number,
        required: true,
    },
})

module.exports = mongoose.model('RatingAndReview', ratingAndReviewSchema);