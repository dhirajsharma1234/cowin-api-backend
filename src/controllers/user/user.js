import { User } from "../../model/user.js";
import { vaccinationStatus } from "../../utils/vaccinationStatus.js";
import mongoose from "mongoose";
import { createToken } from "../../utils/tokenGeneration.js";
import { decryptPass, encryptPass } from "../../utils/encryptDecryptPass.js";

class Users {
    register = async (req, res) => {
        try {
            const { name, phone, age, pincode, aadharNo, password, vaccinationStatus, availableTimeSlots } = req.body;
    
            // Check for empty fields
            if (!name || !phone || !age || !pincode || !aadharNo || !password)
                return res.status(406).json({ status: 406, message: "Empty field should not be acceptable." });
    
            // Check if user exists based on phone number or Aadhar number
            const user = await User.findOne({ $or: [{ phone }, { aadharNo }] });
              

            if (vaccinationStatus === "vaccinated") {
                return res.status(400).json({ status: 400, message: "User is already vaccinated." });
            }
    
            if (vaccinationStatus === "first_dose") {
                    // Check if user already registered for first dose
                    if (user)
                        return res.status(400).json({ status: 400, message: "User already registered for the first dose." });
    
                    // Hash the password
                    const hashPass = await encryptPass(password);
    
                    const userInstance = new User({
                        name, phone, age, pincode, password: hashPass,
                        vaccinationStatus, availableTimeSlots,aadharNo
                    });
    
                    const userData = await userInstance.save();
    
                    // Create a JWT token for the user
                    const token = await createToken(userData);
    
                    return res.status(201).json({ status: 201, message: "User Registered Successfully.", token });
                
            } else if (vaccinationStatus === "second_dose") {
                if (user?.vaccinationStatus === "first_dose") {
                    // Update user's vaccination status to "second_dose"
                    const userData = await User.findOneAndUpdate(user._id, { vaccinationStatus }, { new: true });
    
                    // Create a JWT token for the user
                    const token = await createToken(userData);
    
                    return res.status(201).json({ status: 201, message: "User Registered Successfully.", token });
                } else {
                    return res.status(400).json({ status: 400, message: "User is not eligible for the second dose registration." });
                }
            }
    
            return res.status(400).json({ status: 400, message: 'Invalid registration request.' });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    }
    

    login = async (req,res) => {
        try {
            const { phone,password } = req.body;

            if(!phone || !password) 
            return res.status(406).json({status:406,message:"Empty field should not acceptable."});

            //check that user exist or not
            const user = await User.findOne({ phone });

            if(!user)
            return res.status(400).json({status:400,message:"Login Failed: User not registered."});

            //hash the password
            const hashPass = await decryptPass(password,user);

            const token = await createToken(user);

            return res.status(200).json({status:200,message:"Login Successfull.",token  });
        } catch (error) {
            // throw new Error(error.message);
            return res.status(400).json({status:400,error:error.message});
        }
    }

    updateStatus = async(req,res) =>{
        try {
            const { userId,newStatus } = req.body; // Assuming you have a way to identify the user (userId)

            // Find the user in your database
            const user = await User.findById(userId);
        
            if (!user) {
              return res.status(404).json({ status: 404, message: 'User not found.' });
            }
        
            // Check if the user's new status is "vaccinated"
            if (newStatus === "vaccinated") {
              // Update the user's vaccination status to "vaccinated"
              user.vaccinationStatus = newStatus;
        
              // Save the user object with the updated status to the database
              await user.save();
        
              // Optionally, you can create a JWT token for the user here if needed
        
              return res.status(200).json({ status: 200, message: 'User status updated to "vaccinated" successfully.' });
            } else {
              return res.status(400).json({ status: 400, message: 'Invalid status update request.' });
            }
          } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
          }
    }

    getAvailableTimeSlot = async (req, res) => {
        try {
          const { phone, vaccinationStatus, selectedDate } = req.query;
      
          const user = await User.findOne({ phone: { $regex: new RegExp(phone.trim(), "i") } });
      
          if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found.' });
          }
      
          // Check if the vaccination status matches
          if (user.vaccinationStatus !== vaccinationStatus) {
            return res.status(400).json({ message: 'Invalid vaccination status.' });
          }
      
          const specificDate = new Date(`${selectedDate}T00:00:00.000+00:00`);
      
          const availableSlots = await User.find({ "availableTimeSlots.date": specificDate });
      
          return res.status(200).json({ status: 200, availableSlots });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ status: 500, error: error.message });
        }
      };
      
      updateSlot = async(req,res) =>{
        try {
            const { slot_id } = req.params;
            const { newSelectedTimeSlot } = req.body;
            const { _id } = req.user;

            const user = await User.findOne({_id});

            if(!user) {
                return res.status(404).json({ status: 404, message: 'User not found.' });
            }

            const currentTime = new Date();
            const slotTime = new Date(newSelectedTimeSlot);
        
            if (slotTime - currentTime < 24 * 60 * 60 * 1000) {
              return res.status(400).json({
                error: 'You can only update your slot 24 hours before the scheduled time',
              });
            }   

            console.log(slot_id);
            // await User.findOneAndUpdate({"availableTimeSlots._id":slot_id},{ "availableTimeSlots.$.date":newSelectedTimeSlot },{ new:true });
            //or
            // Use findByIdAndUpdate to update the subdocument
            await User.findByIdAndUpdate(
                _id,
                {
                $set: {
                    'availableTimeSlots.$[slotd].date': newSelectedTimeSlot,
                },
                },
                {
                new: true,
                arrayFilters: [{ 'slotd._id': slot_id }],
                }
            );

            return res.status(200).json({ status: 200, message:"Slot Updated Successfully." });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
      }
}

const user = new Users();
export { user };
