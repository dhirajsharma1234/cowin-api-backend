import bcryptjs from "bcryptjs";

export const encryptPass = async (pass) =>{
    try {
        const hash = await bcryptjs.hash(pass,12);
        return hash
    } catch (error) {
        throw new Error(error.message);
    }
}

export const decryptPass = async (pass,user) =>{
    try {
        const compPass = await bcryptjs.compare(pass,user.password);

        if(!compPass)
        throw new Error("Login Failed.");

        return;
    } catch (error) {
        throw new Error(error.message);
    }
}