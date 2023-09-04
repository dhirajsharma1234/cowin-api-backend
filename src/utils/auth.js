import jwt from "jsonwebtoken";
import { User } from "../model/user.js";

export const auth = async (req,res,next) =>{
    try {
        const token = req.headers.authorization?.replace("Bearer ","");

        if(!token) {
            throw new Error("Token Required.");
        }

        //check user
        const decodeUser = await jwt.verify(token,process.env.JWT_SECRET);

        if(!decodeUser) {
            throw new Error("Auth Failed.");
        }

        const user = await User.findOne({_id:decodeUser._id});

        if(!user) {
            throw new Error("Auth Failed.");
        }

        req.token = token;
        req.user = decodeUser;

        next();
    } catch (error) {
       return res.status(500).json({status:500,message: error.message});
    }
}