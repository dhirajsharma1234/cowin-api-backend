import jwt from "jsonwebtoken";

export const createToken = async (user) =>{
    try {
       const token = await jwt.sign({ _id:user._id, date: Date.now() / 1000 },process.env.JWT_SECRET,{
        expiresIn:"1h"
       });
       return token; 
    } catch (error) {
        throw new Error(error.message);
    }
}

