import db from "../config/db.js";

export const fetchTenantInfoById = async (userId) => {

const sql = `
    SELECT
      u.full_name,
      u.email,
      u.phone,
      u.role,
      h.id as house_id,
      h.house_number,
      h.house_type,
      p.property_name,
      mr.status
    FROM users u
    LEFT JOIN tenancies t ON u.id = t.user_id
    LEFT JOIN houses h ON t.house_id = h.id
    LEFT JOIN properties p ON h.property_id = p.id
    LEFT JOIN maintenance_requests mr ON u.id = mr.user_id
    WHERE u.id = ?
  `;

  const [rows] = await db.query(sql, [userId]);
  return rows[0];
};

export const createMaintenanceIssue = async (userId, houseId, issueDescription) => {
   const sql = `
   INSERT INTO maintenance_requests (user_id, house_id, issue_description)
   VALUES (?, ?, ?)
   `
   await db.query(sql, [userId, houseId, issueDescription])
};