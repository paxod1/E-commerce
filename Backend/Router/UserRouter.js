const router = require('express').Router()
const user = require('../Model/UserSechema')
const cripto = require('crypto-js')
const JWT = require('jsonwebtoken')
const VerifyToken = require('../VerifyToken')
var braintree = require("braintree");
const order = require('../Model/Order')





router.post('/signup', async (req, res) => {
    console.log("req.body>>>>>>>>>>>>>", req.body)
    req.body.password = cripto.AES.encrypt(req.body.password, process.env.Passkey).toString()
    try {
        const NewUser = new user(req.body)
        await NewUser.save()
        res.status(200).json("susses")
    } catch (err) {
        res.status(500).json("failed")
    }
})
router.post('/login', async (req, res) => {
    console.log("logindata:", req.body)
    try {
        const FindUser = await user.findOne({ email: req.body.email })
        !FindUser && res.status(401).json('invaild email')
        console.log(FindUser);
        const decrypt = cripto.AES.decrypt(FindUser.password, process.env.Passkey)
        const originalPassword = decrypt.toString(cripto.enc.Utf8)
        console.log(originalPassword)
        req.body.password != originalPassword && res.status(401).json('invaied password')
        const Token = JWT.sign({
            id: FindUser._id
        }, process.env.seckey, { expiresIn: '1d' })
        console.log("token:", Token)
        res.status(200).json({ Token, id: FindUser._id })
    } catch (err) {
        res.status(500).json(err)
    }
})
router.get('/ProfileData/:id', VerifyToken, async (req, res) => {

    try {
        const MyProfile = await user.findById(req.params.id)
        res.status(200).json(MyProfile)
    } catch (err) {
        console.log(err, "from profileData")
        res.status(500).json("faild to get datas")
    }
})
router.put('/updateData/:id', VerifyToken, async (req, res) => {
    console.log("fromin updatedata")
    console.log("update:", req.params.id)

    try {
        const UpdateData = await user.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(UpdateData)

    } catch (err) {
        res.status(500).json("failed to update")
    }
})
router.get('/getalldata', async (req, res) => {
    try {
        const allData = await user.find()
        res.status(200).json(allData)
    } catch (err) {
        res.status(500).json(err.message)
    }
})
router.delete('/deletedata/:id', async (req, res) => {
    console.log("req.body", req.params.id);
    try {
        await user.findByIdAndDelete(req.params.id)
        res.status(200).json("deleted")
    } catch (err) {
        res.status(500).json("error")
    }
})



module.exports = router