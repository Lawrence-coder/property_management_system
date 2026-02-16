import { fetchProfile } from "../models/profile.Models.js";

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    const profile = await fetchProfile(userId);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

