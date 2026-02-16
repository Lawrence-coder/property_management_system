import { addHouses, addProperties, getProperties } from "../models/addProperties.Models.js";

export const createProperties = async (req, res) => {
  const { property_name } = req.body;

  try {
    await addProperties(property_name);
    res.status(201).json({message: "Property added successfully."});
  } catch (error) {
    console.error("Error adding property:", error);
    res.status(500).json({message: "Server error while adding property."});
  }
};

export const fetchProperties = async (req, res) => {
  try {
    const properties = await getProperties();
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({message: "Server error while fetching properties."});
  }
};

export const createHouses = async (req, res) => {
  const {property_id, house_type, house_number, amount} = req.body;

  try {
    await addHouses(property_id, house_type, house_number, amount);
    res.status(200).json({message: "House added successfully."})
  } catch (error) {
    console.error("Error adding house", error);
    res.status(500).json({message: "Server error while adding the house."});
  }
}