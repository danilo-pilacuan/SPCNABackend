const express = require("express");
const router = express.Router();
const controllerCourses = require("../controllers/controllerCourses");

router.get("/",controllerCourses.getCourses);
router.get("/owner/:id",controllerCourses.getCoursesByOwnerId);
router.get("/:id",controllerCourses.getCourseById);
router.post("/",controllerCourses.createCourse);
router.patch("/:id",controllerCourses.updateCourse);
router.delete("/:id",controllerCourses.deleteCourse);
router.post("/addusertocourse",controllerCourses.addUserToCourse);
router.post("/adduserstocourse/:id",controllerCourses.addUsersToCourse);
// router.patch("/:id",API.updateUser);
// router.delete("/:id",API.deleteUser);


module.exports = router;

