const express = require('express');
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/',(req,res) => {
    res.send('hello from server')
})
// event routes 
app.use('/events',require('./routes/eventRoutes'))
// staff routes
app.use('/staff',require('./routes/staffRoutes'))

// auth routes
// app.use('/login',require('./routes/authRoutes'))

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

// 404 route
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
