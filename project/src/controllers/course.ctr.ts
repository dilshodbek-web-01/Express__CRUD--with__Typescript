import { Request, Response } from "express";
import { QueryResult } from "pg";
import pool from "../database";
import jwt from "jsonwebtoken";

const verifyToken = async (user_token: any) => {
  return await jwt.verify(user_token, "secret_key");
};

const getOne = async (id: string) => {
  let response: QueryResult = await pool.query(
    "SELECT * FROM courses WHERE id = $1",
    [id]
  );
  return response.rows[0];
};

export const getCourses = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let userInfo: any = await verifyToken(req.headers.token);

    const response: QueryResult = await pool.query(
      "SELECT * FROM courses WHERE created_by_user_id = $1",
      [userInfo.id]
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export const getCourse = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let { id } = req.params;

  if (!req.headers.token) return res.json({ message: "Token not found !!!" });

  let userInfo: any = await verifyToken(req.headers.token);

  let course = await getOne(id);

  if (!course) return res.json({ message: "Course not found!" });

  let response: QueryResult = await pool.query(
    "SELECT * FROM courses WHERE id = $1 AND created_by_user_id = $2",
    [id, userInfo.id]
  );
  return res.json(response.rows[0]);
};

export const createCourse = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { title, price, description, teacher_id } = req.body;

  if (!req.headers.token) return res.json({ message: "Token not found !" });

  let userInfo: any = await verifyToken(req.headers.token);

  const response: QueryResult = await pool.query(
    `INSERT INTO courses(title, price, description, teacher_id, created_by_user_id) 
    VALUES ($1, $2, $3, $4, $5)`,
    [title, price, description, teacher_id, userInfo.id]
  );

  res.json({
    message: "Create course",
  });
};

export const updateCourse = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const { title, price, description, teacher_id } = req.body;

  if (!req.headers.token) return res.json({ message: "Token not found !" });

  let userInfo: any = await verifyToken(req.headers.token);

  let course = await getOne(id);

  if (!course) return res.json({ message: "Course not found!" });

  await pool.query(
    ` 
    UPDATE courses SET title = COALESCE($1, title), price = COALESCE($2, price),
    description = COALESCE($3, description), teacher_id = COALESCE($4, teacher_id)
    WHERE created_by_user_id = $5 AND id = $6
`,
    [title, price, description, teacher_id, userInfo.id, id]
  );

  return res.json({ message: "Successfully updated." });
};

export const deleteCourse = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  if (!req.headers.token) return res.json({ message: "Token not found !" });

  let userInfo: any = await verifyToken(req.headers.token);

  let course = await getOne(id);

  if (!course) return res.json({ message: "Course not found!" });

  await pool.query(
    ` 
    DELETE FROM courses WHERE created_by_user_id = $1 and id = $2
   `,
    [userInfo.id, id]
  );

  return res.json({ message: "Course deleted!" });
};
