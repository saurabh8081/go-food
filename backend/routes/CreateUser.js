const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSec = "mysecretkeyforgofoodapp"

router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("password", "Password too small").isLength({ min: 5 }),
    body("name").isLength({ min: 5 }), 
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ sucess: false, errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(req.body.password, salt);
   
    try {
      await User.create({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: secPass,  
      }).then(res.json({ sucess: true }));
    } catch (error) {
      console.log(error);
      res.json({ sucess: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "Password too small").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ sucess: false, errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try logging with correct credentials" });
      }

      let passwordCompare = await bcrypt.compare(
        req.body.password,  
        userData.password 
      );
       
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ errors: "Try logging with correct credentials" });
      }
      const data = {
        user: {
          id: userData.id,  
        },
      }
      const authToken = jwt.sign(data, jwtSec);
      return res.json({ success: true,authToken:authToken});
    } catch (error) {
      console.log(error);
      res.json({ success: true });
    }
  }
);
module.exports = router;
