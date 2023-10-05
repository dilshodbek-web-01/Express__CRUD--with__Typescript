import { Request, Response } from "express";
import { QueryResult } from "pg";
import pool from "../database";
import jwt from "jsonwebtoken";

const verifyToken = async (user_token: any) => {
  return await jwt.verify(user_token, "secret_key");
};

const getOne = async (id: string) => {
  let response: QueryResult = await pool.query(
    "SELECT * FROM fruits WHERE id = $1",
    [id]
  );
  return response.rows[0];
};

export const getFruits = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let userInfo: any = await verifyToken(req.headers.token);

    const response: QueryResult = await pool.query(
      "SELECT * FROM fruits WHERE created_by_user_id = $1",
      [userInfo.id]
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export const getFruit = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let { id } = req.params;

  if (!req.headers.token) return res.json({ message: "Token not found !!!" });

  let userInfo: any = await verifyToken(req.headers.token);

  let foundedFruit = await getOne(id);

  if (!foundedFruit) return res.json({ message: "Fruit not found!" });

  let response: QueryResult = await pool.query(
    "SELECT * FROM fruits WHERE id = $1 AND created_by_user_id = $2",
    [id, userInfo.id]
  );
  return res.json(response.rows[0]);
};

export const createFruit = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { title, price, country, description } = req.body;

  if (!req.headers.token) return res.json({ message: "Token not found !" });

  let userInfo: any = await verifyToken(req.headers.token);

  const response: QueryResult = await pool.query(
    `INSERT INTO fruits(title, price, country, description, created_by_user_id) 
    VALUES ($1, $2, $3, $4, $5)`,
    [title, price, country, description, userInfo.id]
  );

  res.json({ message: "Create fruit" });
};

export const updateFruit = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const { title, price, country, description } = req.body;

  if (!req.headers.token) return res.json({ message: "Token not found !" });

  let userInfo: any = await verifyToken(req.headers.token);

  let foundedFruit = await getOne(id);

  if (!foundedFruit) return res.json({ message: "Fruit not found!" });

  await pool.query(
    ` 
    UPDATE fruits SET title = COALESCE($1, title), price = COALESCE($2, price),
    country = COALESCE($3, country), description = COALESCE($4, description)
    WHERE created_by_user_id = $5 AND id = $6
`,
    [title, price, country, description, userInfo.id, id]
  );

  return res.json({ message: "Successfully updated." });
};

export const deleteFruit = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  if (!req.headers.token) return res.json({ message: "Token not found !" });

  let userInfo: any = await verifyToken(req.headers.token);

  let foundedFruit = await getOne(id);

  if (!foundedFruit) return res.json({ message: "Fruit not found!" });

  await pool.query(
    ` 
    DELETE FROM fruits WHERE created_by_user_id = $1 and id = $2
   `,
    [userInfo.id, id]
  );

  return res.json({ message: "Fruit deleted!" });
};
