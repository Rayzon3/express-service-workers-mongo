import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import cookie from "cookie";

import User from "../models/user.model";


export const uploadContacts = async (req: Request, res: Response) => {
    const userID = res.locals.user._id
    const file_urn = req.file?.filename;

    try {
        const user = await User.findByIdAndUpdate(
            userID,{
                contactCSV_urn: file_urn
            }
        )

        return res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}