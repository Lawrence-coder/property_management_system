import { getMonthlyReport } from "../models/paymentReceipts.Models.js";

export const fetchMonthlyReport = async (req, res) => {
  // 1. Destructure the query parameters from the URL
  const { propertyId, month, year } = req.query;

  // 2. Validation: Ensure the admin actually selected a property and date
  if (!propertyId || !month || !year) {
    return res.status(400).json({ 
      message: "Please provide propertyId, month, and year for the report." 
    });
  }

  try {
    // 3. Call the model function
    // We parse them to Integers to ensure the SQL query gets numbers
    const reportData = await getMonthlyReport(
      parseInt(propertyId), 
      parseInt(month), 
      parseInt(year)
    );

    // 4. Check if we actually found any houses for that property
    if (reportData.length === 0) {
      return res.status(404).json({ 
        message: "No houses found for this property." 
      });
    }

    // 5. Success! Send the report data to the frontend
    res.status(200).json(reportData);

  } catch (error) {
    console.error("Error generating monthly report:", error);
    res.status(500).json({ 
      message: "Server error while generating the payment report." 
    });
  }
};