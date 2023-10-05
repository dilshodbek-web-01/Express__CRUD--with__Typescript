"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const animals_ctr_1 = require("../controllers/animals.ctr");
router.get("/read", animals_ctr_1.getAnimals);
router.get("/read/:id", animals_ctr_1.getAnimal);
router.post("/create", animals_ctr_1.createAnimal);
router.put("/update/:id", animals_ctr_1.updateFruit);
router.delete("/delete/:id", animals_ctr_1.deleteAnimal);
exports.default = router;