import { fetchVacantHouses } from '../models/vacants.Models.js';

export const getVacantHouses = async (req, res) => {
 try {
  const vacants = await fetchVacantHouses();

  if (!vacants) {
    return res.status(404).json({Message: "No vacant houses found."});
  }

  res.json(vacants);
 } catch (error) {
   console.error("Error fetching vacant houses.", error);
   res.status(500).json({message: error.message});
 }
};