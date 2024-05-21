const router = require('express').Router()
const { findOne } = require('../Model/Addtocart')
const company = require('../Model/CompanySchema')
const cripto = require('crypto-js')
const JWT = require('jsonwebtoken')

router.post('/signup', async (req, res) => {
   console.log(req.body)
   req.body.password = cripto.AES.encrypt(req.body.password, process.env.CompanyPasskey).toString()
   try {
      const newAdmin = new company(req.body)
      await newAdmin.save()
      res.status(200).json("susses")

   } catch (err) {
      res.status(500).json(err)
   }
})
router.post('/login', async (req, res) => {
   try {
      console.log(req.body)
      const findUser = await company.findOne({ email: req.body.email })
      !findUser && res.status(400).json("email  in inviled")
      console.log("finded:",findUser);
      const password = cripto.AES.decrypt(findUser.password,process.env.CompanyPasskey)
      console.log(password)
      const originalPassword = password.toString(cripto.enc.Utf8)
      console.log(originalPassword)
      req.body.password != originalPassword && res.status(400).json("invailed password")
      const CompanyPass= JWT.sign({
         id: findUser._id
      }, process.env.seckey, { expiresIn: '1d' })
      res.status(200).json({ CompanyPass, id: findUser._id })
   } catch (err) {
      res.status(500).json(err)
   }
})
router.get('/allcompany',async (req,res)=>{
   try{
      const allcompanys=await company.find({})
      res.status(200).json(allcompanys)
   }catch(err){
      res.status(500).json(err)
   }
})
router.delete('/deletecompany/:id',async (req,res)=>{
   console.log(req.params.id);
   try{
      await company.findByIdAndDelete(req.params.id)
      res.status(200).json("deleted")
   }catch(err){
      res.status(500).json(err)
   }
})

module.exports = router