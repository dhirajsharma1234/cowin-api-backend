import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:String,
        required:true,
        trim:true,
        minLength: [10, "no should have minimum 10 digits"],
        maxLength: [10, "no should have maximum 10 digits"],
    },
    age:{
        type:Number,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
    aadharNo:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    vaccinationStatus:{
        enum:["first_dose","second_dose","vaccinated"],
        type:String,
        required:true
    },
    availableTimeSlots:[
        {
            date:{
                type:Date
            },
            timeRange:{
                type:String,
                required:true
            }
        }
    ]
},{
    timestamps:true
});

const User = new mongoose.model("user",userSchema);

export { User };