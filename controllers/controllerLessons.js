const Course = require("../models/courses");
const User = require("../models/users");
const Lesson = require("../models/lessons");
const ScriptFile = require("../models/scriptFiles");

module.exports = class controllerLessons {
    //fetch all courses
    static async getLessons(req,res){
        try {
            const lessons = await Lesson.find().populate('course').populate('associatedFile');
            res.status(200).json(lessons);
        } catch(err) {
            res.status(404).json({ message: err.message});
        }
    }
    //fetch course by Id
    static async getLessonById(req,res){
        try {
            const lesson = await Lesson.findOne({_id: req.params.id}).populate('course').populate('associatedFile');
            res.status(200).json(lesson);
        } catch(err) {
            res.status(404).json({ message: err.message});
        }

    }

    static async getLessonsByCourseId(req,res){
        try {
            const lessons = await Lesson.find({course: req.params.id}).populate('course').populate('associatedFile');
            res.status(200).json(lessons);
        } catch(err) {
            res.status(404).json({ message: err.message});
        }

    }


    //create a Course
    static async createLesson(req,res){
        // const preLesson ={
        //     name: req.body.name,
        //     description: req.body.description,
        //     course: req.body.course,
        //     isActive: req.body.isActive,
        //     owner: req.body.owner,
        // }

        const scriptFile = new ScriptFile({
            name: "Archivo Leccion: "+req.body.name,
            owner: req.body.owner,
            course: req.body.course,
            content: null,
        })

        //console.log(req.body);
        //const imagename = req.file.filename;
        //User.image = imagename;
        try {
            const resultScript = await scriptFile.save();
            const lesson = new Lesson({
                name: req.body.name,
                description: req.body.description,
                course: req.body.course,
                isActive: req.body.isActive,
                associatedFile: resultScript._id
            })
    
            //console.log(req.body);
            //const imagename = req.file.filename;
            //User.image = imagename;
            try {
                const result = await lesson.save();
                const data = await result.toJSON();
    
                res.status(201).send(data);
            } catch(err) {
                res.status(400).json({ message: err.message});
            }

        } catch(err) {
            res.status(400).json({ message: err.message});
        }



        
    }

    static async updateLesson(req,res){
        const lesson = await Lesson.findOne({_id: req.params.id});
        
        if(!lesson){
            return res.status(404).send({message: "Lesson not found"});
        }
        else{
            const lessonUpdated = await Lesson.findOneAndUpdate({_id: req.params.id},req.body);
            
            res.status(200).send(lessonUpdated);
        }

    }

    static async deleteLesson(req,res){
        try{
            const result = await Lesson.findByIdAndDelete({_id:req.params.id});
            if(result)
            {
                res.status(200).json({message: "Lesson deleted successfully"})
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
