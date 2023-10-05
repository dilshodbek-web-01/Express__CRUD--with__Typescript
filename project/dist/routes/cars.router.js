"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const cars_ctr_1 = require("../controllers/cars.ctr");
router.get("/read", cars_ctr_1.getCars);
router.get("/read/:id", cars_ctr_1.getCar);
router.post("/create", cars_ctr_1.createCar);
router.put("/update/:id", cars_ctr_1.updateCar);
router.delete("/delete/:id", cars_ctr_1.deleteCar);
exports.default = router;