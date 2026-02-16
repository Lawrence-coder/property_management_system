import { fetchRentFormData, createRentPayment} from '../models/payment.Models.js'

export const getRentPayment = async (req, res) => {
  try {
    const userId = req.user.id; // getting user id from the authenticated user via the protect middleware.

   /*---const rentPayment = await fetchRentPayment(userId);

   if (rentPayment.length === 0) {
  return res.status(404).json({ message: "No rent payment data found" });
}

   res.json(rentPayment);----*/

const data = await fetchRentFormData(userId);
if (data.length === 0) {
  return res.status(404).json({ message: "No rented house found" });
}

res.json(data[0]); // Send the first rented house data

  } catch (error) {
    res.status(500).json({message: error.message});
  };
  
};

export const submitRentPayment = async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("File:", req.file);
    const userId = req.user.id; // getting user id from the authenticated user via the protect middleware.
    const { house_id }= req.body; // req.body is used to get data sent in the request body
    const { amount }= req.body;
    if (!req.file) {
      return res.status(400).json({message: "Please upload a receipt"});
    }

    const receipt_path = req.file.path;

    await createRentPayment(userId, house_id, amount, receipt_path);
    res.status(201).json({message: "Rent Payment submitted"});
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({message: error.message});
  };
  
};