 import { fetchAllProperties } from '../models/properties.Models.js';
 
 export const getProperties = async (req, res) => {
  try {
    const properties = await fetchAllProperties();
    res.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Server error" });
  }
 };