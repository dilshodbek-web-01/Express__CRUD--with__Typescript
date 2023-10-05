import { Router } from "express";
const router = Router();

import {
  getCourses,
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/course.ctr";

router.get("/read", getCourses);
router.get("/read/:id", getCourse);
router.post("/create", createCourse);
router.put("/update/:id", updateCourse);
router.delete("/delete/:id", deleteCourse);

export default router;
