const express=require('express')
const app =express()
const mongoose=require('mongoose')
const dontenv=require('dotenv')
const cors=require('cors')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
dontenv.config()
app.use(cors())
app.use(express.static(path.join(__dirname, "../Frontend/app/build")));
app.use(bodyParser.urlencoded({ extend: false }));
const UserRouter=require('./Router/UserRouter')
const AdminRouter=require('./Router/AdminRouter')
const CompanyRouter=require('./Router/CompanyRouter')

mongoose.connect(process.env.MongoUrl).then(()=>{
   console.log("data base is connected")
}).catch((err)=>{
    console.log(err)
})
app.use(express.json())

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/app/build", "index.html"));
});


app.use('/home',UserRouter)
app.use('/Admin',AdminRouter)
app.use('/company',CompanyRouter)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`port ${PORT} is connected`);
});


