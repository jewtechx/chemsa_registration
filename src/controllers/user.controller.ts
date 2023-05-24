import { NextFunction, Request, Response } from "express";
import { IAppContext } from "../types/app";

declare module "express-serve-static-core" {
  interface Request {
    context: IAppContext;
  }
}

export const SIGNUP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, fullname, password, role } = req.body;

    if (!email || !fullname || !password || !role) {
      return res
        .status(400)
        .json({ message: "Make sure all input fileds are correct" });
    }
    const user = await req.context.services?.user.CreateOne({
      email,
      fullname,
      password,
      role,
    });

    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};
