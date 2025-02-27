const express = require("express");
// const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect");

dbConnect();

const app = express();


// Middleware
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const dentist = require('./routes/dentistRoutes');
const errorHandler = require('./middlewares/errorHandler');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dentist', dentist);

app.use(errorHandler);
// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});