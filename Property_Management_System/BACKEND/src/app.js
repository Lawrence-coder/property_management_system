import express from 'express'; // imports the express framework
import bodyParser from 'body-parser'; // helps handle the post req
import cors from 'cors'; // allows the frontend to talk to the backend
//import db from './config/db.js'; //importing database connection
import profileRoutes from './routes/profile.Routes.js';
import vacatingRoutes from './routes/vacating.Routes.js';
import paymentRoutes from './routes/payment.Routes.js';
import registerRoutes from './routes/Register.Routes.js';
import propertiesRoutes from './routes/properties.Routes.js'
import housesRoutes from './routes/houses.Routes.js';
import loginRoutes from './routes/login.Routes.js';
import usersRoutes from './routes/users.Routes.js';
import noticesRoutes from './routes/notices.Routes.js';
import addPropertiesRoutes from './routes/addProperties.Routes.js';
import vacantsRoutes from './routes/vacants.Routes.js';
import PaymentReceiptsRoutes from './routes/paymentReceipts.Routes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); //Creates an application instance 

//Middlewares
app.use(express.json()); //parses incoming requests with JSON payloads
app.use(bodyParser.json()); //allows backend to read the req.body(json) and form submissions
app.use(express.urlencoded({ extended: true })) // to handle form submissions
app.use(cors()); //Enables CORS for all routes


//Handling Routes
app.use('/api/profile', profileRoutes); 
app.use('/api/vacatingForm', vacatingRoutes);
app.use('/api/RentPayment', paymentRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/properties', propertiesRoutes);
app.use('/api/houses', housesRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/vacatingNotices', noticesRoutes);
app.use('/api/addproperty', addPropertiesRoutes);
app.use('/api/vacants', vacantsRoutes);
app.use('/api/payments', PaymentReceiptsRoutes);
app.use('/src/Uploads', express.static(path.join(__dirname, 'Uploads')));


//404 Handling Middleware- for routes that don't exist.
app.use((req, res) => {
  res.status(404).json({
    message: `Route ${req.originalUrl} not found`
  });
});

//Global Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Server error"
  });
});


export default app;