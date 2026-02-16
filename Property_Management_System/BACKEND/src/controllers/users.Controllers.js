import { fetchUsersDetails, updateUserById, deactivateUserProfile } from '../models/users.Models.js';

export const getUsersDetails = async (req, res) => {
  try {
    const data = await fetchUsersDetails();

    if (data.length === 0) {
    return res.status(404).json({ message: "No Tenants found" });
    }
    res.json(data);
  } catch (error) {
    console.error({message: error.message});
  }
};

export const updateUserDetails = async (req, res) => {
   const {id} = req.params; // Get user ID from URL parameters
   const userData = req.body; // Get updated user data from request body

   console.log("Updating User ID:", id);
  console.log("Data received:", userData);

  try {

    await updateUserById(id, userData);
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deactivateProfile = async (req, res) => {
   try {
    const {id} = req.params;

    // Preventing admin from deactivating themselves
    if (parseInt(id) === req.user.id) {
      return res.status(403).json({message: "You cannot deactivate your own admin account."})
    }

    await deactivateUserProfile(id);
    res.status(200).json({ message: "Tenant deactivated and the house released successfully!" });
  } catch (error) {
    console.error("Delete controller error:", error)
    res.status(500).json({message: "Failed to deactivate tenant. Database error." });
  }
};