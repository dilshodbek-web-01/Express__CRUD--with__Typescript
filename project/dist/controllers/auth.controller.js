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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../database"));
exports.createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, role, age, password } = req.body;
    const response = yield database_1.default.query(`SELECT * FROM users WHERE email = $1`, [email]);
    const foundedUser = response.rows[0];
    if (foundedUser)
        return res.json({ message: "User already exists !!!" });
    const hashPsw = yield bcrypt_1.default.hash(password, 12);
    const result = yield database_1.default.query(`INSERT INTO users(username, email, role, age, password) 
    VALUES ($1, $2, $3, $4, $5)`, [username, email, role, age, hashPsw]);
    res.json({
        message: "User Registered!",
    });
});
exports.loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const response = yield database_1.default.query(`SELECT * FROM users WHERE email = $1`, [email]);
    const foundedUser = response.rows[0];
    if (!foundedUser)
        return res.status(404).json({ message: "User not found !!!." });
    const checkPwd = yield bcrypt_1.default.compare(password, foundedUser.password);
    if (checkPwd) {
        let token = yield jsonwebtoken_1.default.sign({ id: foundedUser.id }, "secret_key");
        return res.status(200).json({ message: "Successfully sign in", token });
    }
    return res.status(404).json({ message: "Password error !!!." });
});
