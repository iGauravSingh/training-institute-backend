const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')
const { v4: uuidv4 } = require('uuid');

const { prisma } = require("../db");




//// get all routes
const getAllStaff = asyncHandler(async (req,res)=> {
    const allstaff = await prisma.staff.findMany()
    res.send(allstaff)
})

//// get one staff detail
const getOneStaff = asyncHandler(async (req,res)=> {
    const id = parseInt(req.params.id, 10)
    try {
        
        const oneStaff = await prisma.staff.findUnique({
            where: {
              id: id, 
            },
          });
      
          if (oneStaff) {
            res.send(oneStaff)
          } else {
            res.send('staff not found')
          }
    
    } catch (error) {
        res.send('some error ')
    } finally {
        await prisma.$disconnect();
      }
})

//// create staff
const createStaff = asyncHandler(async (req,res)=>{
    const {name,email,password,phone,designation,address,joinDate,role} = req.body;
    const employeeId = uuidv4()
    const newstaff = await prisma.staff.create({
        data: {
            employeeId,
            name,
            email,
            password,
            phone,
            designation,
            address,
            joinDate,
            role
        }
    })
    res.json({created: "ok"})
})

//// delete staff
const deleteStaff = asyncHandler(async (req,res)=> {
    const id = parseInt(req.params.id, 10)
    const deletestaff = await prisma.staff.delete({
        where: {
            id: id
        }
    })
    res.send('entry deleted')
})


module.exports = {
    getAllStaff, createStaff, deleteStaff, getOneStaff
}

///////////////////////////////////



