import db from '../config/db.js';

export const fetchAvailableHouses = async (propertyId) => {
  const [rows] = await db.query(
    `SELECT id, house_number, house_type
     FROM houses
     WHERE property_id = ? AND status = 'vacant'`, // Only fetch available houses
    [propertyId] // Parameterized query to prevent SQL injection-This means that the value of propertyId is safely inserted into the query- which means that even if an attacker tries to inject malicious SQL code through the propertyId variable, it won't be executed as part of the SQL command.
  );
  return rows;
};