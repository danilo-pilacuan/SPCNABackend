const express = require("express");
const router = express.Router();
const controllerScriptFiles = require("../controllers/controllerScriptFiles");

router.get("/",controllerScriptFiles.getScriptFiles);
router.get("/user/:id",controllerScriptFiles.getScriptFilesByUserId);
router.get("/course/:id",controllerScriptFiles.getScriptFilesByCourseId);
router.get("/:id",controllerScriptFiles.getScriptFileById);
router.post("/",controllerScriptFiles.createScriptFile);
router.patch("/:id",controllerScriptFiles.updateScriptFile);
router.delete("/:id",controllerScriptFiles.deleteScriptFile);

// router.post("/addusertocourse",controllerLessons.addUserToCourse);
// router.post("/adduserstocourse/:id",controllerLessons.addUsersToCourse);
// router.patch("/:id",API.updateUser);
// router.delete("/:id",API.deleteUser);


module.exports = router;

