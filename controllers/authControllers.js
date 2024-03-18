const JWT = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const asyncHandler = require("express-async-handler");
const { prisma } = require("../db");

// Authenticate user and generate JWT token
const login = asyncHandler(async (req,res) => {
    const { email, password } = req.body;

    try {
      const user = await prisma.staff.findUnique({
        where: {
            email
        }
      });
    
      if (!user) {
        return res.status(400).json({
          errors: [{ msg: "Invalid Credentials" }],
        });
      }
    
      const isMatch = await bcrypt.compare(password, user.password);
    
      if (!isMatch) {
        return res.status(400).json({
          errors: [{ msg: "Invalid Credentials" }],
        });
      }
    
      //console.log(user)
        const userPayload = {
            id: user.id,
            email: user.email,
            username: user.username,
          }
      const token = await JWT.sign(
        userPayload,
        process.env.JSON_WEB_TOKEN_SECRET,
        {
          expiresIn: 3600000,
        }
      );
      return res.json({
        user: userPayload,
        token,
      });
    } catch (error) {
      console.log('error in auth',error)
    }
})
  


module.exports = { login }

