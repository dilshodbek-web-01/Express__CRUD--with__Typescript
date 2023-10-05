import express, { Application } from "express";
import authRoutes from "./routes/auth.router";
import teacherRoutes from "./routes/teacher.router";
import courseRoutes from "./routes/course.router";
import carRoutes from "./routes/cars.router";
import fruitRoutes from "./routes/fruits.router";
import animalRoutes from "./routes/animals.router";
const app: Application = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/auth", authRoutes);
app.use("/course", courseRoutes);
app.use("/car", carRoutes);
app.use("/fruit", fruitRoutes);
app.use("/animal", animalRoutes);

app.listen(3000);
console.log("Server on port", 3000);
