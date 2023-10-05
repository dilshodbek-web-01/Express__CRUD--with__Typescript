import { Router } from "express";
const router = Router();

import {
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
} from "../controllers/cars.ctr";

router.get("/read", getCars);
router.get("/read/:id", getCar);
router.post("/create", createCar);
router.put("/update/:id", updateCar);
router.delete("/delete/:id", deleteCar);

export default router;
