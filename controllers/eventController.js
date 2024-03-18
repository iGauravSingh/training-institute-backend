const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')

const { prisma } = require("../db");




//// get all routes
const getAllEvent = asyncHandler(async (req,res)=> {
    try {
        const allevent = await prisma.Event.findMany()
    res.send(allevent)
    } catch (error) {
        console.log('error connecting database in getting all',error)
    }
})



//// create event
const createEvent = asyncHandler(async (req,res)=>{
    //console.log('in event controller create event')
    const {date,month,heading,venue,state,city,detail,timeStart,timeEnd} = req.body;
    const newDate = parseInt(date)
    try {
        const newevent = await prisma.Event.create({
            data: {
                date: newDate,
                month,
                heading,
                venue,
                state,
                city,
                detail,
                timeStart,
                timeEnd
            }
        })
        res.json({message: "ok created"})
    } catch (error) {
        console.log('error connecting database in creating',error)
    }
})

//// delete event
const deleteEvent = asyncHandler(async (req,res)=> {
    const id = parseInt(req.params.id, 10)
    //console.log('in event controller delete event here is req.body', id)
    
    try {
        const deleteEvent = await prisma.Event.delete({
            where: {
                id: id
            }
        })
        res.send({message: 'deleted'})
    } catch (error) {
        console.log('error connecting database in deleting',error)
    }
})


module.exports = {
    getAllEvent, createEvent, deleteEvent
}

///////////////////////////////////
// routes that can be implemented in future


// // GET single event by ID
// app.get('/events/:id', (req, res) => {
//     const eventId = parseInt(req.params.id);
//     const event = events.find(event => event.id === eventId);
//     if (!event) {
//         res.status(404).json({ message: 'Event not found' });
//     } else {
//         res.json(event);
//     }
// });



// // PUT update an existing event by ID
// app.put('/events/:id', (req, res) => {
//     const eventId = parseInt(req.params.id);
//     const updatedEvent = req.body;
//     const index = events.findIndex(event => event.id === eventId);
//     if (index === -1) {
//         res.status(404).json({ message: 'Event not found' });
//     } else {
//         events[index] = updatedEvent;
//         writeEventsToFile(events); // Write updated events to file
//         updateEventsCache(); // Update events cache
//         res.json(updatedEvent);
//     }
// });


