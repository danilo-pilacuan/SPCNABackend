const express = require("express");
const router = express.Router();
const controllerTasks = require("../controllers/controllerTasks");

router.get("/",controllerTasks.getTasks);
router.get("/course/:id",controllerTasks.getTasksByCourseId);
router.get("/:id",controllerTasks.getTaskById);
router.post("/",controllerTasks.createTask);
router.patch("/:id",controllerTasks.updateTask);
router.delete("/:id",controllerTasks.deleteTask);

// router.post("/addusertocourse",controllerTasks.addUserToCourse);
// router.post("/adduserstocourse/:id",controllerTasks.addUsersToCourse);
// router.patch("/:id",API.updateUser);
// router.delete("/:id",API.deleteUser);


module.exports = router;

