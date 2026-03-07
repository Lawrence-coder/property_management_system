import { fetchAllRequests, updateIssueStatus, getIssueFrequency } from "../models/adminMaintenanceRequests.Models.js";

export const getIssues = async (req, res) => {
  try {
    const issues = await fetchAllRequests();
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const changeStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    await updateIssueStatus(id, status);

    res.json({ message: "Status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getFrequency = async (req, res) => {
  try {
    const data = await getIssueFrequency();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
