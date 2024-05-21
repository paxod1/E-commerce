const express=require('express')
const app =express()
const mongoose=require('mongoose')
const dontenv=require('dotenv')
const cors=require('cors')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
dontenv.config()
app.use(cors())

const UserRouter=require('./Router/UserRouter')
const AdminRouter=require('./Router/AdminRouter')
const CompanyRouter=require('./Router/CompanyRouter')

mongoose.connect(process.env.MongoUrl).then(()=>{
   console.log("data base is connected")
}).catch((err)=>{
    console.log(err)
})
app.use(express.json())


app.use('/home',UserRouter)
app.use('/Admin',AdminRouter)
app.use('/company',CompanyRouter)
app.listen(5000,()=>{
    console.log("port 5000 is connected")
})


