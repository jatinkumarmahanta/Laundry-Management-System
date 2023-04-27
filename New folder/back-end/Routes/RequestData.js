const express = require('express');
const router = express.Router();
const User = require("../models/Request.js"); 


router.post("/request"
    , async (req, res) => {
        
        try {
            const { top, bottom, woolen, other } = req.body;
            const total = top*12 + bottom*15 + woolen*20 + other*25;

            await User.create({
                date: req.body.date,
                top: req.body.top,
                bottom: req.body.bottom,
                woolen: req.body.woolen,
                other: req.body.other,
                service: req.body.service,
                person: req.body.person,
                disc: req.body.disc,
                authToken : req.body.authToken,
                status : req.body.status,
                total:total
            })
            res.json({ success:true })
        } catch (error) {
            console.log(error)
            res.json({ success:false })
        }
    
    })

    module.exports = router;