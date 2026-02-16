import bcrypt from "bcrypt";
import db from '../src/config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
  const {
    ADMIN_NAME,
    ADMIN_EMAIL,
    ADMIN_PHONE,
    ADMIN_PASSWORD
  } = process.env;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error("Admin detils are missing in the environment variable!")
    process.exit(1); //This means terminate the process with an error code 1.
  }
 
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

  await db.query(
    `INSERT INTO users (full_name, email, phone, password, role)
     VALUES (?, ?, ?, ?, 'admin')`,
    [ADMIN_NAME, ADMIN_EMAIL, ADMIN_PHONE, hashedPassword]
  );
  console.log('ADmin created successfully');
  process.exit();
};

createAdmin(); //

