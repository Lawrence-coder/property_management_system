import db from '../config/db.js';

export const fetchVacantHouses = async () => {
  const sql = `
   SELECT
   h.id,
   property_name,
   h.house_number,
   h.house_type,
   h.status,
   h.amount
   FROM properties p
   INNER JOIN houses h ON p.id = h.property_id
   WHERE status = 'vacant'
  `;

  const [rows] = await db.query(sql);
  return rows;
};