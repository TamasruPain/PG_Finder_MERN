require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors')
const propertyRoutes = require('./routes/propRoutes.js');
const queryRoutes = require('./routes/queryRoutes.js');
const userRoutes = require('./routes/userRoutes.js')
const authRoutes = require('./routes/authRoutes.js')

//express app
const app = express();
const allowedOrigins = ['https://pg-finder-tp.vercel.app'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true 
}));

// Increase the payload size limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// login middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});


//routes
app.use('/api/properties', propertyRoutes);
app.use('/api/query', queryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

//health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'Server is healthy' });
}); 


//Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("connected to MongoDB!");
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log("listening on port", process.env.PORT);
            console.log("--------------------------");
            console.log("Server is Running !!");
        })
    })
    .catch((error) => {
        console.log('Connection Error: ', error);
    })