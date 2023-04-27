const express = require('express');
const router = express.Router();
const User = require("../models/User.js");
const { body, validationResult } = require('express-validator');

// const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const jwtSecrect = "abcdefghijklmnopqrstuvwxyz@#$%&*"

router.post("/creatuser", [
    body('name', 'min 5 character').isAlpha().isLength({ min: 5 }).matches(/^[A-Z][a-z]*$/),
    body('email', 'enter a valid mail').isEmail(),
    body('number').isLength({max:10 }),
    body('password', 'inncorrect password').isLength({ min: 5 }).matches(/^(?=.*[A-Z a-z])(?=.*\d)[A-Za-z\d]{8,}$/)
]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt)

        try {
            await User.create({
                name: req.body.name,
                email: req.body.email,
                number: req.body.number,
                password: secPassword
            })
            res.json({ success: true })
        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }
    })
router.post("/loginuser", [
    body('email', 'enter a valid mail').isEmail()
]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        let email = req.body.email;
    
            try {
                let userData = await User.findOne({ email });
                if (!userData) {
                    return res.status(400).json({ errors: " Invalid login" })
                }

                const pwtCompair = await bcrypt.compare(req.body.password, userData.password);

                if (!pwtCompair) {
                    return res.status(400).json({ errors: " Invalid login" })
                }
                const data = {
                    user: {
                        id: userData.id
                    }
                }
                // const authToken =jwt.sign(data,jwtSecrect)
                return res.json({ success: true, authToken: email })
            } catch (error) {
                console.log(error)
                res.json({ success: false })
            }
        
    })

module.exports = router;