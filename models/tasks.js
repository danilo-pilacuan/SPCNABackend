const mongoose = require("mongoose");

const tasksSchema = mongoose.Schema({
    name:  { type : String, required : true },
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
        default: null
    },

    created: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("Task",tasksSchema);