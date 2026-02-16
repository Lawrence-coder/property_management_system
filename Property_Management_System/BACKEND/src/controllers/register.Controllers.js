import bcrypt from 'bcrypt';

import { createUserRegistration } from "../models/register.Models.js";

export const submitUserRegistration = async (req, res) => {
  try {
    const { full_name, email, phone, password, property_id, house_id } = req.body;

    if (!house_id) {
      return res.status(400).json({ message: "House is required" });
    }
       // Hashing the password before passing to the models.
    const hashedPassword = await bcrypt.hash(password, 10);

    await createUserRegistration( //by wrapping the parameters in {} there was an error- because the function expected individual arguments rather than an object.
      full_name,
      email,
      phone,
      hashedPassword,
      property_id,
      house_id
  );

    res.status(201).json({ message: "Registered successfully." });


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
