"use strict";
// import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";
// const tokenMiddleWare = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const tokenInfo: any = req.headers.token;
//     const getUserInfo = await jwt.verify(tokenInfo, "secret_key");
//     req.token = getUserInfo;
//     next();
//     if (!req.headers.token) {
//       res.json({ message: "Token is not found !!!." });
//     }
//   } catch (error) {
//     if (error instanceof jwt.JsonWebTokenError) {
//       return res.json({ message: "Token is error" });
//     } else {
//       return res.json({ message: "token has expired" });
//     }
//   }
// };
// export default tokenMiddleWare;
