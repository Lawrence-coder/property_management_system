import { fetchAvailableHouses } from "../models/houses.Models.js";

export const getAvailableHouses = async (req, res) => {
  const { propertyId } = req.params; // Extract propertyId from URL parameters- In this case the parameters are part of the route defined in the houses.Routes.js file- when a request is made to this endpoint, the propertyId value is extracted from the URL and used to fetch the available houses for that specific property.
  if (!propertyId) {
  return res.status(400).json({ message: "Property ID is required" });
  };

  try {
    const houses = await fetchAvailableHouses(propertyId);
    res.status(200).json(houses); 
  } catch (error) {
    res.status(500).json({ message: "Error fetching available houses", error: error.message });
  };
};
