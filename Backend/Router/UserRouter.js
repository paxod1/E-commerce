const router = require('express').Router();
const user = require('../Model/UserSechema'); 
const crypto = require('crypto-js'); // Fix spelling of 'crypto'
const JWT = require('jsonwebtoken');
const VerifyToken = require('../VerifyToken');

// User Signup
router.post('/signup', async (req, res) => {
    console.log("req.body>>>>>>>>>>>>>", req.body);
    req.body.password = crypto.AES.encrypt(req.body.password, process.env.Passkey).toString();
    try {
        const NewUser = new user(req.body);
        await NewUser.save();
        res.status(200).json("success");
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).json("failed");
    }
});

// User Login
router.post('/login', async (req, res) => {
    console.log("logindata:", req.body);
    try {
        const FindUser = await user.findOne({ email: req.body.email });
        if (!FindUser) return res.status(401).json('invalid email');

        const decrypt = crypto.AES.decrypt(FindUser.password, process.env.Passkey);
        const originalPassword = decrypt.toString(crypto.enc.Utf8);
        if (req.body.password !== originalPassword) return res.status(401).json('invalid password');

        const Token = JWT.sign({ id: FindUser._id }, process.env.seckey, { expiresIn: '1d' });
        res.status(200).json({ Token, id: FindUser._id });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json(err);
    }
});

// Get Profile Data
router.get('/ProfileData/:id', VerifyToken, async (req, res) => {
    try {
        const MyProfile = await user.findById(req.params.id);
        res.status(200).json(MyProfile);
    } catch (err) {
        console.error("Error fetching profile data:", err);
        res.status(500).json("failed to get data");
    }
});

// Update Profile Data
router.put('/updateData/:id', VerifyToken, async (req, res) => {
    try {
        const UpdateData = await user.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(UpdateData);
    } catch (err) {
        console.error("Error updating profile data:", err);
        res.status(500).json("failed to update");
    }
});

// Get All Data
router.get('/getalldata', async (req, res) => {
    try {
        const allData = await user.find();
        res.status(200).json(allData);
    } catch (err) {
        console.error("Error fetching all data:", err);
        res.status(500).json(err.message);
    }
});

// Delete Data
router.delete('/deletedata/:id', async (req, res) => {
    try {
        await user.findByIdAndDelete(req.params.id);
        res.status(200).json("deleted");
    } catch (err) {
        console.error("Error deleting data:", err);
        res.status(500).json("error");
    }
});

module.exports = router;
