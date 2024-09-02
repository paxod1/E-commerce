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

// CORS configuration
app.use(cors());

app.use(express.static(path.join(__dirname, 'Frontend/app/build')));
app.use(express.json());

const UserRouter = require('./Router/UserRouter');
const AdminRouter = require('./Router/AdminRouter');
const CompanyRouter = require('./Router/CompanyRouter');

mongoose.connect(process.env.MongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Database is connected");
}).catch((err) => {
  console.error("Error connecting to database:", err);
});

// Use routers
app.use('/home', UserRouter);
app.use('/Admin', AdminRouter);
app.use('/company', CompanyRouter);

// Start server

app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});
