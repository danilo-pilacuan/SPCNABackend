const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:  { type : String , unique : true, required : true },
    email: {
        type: String,
        unique: true,
        required: true
    },
    //permissions:[Number],
    password:  { type : String , unique : true, required : true },
    userType: 
    {
        type: Number,
        required: true
    },
    //typeDescription
    courses:
    [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        default: null,
    }],
    created: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("User",userSchema);