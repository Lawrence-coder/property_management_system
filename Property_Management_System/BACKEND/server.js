import dotenv from 'dotenv';
import app from './src/app.js';

dotenv.config(); //Loads environment variables from a .env file into process.env



const PORT = process.env.PORT_SERVER || 5000;


app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
