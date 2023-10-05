import { Request, Response } from "express";
import { QueryResult } from "pg";
import pool from "../database";

import jwt from "jsonwebtoken";

const verifyToken = async (user_token: any) => {
  return await jwt.verify(user_token, "secret_key");
};

const getOne = async (teacher_id: string) => {
  let response: QueryResult = await pool.query(
    "SELECT * FROM teachers WHERE id = $1",
    [teacher_id]
  );
  return response.rows[0];
};

export const getTeachers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let user: any = await verifyToken(req.headers.token);

    const response: QueryResult = await pool.query(
      "SELECT * FROM teachers WHERE created_by_user_id = $1",
      [user.user_id]
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error");
  }
};

export const getTeacherById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let { teacher_id } = req.params;
  let user: any = await verifyToken(req.headers.token);

  const one_teacher = await getOne(teacher_id);
  return res.json(one_teacher);
};

export const createTeacher = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, surname, age } = req.body;

  console.log(req.headers.token);

  let user: any = await verifyToken(req.headers.token);

  const response: QueryResult = await pool.query(
    `INSERT INTO 
       teachers (teacher_name, teacher_surname, teacher_age, created_by_user_id) 
       VALUES ($1, $2, $3, $4)`,
    [name, surname, age, user.user_id]
  );
  res.json({
    message: "Teacher Added successfully",
  });
};

export const updateTeacher = async (req: Request, res: Response) => {
  const teacher_id: string = req.params.id;
  const { name, surname, age } = req.body;

  let user: any = await verifyToken(req.headers.token);

  let teacher = await getOne(teacher_id);

  if (!teacher)
    return res.json({
      msg: "Teacher not found!",
    });

  await pool.query(
    ` 
    UPDATE teachers SET teacher_name = $1, teacher_surname = $2, teacher_age = $3
    WHERE created_by_user_id = $4 and id = $5
`,
    [name, surname, age, user.user_id, teacher_id]
  );

  return res.json("OK");
};

export const deleteTeacher = async (req: Request, res: Response) => {
  const teacher_id: string = req.params.id;
  let user: any = await verifyToken(req.headers.token);

  let teacher = await getOne(teacher_id);

  if (!teacher)
    return res.json({
      msg: "Teacher not found!",
    });

  console.log(user.user_id, teacher_id);

  await pool.query(
    ` 
    DELETE FROM teachers WHERE created_by_user_id = $1 and id = $2
   `,
    [user.user_id, teacher_id]
  );

  return res.json({
    msg: "Deleted!",
  });
};
