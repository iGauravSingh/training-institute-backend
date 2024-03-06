// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const fs = require('fs');
// const path = require('path');

// const adminsFilePath = path.join(__dirname, 'admins.json');


// // Helper function to read admins from the JSON file
// function readAdminsFromFile() {
//     try {
//         const data = fs.readFileSync(adminsFilePath, 'utf8');
//         return JSON.parse(data);
//     } catch (err) {
//         return [];
//     }
// }

// // Authenticate user and generate JWT token
// const login = asyncHandler(async (req,res)=>{
//     const { username, password } = req.body;
//     const admins = readAdminsFromFile();
//     const user = admins.find(admin => admin.username === username);
//     if (!user) {
//         return res.status(401).json({ message: 'Authentication failed' });
//     }
//     bcrypt.compare(password, user.password, (err, result) => {
//         if (err || !result) {
//             return res.status(401).json({ message: 'Authentication failed' });
//         }
//         const token = jwt.sign({ username: user.username, email: user.email }, 'your_secret_key', { expiresIn: '1h' });
//         res.json({ token });
//     });
// })


// module.exports = { login }

