import { fetchVacatingForm, createVacatingRequest, getLatestRequestStatus } from '../models/vacating.Models.js';

export const getVacatingDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const vacatingForm = await fetchVacatingForm(userId);

    if (!vacatingForm) {
      return res.status(404).json({ message: "VacatingForm not found" });
    };

    
    //const hasPending = await checkExistingRequest(userId);
    //const hasApproved = await checkRequestApproval(userId);
    //const hasDeclined = await checkRequestDeclined(userId);

    const status = await getLatestRequestStatus(userId);

    // Return the details along with the latest request status
    res.json({  
      ...vacatingForm, 
      hasPending: status === 'pending',
      hasApproved: status === 'approved',
      hasDeclined: status === 'rejected'
    });

    
  } catch (error) {
    res.status(500).json({ message: error.message });
  };
};


export const submitVacatingRequest = async (req, res) => {
  try {
    const userId = req.user.id; // getting user id from the authenticated user via the protect middleware.
    const { house_id, vacate_date } = req.body;

     const currentStatus = await getLatestRequestStatus(userId);

     if (currentStatus ==="pending") {
      return res.status(400).json({
        message: "You have a pending request. Please wait for Admin approval."
      });

      if (currentStatus === "rejected") {
        return res.status(400).json({
          message: "Your vacating notice has been declined."
        });
      }
     }


    await createVacatingRequest(userId, house_id, vacate_date);

    res.status(201).json({ message: "Vacating request submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
