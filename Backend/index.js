const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

dotenv.config();

app.use(cors({
  origin: 'https://e-commerce-200.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.static(path.join(__dirname, 'Frontend/app/build')));
app.use(express.json());

// Routers
const UserRouter = require('./Router/UserRouter');
const AdminRouter = require('./Router/AdminRouter');
const CompanyRouter = require('./Router/CompanyRouter');

mongoose.connect(process.env.MongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

app.use('/home', UserRouter);
app.use('/Admin', AdminRouter);
app.use('/company', CompanyRouter);


app.get('', (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend/app/build', 'index.html'));
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
