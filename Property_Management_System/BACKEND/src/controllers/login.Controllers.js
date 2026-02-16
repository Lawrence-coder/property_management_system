import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../models/login.Models.js";

export const userLogin = async (req, res) => {
  try {
    const { role, email, password } = req.body; // const { email, password } is written to match the frontend request body and they put in the {} brackets because they are sending multiple values and not a single value because of that we use destructuring assignment to extract those values from the req.body object.

    if (!email || !password || !role ) {
      return res.status(400).json({ message: "All fields are required" });
    }
        //1 Find user
    const user = await findUserByEmail(email);

    if(!user) {
     return res.status(401).json({message: "Invalid credentials"});
    }

        //2. Verifying password
     const isMatch = await bcrypt.compare(password, user.password);

     if (!isMatch) {
      return res.status(401).json({message: "Lack of valid credentials"});
     }

      // JWT tokenization
    const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

         //3. Role validation
      if (user.role !== role) {
        return res.status(401).json({message: `You are not authorised to login as ${role}`});
      }

      if (user.status === 'Inactive') {
        return res.status(403).json({message: "Your account is deactivated. Please contact the administrator."});
      };

          //4. Send back the user
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        role: user.role,
        email: user.email,
        userid: user.id
        
      }
    });

  
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
