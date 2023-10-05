import { Router } from "express";
const router = Router();

import {
  getTeachers,
  createTeacher,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} from "../controllers/teacher.controller";

router.get("/teachers", getTeachers);
router.get("/teachers/:teacher_id", getTeacherById);
router.post("/teacher", createTeacher);
router.put("/teachers/:id", updateTeacher);
router.delete("/teachers/:id", deleteTeacher);

export default router;
