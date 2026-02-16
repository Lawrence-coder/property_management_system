import db from "../config/db.js";

export const findUserByEmail = async (email) => {
  const [rows] = await db.query(
    `SELECT id, full_name, email, phone, password, role, status
     FROM users
     WHERE email = ?`,
    [email]
  );
  
  return rows[0];
};
