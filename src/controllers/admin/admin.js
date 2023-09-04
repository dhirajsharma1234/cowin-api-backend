import { AdminModel } from "../../model/admin.js";
import jwt from "jsonwebtoken";

class Admin {
    //normal admin login
    adminLogin = async (req, res) => {
       try {
         const { email, password } = req.body;
     
         const admin = await AdminModel.findOne({ email,password });
     
         if (!admin) {
           return res.status(401).json({ error: 'Admin not found' });
         }
     
         // Generate an admin token
         const adminToken = jwt.sign({ _id: admin._id }, 'admin-secret-key', {
           expiresIn: '1h',
         });
     
         return res.status(200).json({ status:200,token: adminToken });
       } catch (error) {
        console.log(error);
         res.status(500).json({ error: 'Server error' });
       }
     };

     getAllUsers = async (req,res) =>{
        try {
            const { age, pincode, vaccinationStatus } = req.query;
        
            // Build a filter object based on query parameters
            const filters = {};
            if (age) filters.age = age;
            if (pincode) filters.pincode = pincode;
            if (vaccinationStatus) filters.vaccinationStatus = vaccinationStatus;
        
            // Query the database with optional filters
            const users = await User.find(filters);
        
            // Respond with the filtered users
            res.status(200).json({ totalUsers: users.length, users });
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
     }

     registeredSlots = async(req,res) =>{
        try {
            const { date } = req.query;
        
            // Query the database for registered slots on the specified date
            const registeredSlots = await User.find({
              'availableTimeSlots.date': date,
            }).select('availableTimeSlots');
        
            // Extract and count the slots
            let firstDoseSlots = 0;
            let secondDoseSlots = 0;
        
            registeredSlots.forEach((user) => {
              user.availableTimeSlots.forEach((slot) => {
                if (slot.date === date) {
                  if (user.vaccinationStatus === 'first_dose') {
                    firstDoseSlots++;
                  } else if (user.vaccinationStatus === 'second_dose') {
                    secondDoseSlots++;
                  }
                }
              });
            });
        
            const totalSlots = firstDoseSlots + secondDoseSlots;
        
            res.status(200).json({
              date,
              firstDoseSlots,
              secondDoseSlots,
              totalSlots,
            });
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
     }

}
  
const admin = new Admin();
export { admin };