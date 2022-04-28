const Course = require("../models/courses");
const User = require("../models/users");
const Lesson = require("../models/lessons")
const ScriptFile = require("../models/scriptFiles")

module.exports = class controllerScriptFiles {
    //fetch all courses
    static async getScriptFiles(req,res){
        try {
            const scriptFiles = await ScriptFile.find().populate('user');
            res.status(200).json(scriptFiles);
        } catch(err) {
            res.status(404).json({ message: err.message});
        }
    }
    //fetch course by Id
    static async getScriptFileById(req,res){
        try {
            const scriptFile = await ScriptFile.findOne({_id: req.params.id}).populate('user');
            res.status(200).json(scriptFile);
        } catch(err) {
            res.status(404).json({ message: err.message});
        }

    }


    static async getScriptFilesByCourseId(req,res){
        try {
            const scriptFiles = await ScriptFile.find({course: req.params.id}).populate('course');
            res.status(200).json(scriptFiles);
        } catch(err) {
            res.status(404).json({ message: err.message});
        }

    }


    static async getScriptFilesByUserId(req,res){
        try {
            const scriptFiles = await ScriptFile.find({owner: req.params.id}).populate('course');
            res.status(200).json(scriptFiles);
        } catch(err) {
            res.status(404).json({ message: err.message});
        }

    }


    //create a Course
    static async createScriptFile(req,res){
        
        const scriptFile = new ScriptFile({
            name: req.body.name,
            owner: req.body.owner,
            course: req.body.course,
            content: req.body.content,
            
        })

        //console.log(req.body);
        //const imagename = req.file.filename;
        //User.image = imagename;
        try {
            const result = await scriptFile.save();
            const data = await result.toJSON();

            res.status(201).send(data);
        } catch(err) {
            res.status(400).json({ message: err.message});
        }
    }

    static async updateScriptFile(req,res){
        const scriptFile = await ScriptFile.findOne({_id: req.params.id});
        
        if(!scriptFile){
            return res.status(404).send({message: "Script not found"});
        }
        else{
            const scriptFileUpdated = await ScriptFile.findOneAndUpdate({_id: req.params.id},req.body);
            
            res.status(200).send(scriptFileUpdated);
        }

    }

    static async deleteScriptFile(req,res){
        try{
            const result = await ScriptFile.findByIdAndDelete({_id:req.params.id});
            if(result)
            {
                res.status(200).json({message: "Script deleted successfully"})
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
