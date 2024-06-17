const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const path = require('path');
const bodyParser = require('body-parser');

dotenv.config();

app.use(cors({
  origin: 'https://e-commerce-200.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.static(path.join(__dirname, 'Frontend/app/build')));
app.use(express.json());

const UserRouter = require('./Router/UserRouter');
const AdminRouter = require('./Router/AdminRouter');
const CompanyRouter = require('./Router/CompanyRouter');

mongoose.connect(process.env.MongoUrl).then(() => {
  console.log("data base is connected");
}).catch((err) => {
  console.log(err);
});

app.use('/home', UserRouter);
app.use('/Admin', AdminRouter);
app.use('/company', CompanyRouter);


const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`port ${PORT} is connected`);
});
