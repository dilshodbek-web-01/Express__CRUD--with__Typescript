import { Request, Response } from "express";
import { QueryResult } from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../database";

export const createUser = async (req: Request, res: Response): Promise<any> => {
  const { username, email, role, age, password } = req.body;

  const response: QueryResult = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );

  const foundedUser = response.rows[0];

  if (foundedUser) return res.json({ message: "User already exists !!!" });

  const hashPsw: string = await bcrypt.hash(password, 12);

  const result: QueryResult = await pool.query(
    `INSERT INTO users(username, email, role, age, password) 
    VALUES ($1, $2, $3, $4, $5)`,
    [username, email, role, age, hashPsw]
  );

  res.json({
    message: "User Registered!",
  });
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  const response: QueryResult = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );

  const foundedUser = response.rows[0];

  if (!foundedUser)
    return res.status(404).json({ message: "User not found !!!." });

  const checkPwd = await bcrypt.compare(password, foundedUser.password);

  if (checkPwd) {
    let token = await jwt.sign({ id: foundedUser.id }, "secret_key");
    return res.status(200).json({ message: "Successfully sign in", token });
  }

  return res.status(404).json({ message: "Password error !!!." });
};
