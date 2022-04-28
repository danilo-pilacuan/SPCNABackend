const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
    name:  { type : String , unique : true, required : true },
    description: {
        type: String,
        required: true
    },
    teacherOwner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    isActive:{
        type: Boolean,
        required: true
    },
    //permissions:[Number],
    // user_id: 
    // {
    //     type: String,
    //     required: true
    // },
    users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    }],
    created: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("Course",courseSchema);