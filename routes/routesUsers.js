const express = require("express");
const router = express.Router();
const controllerUsers = require("../controllers/controllerUsers");

const multer = require('multer');

//multer middleware
let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./uploads');
    },
    filename: function(req,file,cb){
        cb(null,file.fieldname+"_"+Date.now()+"_"+file.originalname);
    },
});

let upload = multer({
    storage: storage,
}).single("image");

router.get("/getAll",controllerUsers.fetchAllUsers);
router.get("/getAlumnos",controllerUsers.fetchAllAlumnos);
router.get("/get",controllerUsers.getUser);
router.get("/:id",controllerUsers.getUserById);

router.post("/logout",controllerUsers.logout);


//router.get("/:id",API.fetchUserByID);
//router.post("/",upload,API.createPost);
//router.get("/getAll",controllerUsers.getUser);

router.post("/",controllerUsers.createUser);
router.post("/login",controllerUsers.login);
router.patch("/:name",controllerUsers.updateUser);
router.delete("/:name",controllerUsers.deleteUser);




module.exports = router;

