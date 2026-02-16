import db from '../config/db.js';

export const fetchRentFormData = async (userId) => {
  const sql = `
    SELECT
      p.property_name,
      h.id AS house_id,
      h.house_type,
      h.house_number,
      h.amount
    FROM tenancies t
    JOIN houses h ON t.house_id = h.id
    JOIN properties p ON h.property_id = p.id
    WHERE t.user_id = ?
  `;

  const [rows] = await db.query(sql, [userId]);
  return rows;
};





/*..export const fetchRentPayment = async (userId) => {
  const sql = `
    SELECT
      rp.id AS payment_id,
      u.id AS user_id,
      p.property_name,
      h.id AS house_id,
      h.house_type,
      h.house_number,
      rp.amount,
      rp.receipt_path,
      rp.status
    FROM payments rp
    JOIN users u ON rp.user_id = u.id
    JOIN houses h ON rp.house_id = h.id
    JOIN properties p ON h.property_id = p.id
    WHERE rp.user_id = ?
  `;

  const [rows] = await db.query(sql, [userId]);
  return rows;
};---*/


export const createRentPayment = async (userId, houseId, amount, receiptPath) => {
  const sql = `
    INSERT INTO payments (user_id, house_id, amount, receipt_path)
    VALUES (?, ?, ?, ?)
  `
  await db.query (sql, [userId, houseId, amount, receiptPath]);

};