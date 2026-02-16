import db from '../config/db.js';

export const createUserRegistration = async (
  fullName, //changed from full_name to fullName for consistency with JS naming conventions
  email,
  phone,
  password,
  propertyId, 
  houseId,
) => {

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    // 1. Create user
    const [userResult] = await conn.query(
      `INSERT INTO users (full_name, email, phone, password)
       VALUES (?, ?, ?, ?)`,
      [fullName, email, phone, password]
    );

    const userId = userResult.insertId; 

   const [property] = await conn.query(
  `SELECT id FROM properties WHERE id = ?`,
  [propertyId]
   );

   if (!property.length) {
   throw new Error("Property not found");
   }

    // 2. Check house availability
    const [house] = await conn.query( 
      `SELECT status FROM houses WHERE id = ?`,
      [houseId] // Parameterized query to prevent SQL injection
    );

    if (house[0].status === 'occupied') {
      throw new Error("House already occupied");
    };

    // 3. Create tenancy
    await conn.query(
      `INSERT INTO tenancies (user_id, house_id, start_date)
       VALUES (?, ?, CURDATE())`,
      [userId, houseId]
    );

    // 4. Lock house
    await conn.query(
      `UPDATE houses SET status = 'occupied' WHERE id = ?`,
      [houseId]
    );

    await conn.commit(); // If all queries succeed, commit the transaction- this means that all the changes made during the transaction are saved permanently to the database.
  } catch (err) {
    await conn.rollback(); // If any error occurs, rollback the transaction to maintain data integrity-In simple terms, this means that if something goes wrong during the process of registering a user and creating a tenancy, all the changes made to the database during that process will be undone, ensuring that the database remains in a consistent state without any partial or incorrect data.
    throw err;
  } finally {
    conn.release(); // Release the connection back to the pool-which means that the connection used for this transaction is returned to the pool of available connections so that it can be reused for future database operations, improving efficiency and resource management.
  }
};
//export const isEmailRegistered = async (email) => {
  //const [rows] = await db.query(
   // `SELECT id FROM users WHERE email = ?`,
  //  [email]
 // );
 // return rows.length > 0;
//}