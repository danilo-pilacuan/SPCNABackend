const Course = require("../models/courses");
const User = require("../models/users");
module.exports = class controllerCourses {
    //fetch all courses
    static async getCourses(req,res){
        /* 	#swagger.tags = ['User']
        #swagger.description = 'Endpoint to sign in a specific user' */

    /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: 'User information.',
            required: true,
            schema: { $ref: "#/definitions/AddUser" }
    } */

    /* #swagger.security = [{
            "apiKeyAuth": []
    }] */
        try {
            const courses = await Course.find().populate('users');
            res.status(200).json(courses);
        } catch(err) {
            res.status(404).json({ message: err.message});
        }
    }
    //fetch course by Id
    static async getCourseById(req,res){
        try {
            const course = await Course.findOne({_id: req.params.id}).populate('users');
            res.status(200).json(course);
        } catch(err) {
            res.status(404).json({ message: err.message});
        }

    }

    static async getCoursesByOwnerId(req,res){
        try {
            const course = await Course.find({teacherOwner: req.params.id}).populate('users');
            res.status(200).json(course);
        } catch(err) {
            res.status(404).json({ message: err.message});
        }

    }

    static async addUserToCourse(req,res)
    {

        const user = await User.findOne({_id: req.body.userId});
        if(!user)
        {
            return res.status(404).send({message: "User not found"});
        }
        else
        {
            const course = await Course.findOne({_id: req.body.courseId});
            if(!course)
            {
                return res.status(404).send({message: "Course not found"});
            }
            else
            {
                var userCourses = user.courses;
                userCourses.push(course._id);
                const userUpdate = {courses: userCourses};
                const userPreUpdate = await User.findOneAndUpdate({_id: user._id}, userUpdate);

                var courseUsers = course.users;
                courseUsers.push(user._id);
                const courseUpdate = {users: courseUsers};
                const coursePreUpdate = await Course.findOneAndUpdate({_id: course._id},courseUpdate);

                const courses = await Course.find().populate('users');
                res.status(200).json(courses);

            }
        }
    }

    static async addUsersToCourse(req,res)
    {
        // console.log("alumnos")
        // console.log(req.body.alumnos)
        // res.status(200).send({message: "success"});

        try
        {
            const course = await Course.findOne({_id: req.params.id});
            if(course)
            {

                const usersUpdate = req.body.alumnos;
                const coursePreUpdate = await Course.findOneAndUpdate({_id: course._id},{users: req.body.alumnos});
                const allAlumnos = await User.find({ "userType" : 3}).populate('courses');                
                for(const elementAlumno of allAlumnos)
                {
                    var arrayCoursesIds = null;
                    //this.tablaSendAlumnos = this.tablaInscritos.map(elemento=>elemento._id)
                    arrayCoursesIds = elementAlumno.courses.map(elemento=>elemento._id)

                    // this.tablaInscritos = this.tablaInscritos.filter(
                    //     (alumnoo) => alumnoo != selectedAlumno
                    //   );

                    if (arrayCoursesIds.includes(req.params.id)) {
   
                        //console.log(element)
                        
                        var auxCourses=elementAlumno.courses
                        //coursesUsers.push(req.params.id);
                        
                        try{
                            auxCourses=auxCourses.filter((course) =>
                                course._id!=req.params.id
                            );
                            const userPreUpdateAux = await User.findOneAndUpdate({_id: elementAlumno.id},{courses: auxCourses});
                        }
                        catch(err)
                        {
                            console.log(err)
                        }
                    }
                }
                for(const element of usersUpdate)
                {
                    const user = await User.findOne({_id: element});
                    if(user)
                    {
                        const coursesUsers = user.courses;
                        if (!coursesUsers.includes(req.params.id)) {
                            coursesUsers.push(req.params.id);
                        }
                        const userPreUpdate = await User.findOneAndUpdate({_id: element},{courses: coursesUsers});
                    }
                }
                //const courses = await Course.find().populate('users');

                res.status(200).send({message: "success"});
            }
            else
            {
                return res.status(404).send({message: "User not found"});
            }
        }
        catch(err)
        {

        }

    }

    //create a Course
    static async createCourse(req,res){
        console.log("crear curso")
        const course = new Course({
            name: req.body.name,
            description: req.body.description,
            teacherOwner: req.body.teacherOwner,
            isActive: req.body.isActive 
            // user_id:req.body.user_id,
            
        })

        //console.log(req.body);
        //const imagename = req.file.filename;
        //User.image = imagename;
        try {
            const result = await course.save();
            const data = await result.toJSON();

            res.status(201).send(data);
        } catch(err) {
            res.status(400).json({ message: err.message});
        }
    }

    static async updateCourse(req,res){
        console.log("patched")
        const course = await Course.findOne({_id: req.params.id});
        
        if(!course){
            return res.status(404).send({message: "Course not found"});
        }
        else{
            const courseUpdated = await Course.findOneAndUpdate({_id: req.params.id},req.body);
            console.log(courseUpdated)
            res.status(200).send(courseUpdated);
        }

    }

    static async deleteCourse(req,res){
        try{
            const result = await Course.findByIdAndDelete({_id:req.params.id});
            if(result)
            {
                res.status(200).json({message: "Course deleted successfully"})
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