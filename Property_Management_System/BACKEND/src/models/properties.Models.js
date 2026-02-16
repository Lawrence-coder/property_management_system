import db from '../config/db.js';

export const fetchAllProperties = async () => {
  const [rows] = await db.execute('SELECT * FROM properties'); //db.execute does the following in simple terms - prepares the query, executes it, and returns the result
  return rows;
};