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
    return yield jsonwebtoken_1.default.verify(user_token, 'secret_key');
});
exports.getTeachers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield verifyToken(req.headers.token);
        const response = yield database_1.default.query('SELECT * FROM teachers WHERE id = $1', [user.user_id]);
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
});
exports.getTeacherById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const response = yield database_1.default.query('SELECT * FROM users WHERE id = $1', [id]);
    return res.json(response.rows);
});
exports.createTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, surname, age } = req.body;
    let user = yield verifyToken(req.headers.token);
    const response = yield database_1.default.query(`INSERT INTO 
       teachers (teacher_name, teacher_surname, teacher_age, created_by_user_id) 
       VALUES ($1, $2, $3, $4)`, [name, surname, age, user.user_id]);
    res.json({
        message: 'Teacher Added successfully'
    });
});
exports.updateTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.params.id;
    const { name, surname, age } = req.body;
    res.json('User Updated Successfully');
});
exports.deleteTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
