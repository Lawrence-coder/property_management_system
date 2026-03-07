import { fetchTenantInfoById, createMaintenanceIssue } from "../models/maintenanceRequests.Models.js";

export const getTenantInfo = async (req, res) => {
  try {
    const userId = req.user.id; 
    const tenantInfo = await fetchTenantInfoById(userId);

    if (!tenantInfo) {
      return res.status(404).json({ message: "Tenant details not found" });
    }

    res.json({
      ...tenantInfo,
      hasPending: tenantInfo.status === 'pending',
      hasInProgress: tenantInfo.status === 'in_progress'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postMaintenanceIssue = async (req, res) => {
  try {
  const userId = req.user.id;
  
  const { house_id, issue_description } = req.body;

  await createMaintenanceIssue(userId, house_id, issue_description);

  res.status(201).json({message: "Maintenace request has been submitted successfully."})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};