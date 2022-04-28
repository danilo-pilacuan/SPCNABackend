const express = require("express");
const router = express.Router();
const controllerLessons = require("../controllers/controllerLessons");

router.get("/",controllerLessons.getLessons);
router.get("/course/:id",controllerLessons.getLessonsByCourseId);
router.get("/:id",controllerLessons.getLessonById);
router.post("/",controllerLessons.createLesson);
router.patch("/:id",controllerLessons.updateLesson);
router.delete("/:id",controllerLessons.deleteLesson);

// router.post("/addusertocourse",controllerLessons.addUserToCourse);
// router.post("/adduserstocourse/:id",controllerLessons.addUsersToCourse);
// router.patch("/:id",API.updateUser);
// router.delete("/:id",API.deleteUser);


module.exports = router;

