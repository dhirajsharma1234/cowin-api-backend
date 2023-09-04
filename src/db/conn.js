import mongoose from "mongoose";

const connectDB = async() =>{
    try {
        const DB = process.env.DB_URL;
        const conn = await mongoose.connect(DB);

        if(conn) {
            console.log(`DB connected successfully........`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

export { connectDB };