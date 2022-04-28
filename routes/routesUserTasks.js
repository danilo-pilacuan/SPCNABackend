const express = require("express");
const router = express.Router();
const controllerUserTasks = require("../controllers/controllerUserTasks");

router.get("/",controllerUserTasks.getUserTasks);
router.get("/course/:id",controllerUserTasks.getUserTasksByCourseId);
router.get("/task/:id",controllerUserTasks.getUserTasksByTaskId);
router.get("/student/:id",controllerUserTasks.getUserTasksByStudentId);
router.get("/userTask/:courseId/:studentId",controllerUserTasks.getUserTasksByStudentAndByCourseId);

router.get("/:id",controllerUserTasks.getUserTaskById);
router.post("/",controllerUserTasks.createUserTask);
router.patch("/:id",controllerUserTasks.updateUserTask);
router.delete("/:id",controllerUserTasks.deleteUserTask);

// router.post("/addusertocourse",controllerUserTasks.addUserToCourse);
// router.post("/adduserstocourse/:id",controllerUserTasks.addUsersToCourse);
// router.patch("/:id",API.updateUser);
// router.delete("/:id",API.deleteUser);


module.exports = router;

