const router = require('express').Router()
const Admin = require('../Model/AdminLogin')
const cripto = require('crypto-js')
const Productschema = require('../Model/ProductSechema')
const CartSchema = require("../Model/Addtocart")
const JWT = require('jsonwebtoken')
const multer = require('multer')
const VerifyToken = require('../VerifyToken')
const { constants } = require('crypto')
const order = require('../Model/Order')






router.post('/signup', async (req, res) => {

    console.log("req.body>>>>>>>>>>>>>", req.body)
    req.body.password = cripto.AES.encrypt(req.body.password, process.env.AdminPasskey).toString()
    try {
        const NewUser = new Admin(req.body)
        await NewUser.save()
        res.status(200).json("susses")
    } catch (err) {
        res.status(500).json("failed")
    }
})
router.post('/login', async (req, res) => {
    console.log("logindata:", req.body)
    try {
        console.log('err')
        const FindUser = await Admin.findOne({ email: req.body.email })
        !FindUser && res.status(401).json('invaild email')
        console.log(FindUser);
        const decrypt = cripto.AES.decrypt(FindUser.password, process.env.AdminPasskey)
        const originalPassword = decrypt.toString(cripto.enc.Utf8)
        console.log(originalPassword)
        req.body.password != originalPassword && res.status(401).json('invaied password')
        const Pass = JWT.sign({
            id: FindUser._id
        }, process.env.seckey, { expiresIn: '1d' })
        res.status(200).json({ Pass, id: FindUser._id })
        console.log("pass:", Pass)
    } catch (err) {

        res.status(500).json("from backend>>..",err)
    }
})
router.get('/AdminProfile/:id', async (req, res) => {
    try {
        const AdminProfile = await Admin.findById(req.params.id)
        res.status(200).json(AdminProfile)
    } catch (err) {
        res.status(500).json("failed to get profile")
    }
})
router.put('/UpdateProfile/:id', async (req, res) => {

    try {
        const update = await Admin.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        req.status(200).json(update)
    } catch {
        res.status(500).json("failed to update")
    }
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../Frontend/app/src/Images")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.post('/upload', upload.single("file"), async (req, res) => {
    console.log(req.body)
    const { productname, productdocs, companyname, productprice, productofferprice, ComapanyID } = req.body;
    const imageName = req.file.filename
    console.log(imageName)
    console.log("from backend end>>>>>>", productname, productdocs, companyname, productofferprice)
    try {
        if (!productprice || !productname || !productdocs || !companyname || !productofferprice) {
            return res.status(400).json({ error: "Required fields are missing" });
        }
        await Productschema.create({
            image: imageName,
            companyname,
            productprice,
            productofferprice,
            productname,
            productdocs,
            ComapanyID
        });

        res.status(200).json("success");

    } catch (err) {
        console.log(err)
    }
})

router.get("/getimage", async (req, res) => {
    try {
        console.log("from backend products??????????:")
        const data = await Productschema.find({});
        console.log("from backend:", data);
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})
router.delete('/deleteproduct/:id', async (req, res) => {
    console.log(req.params.id);
    try {
        await Productschema.findByIdAndDelete(req.params.id)
        res.status(200).json("deleted..................")
    } catch (err) {
        res.status(500).json(err)
    }
})
router.post('/addToCarts', upload.single("file"), async (req, res) => {
    const { image, productname, productdocs, companyname, productprice, productofferprice, ComapanyID, userID, productID, Quantity } = req.body;
    try {
        let cartItem = await CartSchema.findOne({ userID, productID });
        if (cartItem) {
            cartItem.Quantity = cartItem.Quantity+1;
            await cartItem.save();
        } else {
            
            await CartSchema.create({
                image,
                productname,
                productdocs,
                companyname,
                productprice,
                productofferprice,
                ComapanyID,
                userID,
                productID,
                Quantity
            });
        }
        res.status(200).json("success");
    } catch (err) {
        console.log("Error in addToCarts:", err);
        res.status(500).json("error");
    }
});


router.get("/displaycard", async (req, res) => {
    const { userID } = req.query;
    try {
        const data = await CartSchema.find({ userID });
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.delete("/removeFromCart/:id", async (req, res) => {
    try {
        console.log("from backend:", req.params.id)
        const deleteData = await CartSchema.findByIdAndDelete(req.params.id)

        res.status(200).json("deleted sussusfully")

    } catch (err) {
        res.status(401).json("internal server error")
    }

})
router.get('/FindProduct/:id', async (req, res) => {
    try {
        console.log("Fetching product from Productschema with ID:", req.params.id);
        const product = await Productschema.findById(req.params.id);
        if (product) {
            res.status(200).json(product);
            console.log("Product fetched:", product);
        } else {
            res.status(404).json({ message: "Product not found" });
            console.log("Product not found for ID:", req.params.id);
        }
    } catch (err) {
        console.error("Error fetching product from Productschema:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.get('/FindProductFromAddToCart/:id', async (req, res) => {
    try {
        console.log("from backend.>>>>>>>>>>>>>>>>>>.", req.params.id)
        const product = await CartSchema.findById(req.params.id)
        res.status(200).json(product)
        console.log(product)

    } catch (err) {
        res.status(401).json(err)
    }
})
router.post('/orderPost', async (req, res) => {
    console.log('from backend>>>>>>>>>>>>>>>>>>>>>', req.body)
    try {
        const newOrder = new order(req.body)
        await newOrder.save()
        res.status(200).json("susses")
        console.log("sussess")
    } catch (err) {
        console.log("err from backend????????", err)
        res.status(400).json(err)

    }
})
router.get('/Oreders', async (req, res) => {
    const { userID } = req.query;
    try {
        const data = await order.find({ userID });
        console.log("from backend:", data);
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err)
    }
})
router.get('/companyOrders', async (req, res) => {
    const { ComapanyID } = req.query;
    console.log("CompanyID from backend:", ComapanyID);

    try {
        const data = await order.find({ 'newOrder.ComapanyID': ComapanyID });
        console.log("Data fetched from database:", data);
        res.status(200).json(data);
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).json(err);
    }
});
router.get("/getcompanyproduct", async (req, res) => {
    const { ComapanyID } = req.query;
    try {
        console.log("from backend products??????????:", ComapanyID)
        const data = await Productschema.find({ ComapanyID });
        console.log("from backend:", data);
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})
router.delete('/orderdelete/:id', async (req, res) => {
    try {
        await order.findByIdAndDelete(req.params.id)
        res.status(200).json('deleted sussefully')
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router