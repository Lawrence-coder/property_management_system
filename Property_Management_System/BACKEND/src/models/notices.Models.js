import db from '../config/db.js';

export const fetchVacatingNotices = async () => {
 const sql =`
 SELECT
 vr.id,
 u.full_name,
 u.email,
 h.house_number,
 h.house_type,
 p.property_name,
 vr.vacate_date,
 vr.status,
 vr.created_at
 FROM vacating_requests vr
 LEFT JOIN users u ON vr.user_id = u.id
 LEFT JOIN houses h ON vr.house_id = h.id
 LEFT JOIN properties p ON h.property_id = p.id
 `;

 const [rows] = await db.query(sql);
 return rows;
}

export const updateNoticeStatusById = async (Id, requestsData) => {
  const { status } = requestsData;
  
  const sql = `
    UPDATE vacating_requests SET status = ? WHERE id = ?
  `;

  await db.query(sql, [status, Id]); // No need to return anything because we are just updating a record.
}