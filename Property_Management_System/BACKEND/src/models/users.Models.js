import db from '../config/db.js';

export const fetchUsersDetails = async () => {
 const sql = `
 SELECT 
    u.id, u.full_name, u.email, u.phone, u.role, u.created_at, u.status, h.id AS house_id,
    h.house_number, h.house_type,
    p.property_name
FROM users u
LEFT JOIN tenancies t ON u.id = t.user_id
LEFT JOIN houses h ON t.house_id = h.id
LEFT JOIN properties p ON h.property_id = p.id
ORDER BY u.created_at DESC
 `;
 const [rows] = await db.query(sql);
 return rows;
};

export const updateUserById = async (userId, userData) => {
  const { full_name, email, phone, role, house_id, house_number, house_type, property_name } = userData;
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();
    
    await connection.query(`
      UPDATE users SET full_name = ?, email = ?, phone = ?, role = ? WHERE id = ?`, [full_name, email, phone, role, userId]);

      const [currentTenancy] = await connection.query( // Get current tenancy info 
      'SELECT house_id FROM tenancies WHERE user_id = ?',
      [userId]
    );

    if (currentTenancy.length > 0 && currentTenancy[0].house_id !== house_id) { // If house_id has changed then update tenancy
      const oldHouseId = currentTenancy[0].house_id; // Store the old house ID in a variable

      // Mark the OLD house as vacant
      await connection.query('UPDATE houses SET status = "vacant" WHERE id = ?', [oldHouseId]);

      // Update the tenancy record to the NEW house
      await connection.query('UPDATE tenancies SET house_id = ? WHERE user_id = ?', [house_id, userId]);

      // Mark the NEW house as occupied
      await connection.query('UPDATE houses SET status = "occupied" WHERE id = ?', [house_id]);
    }

    await connection.commit();
    return { success: true };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};


export const deactivateUserProfile = async (userId) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Find the house ID before removing the tenancy link
    const [tenancy] = await connection.query(
      'SELECT house_id FROM tenancies WHERE user_id = ?', 
      [userId]
    );

    // 2. Change user status to inactive (Preserves payment/request history)
    await connection.query(
      'UPDATE users SET status = "Inactive" WHERE id = ?', 
      [userId]
    );

    // 3. Remove the tenancy link so the house is no longer "taken"
    await connection.query('DELETE FROM tenancies WHERE user_id = ?', [userId]);

    // 4. Mark the house as vacant
    if (tenancy.length > 0) { // Ensure there was a tenancy to begin with
      await connection.query(
        'UPDATE houses SET status = "vacant" WHERE id = ?', 
        [tenancy[0].house_id]
      );
    }

    await connection.commit();
    return { success: true };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};