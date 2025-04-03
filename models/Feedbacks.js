const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
        unique:true
    },
    feedback: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    img:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
}, {
    timestamps: true
});

const FeedbackSchema = mongoose.model('FeedbackSchema', feedbackSchema);
module.exports = FeedbackSchema;