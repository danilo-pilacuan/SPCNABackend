const mongoose = require("mongoose");

const lessonSchema = mongoose.Schema({
    name:  { type : String , unique : true, required : true },
    description: {
        type: String,
        required: true
    },
    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        default: null
    },
    isActive:{
        type: Boolean,
        required: true
    },
    content:{
        type: Object,
        default: []
    },
    created: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("Lesson",lessonSchema);