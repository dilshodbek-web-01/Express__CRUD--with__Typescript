"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const course_router_1 = __importDefault(require("./routes/course.router"));
const cars_router_1 = __importDefault(require("./routes/cars.router"));
const fruits_router_1 = __importDefault(require("./routes/fruits.router"));
const animals_router_1 = __importDefault(require("./routes/animals.router"));
const app = express_1.default();
// middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Routes
app.use("/auth", auth_router_1.default);
app.use("/course", course_router_1.default);
app.use("/car", cars_router_1.default);
app.use("/fruit", fruits_router_1.default);
app.use("/animal", animals_router_1.default);
app.listen(3000);
console.log("Server on port", 3000);
