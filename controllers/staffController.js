const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const puppeteer = require('puppeteer');
const bcrypt = require("bcrypt");

const { prisma } = require("../db");

function generateIDCardHtml(name, email, phone, blood) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>ID Card</title>
            <style>
                /* Embedded CSS */
                .id-card {
                    font-family: Arial, sans-serif;
                    border: 1px solid #ccc;
                    padding: 10px;
                    margin: 10px;
                    text-align: center;
                    background-color: #f9f9f9;
                }
            </style>
        </head>
        <body>
            <div class="id-card">
                <h2 style="color: navy;">ID Card</h2>
                <p><strong>Name:</strong> <span style="color: grey;">${name}</span></p>
                <p><strong>Email:</strong> <span style="color: grey;">${email}</span></p>
                <p><strong>Phone:</strong> <span style="color: grey;">${phone}</span></p>
                <p><strong>Phone:</strong> <span style="color: grey;">${blood}</span></p>
            </div>
        </body>
        </html>
    `;
}

//// get all Staff
const getAllStaff = asyncHandler(async (req, res) => {
  const allstaff = await prisma.staff.findMany();
  res.send(allstaff);
});

//// get one staff detail
const getOneStaff = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const oneStaff = await prisma.staff.findUnique({
      where: {
        id: id,
      },
    });

    if (oneStaff) {
      res.send(oneStaff);
    } else {
      res.send("staff not found");
    }
  } catch (error) {
    res.send("some error ");
  } finally {
    await prisma.$disconnect();
  }
});

//// create staff
const createStaff = asyncHandler(async (req, res) => {
  const { name, email, password, phone, designation, address, joinDate, role, blood } =
    req.body;
  const employeeId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);
  const newstaff = await prisma.staff.create({
    data: {
      employeeId,
      name,
      email,
      password: hashedPassword,
      phone,
      designation,
      address,
      joinDate,
      role,
      blood
    },
  });
  res.json({ created: "ok" });
});

//// delete staff
const deleteStaff = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const deletestaff = await prisma.staff.delete({
    where: {
      id: id,
    },
  });
  res.send("entry deleted");
});

//// generate id card of staff
//// admin send id of staff
//// from backend fetch detail of staff from id
const generateId = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const staffInfo = {
    employeeId: '',
    name: '',
    phone: '',
    designation: '',
    blood: ''
  };
  try {
    const oneStaff = await prisma.staff.findUnique({
      where: {
        id: id,
      },
    });

    if (oneStaff) {
        const htmlContent = generateIDCardHtml(oneStaff.name, oneStaff.email, oneStaff.phone,oneStaff.blood);
      console.log(oneStaff)
      const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    await page.setViewport({ width: 600, height: 400 });
    const buffer = await page.screenshot();

    await browser.close();

    // Set the appropriate header for image/png content
    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);

    } else {
      res.send("staff not found");
    }
  } catch (error) {
    res.send("some error ");
  } finally {
    await prisma.$disconnect();
  }
});

module.exports = {
  getAllStaff,
  createStaff,
  deleteStaff,
  getOneStaff,
  generateId
};

///////////////////////////////////
