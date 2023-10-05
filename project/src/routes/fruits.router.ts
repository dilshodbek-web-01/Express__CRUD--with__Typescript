import { Router } from "express";
const router = Router();

import {
  getFruits,
  getFruit,
  createFruit,
  updateFruit,
  deleteFruit,
} from "../controllers/fruits.ctr";

router.get("/read", getFruits);
router.get("/read/:id", getFruit);
router.post("/create", createFruit);
router.put("/update/:id", updateFruit);
router.delete("/delete/:id", deleteFruit);

export default router;
