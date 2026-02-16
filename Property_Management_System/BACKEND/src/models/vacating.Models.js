import db from "../config/db.js";

export const fetchVacatingForm = async (userId) => {
  const sql = `
   SELECT
    u.full_name,
    h.id AS house_id,
    h.house_type,
    h.house_number,
    p.property_name
  FROM users u
  LEFT JOIN tenancies t ON u.id = t.user_id
  LEFT JOIN houses h ON t.house_id = h.id
  LEFT JOIN properties p ON h.property_id = p.id
  WHERE u.id = ?
  `;

  const [rows] = await db.query(sql, [userId]);
  return rows[0];
};

// checking the status of the latest vacating request
export const getLatestRequestStatus = async (userId) => {
  const sql = `
    SELECT status 
    FROM vacating_requests 
    WHERE user_id = ? 
    ORDER BY created_at DESC 
    LIMIT 1
  `;

  const [rows] = await db.query(sql, [userId]);
  
  // If no request exists, return null
 if (rows.length === 0) return null;

  // Return the status string (e.g., 'pending', 'approved', or 'rejected')
  return rows[0].status;
};

//export const checkExistingRequest = async (userId) => {
 // const sql = `SELECT id FROM vacating_requests WHERE user_id = ? AND status = 'pending'`

 // const [rows] = await db.query(sql, [userId]);
  //return rows.length > 0; // Returns true if there's at least one pending request for the user.
//}

export const createVacatingRequest = async (userId, houseId, vacateDate) => {
  const sql = `
    INSERT INTO vacating_requests (user_id, house_id, vacate_date)
    VALUES (?, ?, ?)
  `;

  await db.query(sql, [userId, houseId, vacateDate]);
};

// export const checkRequestApproval = async (userId) => {
//  const sql = `
//   SELECT id FROM vacating_requests WHERE user_id = ? AND status = 'approved'
 // `;

//  const [rows] = await db.query(sql, [userId]);
 // return rows.length > 0;
//}

// export const checkRequestDeclined = async (userId) => {
 // const sql = `
 //   SELECT id FROM vacating_requests WHERE user_id = ? AND status = 'rejected'
//  `;

 // const [rows] = await db.query(sql, [userId]);
  //return rows.length > 0;
//}