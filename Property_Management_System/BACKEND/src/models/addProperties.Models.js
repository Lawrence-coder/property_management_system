import db from '../config/db.js';

export const addProperties = async (property_name) => {
  const sql = `INSERT INTO properties (property_name) VALUES (?)`;
  const [rows] = await db.query(sql, [property_name]);
  return rows;
};

export const getProperties = async () => {
  const sql = `SELECT * FROM properties`;
  const [rows] = await db.query(sql);
  return rows;
};

export const addHouses = async (
  propertyId,
  houseType,
  houseNumber,
  amount

) => {
 const connection = await db.getConnection();

 try {
  await connection.beginTransaction();

  const [proprty] = await connection.query(
    `SELECT id FROM properties WHERE id = ?`,
    [propertyId]
  );

  const [houseResult] = await connection.query(
    `INSERT INTO houses (property_id, house_type, house_number, amount) VALUES (?, ?, ?, ?)`,
    [propertyId, houseType, houseNumber, amount]
  );


  await connection.commit();
  return houseResult;
 } catch (error) {
  await connection.rollback();
  throw error;
 } finally {
  connection.release();
 }
};