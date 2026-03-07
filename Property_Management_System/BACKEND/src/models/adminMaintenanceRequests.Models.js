import db from "../config/db.js";

export const fetchAllRequests = async (req, res) => {
  const [rows] = await db.query(`
    SELECT 
      mr.id,
      u.full_name,
      u.email,
      u.phone,
      h.house_number,
      h.house_type,
      p.property_name,
      mr.issue_description,
      mr.created_at,
      mr.status
    FROM maintenance_requests mr
    JOIN users u ON mr.user_id = u.id
    JOIN houses h ON mr.house_id = h.id
    JOIN properties p ON h.property_id = p.id
    ORDER BY mr.created_at DESC
  `);

  return rows;
};

// Update issue status
export const updateIssueStatus = async (id, status) => {
  const [result] = await db.query(
    "UPDATE maintenance_requests SET status = ? WHERE id = ?",
    [status, id]
  );

  return result;
};

// Get issue frequency per property
export const getIssueFrequency = async () => {
  const [rows] = await db.query(`
    SELECT 
      p.property_name,
      COUNT(mr.id) AS total_issues
    FROM maintenance_requests mr
    JOIN users u ON mr.user_id = u.id
    JOIN houses h ON mr.house_id = h.id
    JOIN properties p ON h.property_id = p.id
    GROUP BY p.property_name
    ORDER BY total_issues DESC
  `);

  return rows;
};


