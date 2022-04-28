const Course = require("../models/courses");
const User = require("../models/users");
const Lesson = require("../models/lessons")
const Task = require("../models/tasks")
const ScriptFile = require("../models/scriptFiles");
const UserTask = require("../models/userTasks")

module.exports = class controllerTasks {
    //fetch all courses
    static async getTasks(req,res){
        try {
            const tasks = await Task.find().populate('course');
            res.status(200).json(tasks);
        } catch(err) {
            res.status(404).json({ message: err.message});
        }
    }
    //fetch course by Id
    static async getTaskById(req,res){
        try {
            const task = await Task.findOne({_id: req.params.id}).populate('course');
            res.status(200).json(task);
        } catch(err) {
            res.status(404).json({ message: err.message});
        }

    }

    static async getTasksByCourseId(req,res){
        try {
            const tasks = await Task.find({course: req.params.id}).populate('course');
            res.status(200).json(tasks);
        } catch(err) {
            res.status(404).json({ message: err.message});
        }

    }


    //create a Course
    static async createTask(req,res){
        console.log("CREATE TASK")
        
        const task = new Task({
            name: req.body.name,
            description: req.body.description,
            course: req.body.course,
            isActive: req.body.isActive,
            content: req.body.content,
            
        })
        console.log(task)
        try {
            console.log("CT1")
            const taskResult = await task.save();
            const taskData = await taskResult.toJSON();
            console.log("CT2")
            const users = await User.find({ courses : req.body.course});
            console.log("CT3")
            console.log(users)
            for(var i=0;i<users.length;i++)
            {
                console.log("CT4")
                console.log(users[i])
                const scriptFile = new ScriptFile({
                    name: "Archivo Actividad: "+req.body.name+" Alumno: "+users[i].name,
                    owner: users[i]._id,
                    course: req.body.course,
                    content: null,
                })
                console.log(scriptFile)
                try {
                    const resultScript = await scriptFile.save();
                    const userTask = new UserTask({
                        student: users[i]._id,
                        task: taskResult._id,
                        course: req.body.course,
                        scriptFile: resultScript._id,
                        isUploaded: false,
                        hasScore: false,
                        score: 0,
                    })
                    try {
                        const userTaskResult = await userTask.save();
                    } catch(err) {
                        console.log(err.message);
                    }
        
                } catch(err) {
                    console.log(err.message);
                }
            }
            res.status(201).send(taskData);
        } catch(err) {
            res.status(404).json({ message: err.message});
        }
        
        // try {
        //     const result = await task.save();
        //     const data = await result.toJSON();

        //     res.status(201).send(data);
        // } catch(err) {
        //     res.status(400).json({ message: err.message});
        // }
    }

    static async updateTask(req,res){
        const task = await Task.findOne({_id: req.params.id});
        
        if(!task){
            return res.status(404).send({message: "Task not found"});
        }
        else{
            const taskUpdated = await Task.findOneAndUpdate({_id: req.params.id},req.body);
            
            res.status(200).send(taskUpdated);
        }

    }

    static async deleteTask(req,res){
        try{
            const result = await Task.findByIdAndDelete({_id:req.params.id});
            if(result)
            {
                res.status(200).json({message: "Task deleted successfully"})
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
