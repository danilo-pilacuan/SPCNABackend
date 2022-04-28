const Course = require("../models/courses");
const User = require("../models/users");
const Lesson = require("../models/lessons")
const task = require("../models/tasks")
const UserTask = require("../models/userTasks")
const ScriptFile = require("../models/scriptFiles");

module.exports = class controlleruserTasks {
    //fetch all courses
    static async getUserTasks(req,res){
        try {
            const userTasks = await UserTask.find().populate('task').populate('course').populate('student').populate('scriptFile');
            res.status(200).json(userTasks);
        } catch(err) {
            res.status(404).json({ message: err.message});
        }
    }
    //fetch course by Id
    static async getUserTaskById(req,res){
        try {
            const userTask = await UserTask.findOne({_id: req.params.id}).populate('task').populate('course').populate('student').populate('scriptFile');
            res.status(200).json(userTask);
        } catch(err) {
            res.status(404).json({ message: err.message});
        }

    }

    static async getUserTasksByCourseId(req,res){
        try {
            const userTasks = await UserTask.find({course: req.params.id}).populate('task').populate('course').populate('student').populate('scriptFile');
            res.status(200).json(userTasks);
        } catch(err) {
            res.status(404).json({ message: err.message});
        }
    }

    static async getUserTasksByTaskId(req,res){
        try {
            const userTasks = await UserTask.find({task: req.params.id}).populate('task').populate('course').populate('student').populate('scriptFile');
            res.status(200).json(userTasks);
        } catch(err) {
            res.status(404).json({ message: err.message});
        }
    }

    static async getUserTasksByStudentId(req,res){
        try {
            const userTasks = await UserTask.find({student: req.params.id}).populate('task').populate('course').populate('student').populate('scriptFile');
            res.status(200).json(userTasks);
        } catch(err) {
            res.status(404).json({ message: err.message});
        }
    }
    static async getUserTasksByStudentAndByCourseId(req,res){
        try {
            const userTasks = await UserTask.find({student: req.params.studentId,course:req.params.courseId}).populate('task').populate('course').populate('student').populate('scriptFile');
            res.status(200).json(userTasks);
        } catch(err) {
            res.status(404).json({ message: err.message});
        }
    }
    


    //create a Course
    static async createUserTask(req,res){
        
        const userTask = new UserTask({
            student: req.body.student,
            task: req.body.task,
            course: req.body.course,
            scriptFile: req.body.scriptFile,
            isUploaded: true,
            hasScore: false,
            score: 0,
        })
        try {
            const result = await userTask.save();
            const data = await result.toJSON();

            res.status(201).send(data);
        } catch(err) {
            res.status(400).json({ message: err.message});
        }
    }

    static async updateUserTask(req,res){
        const userTask = await UserTask.findOne({_id: req.params.id});
        
        if(!userTask){
            return res.status(404).send({message: "userTask not found"});
        }
        else{
            const userTaskUpdated = await UserTask.findOneAndUpdate({_id: req.params.id},req.body);
            
            res.status(200).send(userTaskUpdated);
        }

    }

    static async deleteUserTask(req,res){
        try{
            const result = await UserTask.findByIdAndDelete({_id:req.params.id});
            if(result)
            {
                res.status(200).json({message: "userTask deleted successfully"})
            }
            else
            {
                res.status(404).json({message: "Not found"})
            }
        }
        catch(err)
        {
            res.status(404).json({message: err.message})
        }
    }
    

}
