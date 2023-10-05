import { Router } from "express";
const router = Router();

import {
  getAnimals,
  getAnimal,
  createAnimal,
  updateFruit,
  deleteAnimal,
} from "../controllers/animals.ctr";

router.get("/read", getAnimals);
router.get("/read/:id", getAnimal);
router.post("/create", createAnimal);
router.put("/update/:id", updateFruit);
router.delete("/delete/:id", deleteAnimal);

export default router;
