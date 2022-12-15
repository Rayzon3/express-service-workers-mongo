import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import cookie from "cookie";

import User from "../models/user.model";

export const register = async (req: Request, res: Response) => {
  const { name, email, mobileNum, linkedinURL, password } = req.body;

  try {
    const user = await User.create({
      name: name,
      email: email,
      mobileNum: mobileNum,
      linkedinURL: linkedinURL,
      password: password,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email: email,
      password: password,
    });
    if (!user)
      return res
        .status(404)
        .json({ username: "Worng email and password combination !!" });

    //gen JWT
    const token = jwt.sign({ email }, process.env.JWT_SECRET!);
    //store JWT in cookie
    res.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600,
        path: "/", //cookie valid for whole site
      })
    );

    console.log(res.cookie)

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};



export const logout = async (_: Request, res: Response) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ logout: "true" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};