import db from '../config/db.js';

export const getMonthlyReport = async (propertyId, month, year) => {
  const sql = `
    SELECT 
      u.full_name,
      u.phone,
      h.id AS house_id,
      h.house_number,
      h.house_type,
      h.amount AS rent_price, 
      p.amount AS amount_paid, 
      p.receipt_path,
      p.status AS payment_status,
      /* If there's a payment record for this month, it's 'Paid', otherwise 'Unpaid' */
      CASE 
        WHEN p.id IS NOT NULL THEN 'Paid'
        ELSE 'Unpaid'
      END AS house_status /* This is a virtual column to easily determine payment status in the frontend*/
    FROM houses h
    LEFT JOIN payments p ON h.id = p.house_id 
      AND MONTH(p.created_at) = ? 
      AND YEAR(p.created_at) = ?
    LEFT JOIN users u ON p.user_id = u.id
    WHERE h.property_id = ?
    ORDER BY h.house_number ASC
  `;

  const [rows] = await db.query(sql, [month, year, propertyId]);
  return rows;
};