const express = require("express");
const {signupBody, signinBody, updateBody} = require("../types");
const {User, Account} = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const {authMiddleware} = require("../middleware");

const router = express.Router();

router.post("/signup" , async(req , res) => {
    const signupPayload = req.body;
    const parsedSignupPayload = signupBody.safeParse(signupPayload);

    if(!parsedSignupPayload.success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            message: "Email already taken"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

    const userId = user._id;

    //create account

    await Account.create({
        userId,
        balance: 1 + Math.random()*10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})

router.post("/signin", async (req , res) => {
    const signinPayload = req.body;
    const parsedSigninPayload = signinBody.safeParse(signinPayload);

    if(!parsedSigninPayload.success){
        return res.status(400).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
    })

    if (user && req.body.password == user.password) {
        const token = jwt.sign(
            { userId: user._id }, // Payload
            JWT_SECRET            // Secret key
        );

        return res.json({ token });
    }
    else if (req.body.password !== user.password) {
        return res.status(401).json({ message: "Invalid password" });
      } 
    else {
        return res.status(404).json({
            message: "User not found",
        });
    }
    
})

router.put("/", authMiddleware, async(req, res) => {
    const updatePayload = req.body;
    const parsedUpdatePayload = updateBody.safeParse(updatePayload);

    if(!parsedUpdatePayload.success){
        res.send(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body, {_id:req.userId});

    res.json({
        message: "Updated successfully"
    })

}) 

router.get("/bulk", async(req,res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or:[{
            firstName:{
                "$regex": filter
            }
            },{
            lastName:{
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;