//import dotenv from 'dotenv';
import app from './src/app.js';

//dotenv.config(); //Loads environment variables from a .env file into process.env



const PORT = 3000 || 5000;


app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
