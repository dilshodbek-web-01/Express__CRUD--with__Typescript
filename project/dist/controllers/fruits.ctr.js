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
    let response = yield database_1.default.query("SELECT * FROM fruits WHERE id = $1", [id]);
    return response.rows[0];
});
exports.getFruits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userInfo = yield verifyToken(req.headers.token);
        const response = yield database_1.default.query("SELECT * FROM fruits WHERE created_by_user_id = $1", [userInfo.id]);
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Internal Server error" });
    }
});
exports.getFruit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    if (!req.headers.token)
        return res.json({ message: "Token not found !!!" });
    let userInfo = yield verifyToken(req.headers.token);
    let foundedFruit = yield getOne(id);
    if (!foundedFruit)
        return res.json({ message: "Fruit not found!" });
    let response = yield database_1.default.query("SELECT * FROM fruits WHERE id = $1 AND created_by_user_id = $2", [id, userInfo.id]);
    return res.json(response.rows[0]);
});
exports.createFruit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, price, country, description } = req.body;
    if (!req.headers.token)
        return res.json({ message: "Token not found !" });
    let userInfo = yield verifyToken(req.headers.token);
    const response = yield database_1.default.query(`INSERT INTO fruits(title, price, country, description, created_by_user_id) 
    VALUES ($1, $2, $3, $4, $5)`, [title, price, country, description, userInfo.id]);
    res.json({ message: "Create fruit" });
});
exports.updateFruit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { title, price, country, description } = req.body;
    if (!req.headers.token)
        return res.json({ message: "Token not found !" });
    let userInfo = yield verifyToken(req.headers.token);
    let foundedFruit = yield getOne(id);
    if (!foundedFruit)
        return res.json({ message: "Fruit not found!" });
    yield database_1.default.query(` 
    UPDATE fruits SET title = COALESCE($1, title), price = COALESCE($2, price),
    country = COALESCE($3, country), description = COALESCE($4, description)
    WHERE created_by_user_id = $5 AND id = $6
`, [title, price, country, description, userInfo.id, id]);
    return res.json({ message: "Successfully updated." });
});
exports.deleteFruit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!req.headers.token)
        return res.json({ message: "Token not found !" });
    let userInfo = yield verifyToken(req.headers.token);
    let foundedFruit = yield getOne(id);
    if (!foundedFruit)
        return res.json({ message: "Fruit not found!" });
    yield database_1.default.query(` 
    DELETE FROM fruits WHERE created_by_user_id = $1 and id = $2
   `, [userInfo.id, id]);
    return res.json({ message: "Fruit deleted!" });
});
