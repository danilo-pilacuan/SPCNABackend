const mongoose = require("mongoose");

const userTaskSchema = mongoose.Schema({
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    task:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        default: null
    },
    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        default: null
    },
    scriptFile:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ScriptFile',
        default: null
    },
    isUploaded:{
        type: Boolean,
        required: true,
        default:false
    },
    hasScore:{
        type: Boolean,
        required: true
    },
    
    score:{
        type: Number,
        default: 0
    },
    // content:{
    //     type: Object,
    //     default: null
    // },
    created: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("UserTask",userTaskSchema);