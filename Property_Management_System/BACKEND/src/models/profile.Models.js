import db from "../config/db.js";

export const fetchProfile = async (userId) => {
  const sql = `
    SELECT
      u.full_name,
      u.email,
      u.phone,
      u.role,
      h.house_number,
      h.house_type,
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


