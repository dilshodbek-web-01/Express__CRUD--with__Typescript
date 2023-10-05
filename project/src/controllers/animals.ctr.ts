import { Request, Response } from "express";
import { QueryResult } from "pg";
import pool from "../database";
import jwt from "jsonwebtoken";

const verifyToken = async (user_token: any) => {
  return await jwt.verify(user_token, "secret_key");
};

const getOne = async (id: string) => {
  let response: QueryResult = await pool.query(
    "SELECT * FROM animals WHERE id = $1",
    [id]
  );
  return response.rows[0];
};

export const getAnimals = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let userInfo: any = await verifyToken(req.headers.token);

    const response: QueryResult = await pool.query(
      "SELECT * FROM animals WHERE created_by_user_id = $1",
      [userInfo.id]
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export const getAnimal = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let { id } = req.params;

  if (!req.headers.token) return res.json({ message: "Token not found !!!" });

  let userInfo: any = await verifyToken(req.headers.token);

  let foundedAnimal = await getOne(id);

  if (!foundedAnimal) return res.json({ message: "Animal not found!" });

  let response: QueryResult = await pool.query(
    "SELECT * FROM animals WHERE id = $1 AND created_by_user_id = $2",
    [id, userInfo.id]
  );
  return res.json(response.rows[0]);
};

export const createAnimal = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { title, color, type } = req.body;

  if (!req.headers.token) return res.json({ message: "Token not found !" });

  let userInfo: any = await verifyToken(req.headers.token);

  const response: QueryResult = await pool.query(
    `INSERT INTO animals(title, color, type, created_by_user_id) 
    VALUES ($1, $2, $3, $4)`,
    [title, color, type, userInfo.id]
  );

  res.json({ message: "Create animal" });
};

export const updateFruit = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const { title, color, type } = req.body;

  if (!req.headers.token) return res.json({ message: "Token not found !" });

  let userInfo: any = await verifyToken(req.headers.token);

  let foundedAnimal = await getOne(id);

  if (!foundedAnimal) return res.json({ message: "Animal not found!" });

  await pool.query(
    ` 
    UPDATE animals SET title = COALESCE($1, title), color = COALESCE($2, color),
    type = COALESCE($3, type) WHERE created_by_user_id = $4 AND id = $5
`,
    [title, color, type, userInfo.id, id]
  );

  return res.json({ message: "Successfully updated." });
};

export const deleteAnimal = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  if (!req.headers.token) return res.json({ message: "Token not found !" });

  let userInfo: any = await verifyToken(req.headers.token);

  let foundedAnimal = await getOne(id);

  if (!foundedAnimal) return res.json({ message: "Animal not found!" });

  await pool.query(
    ` 
    DELETE FROM animals WHERE created_by_user_id = $1 and id = $2
   `,
    [userInfo.id, id]
  );

  return res.json({ message: "Animal deleted!" });
};
