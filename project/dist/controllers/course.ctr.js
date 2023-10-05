"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (user_token) => __awaiter(void 0, void 0, void 0, function* () {
    return yield jsonwebtoken_1.default.verify(user_token, "secret_key");
});
const getOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let response = yield database_1.default.query("SELECT * FROM courses WHERE id = $1", [id]);
    return response.rows[0];
});
exports.getCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userInfo = yield verifyToken(req.headers.token);
        const response = yield database_1.default.query("SELECT * FROM courses WHERE created_by_user_id = $1", [userInfo.id]);
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Internal Server error" });
    }
});
exports.getCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    if (!req.headers.token)
        return res.json({ message: "Token not found !!!" });
    let userInfo = yield verifyToken(req.headers.token);
    let course = yield getOne(id);
    if (!course)
        return res.json({ message: "Course not found!" });
    let response = yield database_1.default.query("SELECT * FROM courses WHERE id = $1 AND created_by_user_id = $2", [id, userInfo.id]);
    return res.json(response.rows[0]);
});
exports.createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, price, description, teacher_id } = req.body;
    if (!req.headers.token)
        return res.json({ message: "Token not found !" });
    let userInfo = yield verifyToken(req.headers.token);
    const response = yield database_1.default.query(`INSERT INTO courses(title, price, description, teacher_id, created_by_user_id) 
    VALUES ($1, $2, $3, $4, $5)`, [title, price, description, teacher_id, userInfo.id]);
    res.json({
        message: "Create course",
    });
});
exports.updateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { title, price, description, teacher_id } = req.body;
    if (!req.headers.token)
        return res.json({ message: "Token not found !" });
    let userInfo = yield verifyToken(req.headers.token);
    let course = yield getOne(id);
    if (!course)
        return res.json({ message: "Course not found!" });
    yield database_1.default.query(` 
    UPDATE courses SET title = COALESCE($1, title), price = COALESCE($2, price),
    description = COALESCE($3, description), teacher_id = COALESCE($4, teacher_id)
    WHERE created_by_user_id = $5 AND id = $6
`, [title, price, description, teacher_id, userInfo.id, id]);
    return res.json({ message: "Successfully updated." });
});
exports.deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!req.headers.token)
        return res.json({ message: "Token not found !" });
    let userInfo = yield verifyToken(req.headers.token);
    let course = yield getOne(id);
    if (!course)
        return res.json({ message: "Course not found!" });
    yield database_1.default.query(` 
    DELETE FROM courses WHERE created_by_user_id = $1 and id = $2
   `, [userInfo.id, id]);
    return res.json({ message: "Course deleted!" });
});
