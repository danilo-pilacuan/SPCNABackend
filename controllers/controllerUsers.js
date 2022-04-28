const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports = class controllerUsers {
    //fetch all Users
    static async fetchAllUsers(req,res){
        try {
            const users = await User.find().populate('courses');
            res.status(200).json(users);
        } catch(err) {
            res.status(404).json({ message: err.message});
        }
    }
    //fetch all Users
    static async fetchUserByID(req,res){
        res.send("Fetch User by id");
    }
    //create a User
    static async createUser(req,res){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            // cursos: "611bac86d55e4283fe28dd25",
            userType: req.body.userType
        })

        //console.log(req.body);
        //const imagename = req.file.filename;
        //User.image = imagename;
        try {
            const result = await user.save();
            const {password, ...data} = await result.toJSON();

            res.status(201).send(data);
        } catch(err) {
            res.status(400).json({ message: err.message});
        }
    }

    //login user
    static async login(req,res){
        const user = await User.findOne({name: req.body.name});
        console.log(req.body.name);
        if(!user){
            return res.status(404).send({message: "User not found"});
        }
        else{
            if(!await bcrypt.compare(req.body.password,user.password)){
                return res.status(400).send({message: "invalid credentials"});
            }
            else
            {
                const token = jwt.sign({_id: user._id}, "secret") //colocar secret en archivo .env
                res.cookie('jwt',token,{
                    httpOnly: true,
                    maxAge: 24*60*60*1000 //1 dia
                })
                res.status(200).send({message: "success"});
            }

        }
    }
    //get cookie
    static async getUser(req,res){
        try{
            const cookie = req.cookies['jwt'];
            const claims = jwt.verify(cookie,"secret"); //desencriptar jwt con la clave entre comillas, debe estar en el .env
            if(!claims){
                return res.status(401).send({ message: "unauthenticated"});
            }
            else
            {
                console.log("Auth:")
                console.log(claims._id)
                const user = await User.findOne({ _id : claims._id}).populate('courses');
                const {password, ...data} = user.toJSON()
                res.send(data);
            }
        }catch(e)
        {
            return res.status(401).send({message:"unauthenticated"});
        }
        
    }
    
    static async getUserById(req,res){
        try{
            const user = await User.findOne({ "_id" : req.params.id});
            
            const {password, ...data} = user.toJSON()
            res.status(200).send(data);
        }catch(e)
        {
            return res.status(401).send({message:"unauthenticated!!!!"});
        }
        
    }
    //logout
    static async logout(req,res){
        res.cookie('jwt','',{maxAge:0});
        res.status(200).send({message: "success"})
    }

    //update a User
    static async updateUser(req,res){
        
        const user = await User.findOne({name: req.params.name});
        console.log(req.params.name);
        if(!user){
            return res.status(404).send({message: "User not found"});
        }
        else{
            const userEnc = await User.findOne({name: req.params.name});
            var actu = userEnc.cursos;
            actu.push("6159942fec9f60ea22e302fb");
            const update2={cursos: actu};
            const userUpdated = await User.findOneAndUpdate({name: req.params.name},update2);
            console.log(userUpdated)
            
        }

    }
    static async fetchAllAlumnos(req,res)
    {
        try {
            const users = await User.find({ "userType" : 3}).populate('courses');
            res.status(200).json(users);
        } catch(err) {
            res.status(404).json({ message: err.message});
        }
    }
    //delete a User
    static async deleteUser(req,res){
        const user = await User.findOne({name: req.params.name});
        console.log(req.params.name);
        if(!user){
            return res.status(404).send({message: "User not found"});
        }
        else{
            const userEnc = await User.findOne({name: req.params.name});
            var actu = userEnc.cursos;
            actu=actu.filter(item=>item!= "6159942fec9f60ea22e302fb");
            const update2={cursos: actu};
            const userUpdated = await User.findOneAndUpdate({name: req.params.name},update2);
            console.log(userUpdated)
            
        }
    }
}