import { fetchVacatingNotices, updateNoticeStatusById } from "../models/notices.Models.js";

export const getVacatingNotices = async (req, res) => {
  try {
    const data = await fetchVacatingNotices();

  if (data.length === 0) {
    return res.status(404).json({message: "No vacating notices found!"})
  };

   res.json(data);
  } catch (error) {
    console.error(message.error, error);
  }
};

export const updateNoticeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const requestsData = req.body;

    await updateNoticeStatusById(id, requestsData);

    res.json({message: "Notice approved successfully."});
  } catch (error) {
    console.error("Database error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateNoticeDeclineStatus = async (req, res) => {
  try {
    const { id } = req.params;
  const requestsData = req.body;

  await updateNoticeStatusById(id, requestsData);

  res.json({message: "Notice declined successfully!"})
  } catch (error) {
    console.error("Database error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
  
};
  


