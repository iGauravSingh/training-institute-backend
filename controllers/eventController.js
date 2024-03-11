const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')

const { prisma } = require("../db");




//// get all routes
const getAllEvent = asyncHandler(async (req,res)=> {
    const allevent = await prisma.Event.findMany()
    res.send(allevent)
})

//// get eone event detail
const getFiveEvent = asyncHandler(async (req,res)=> {
    const id = parseInt(req.params.id, 10)
    try {
        
        const oneEvent = await prisma.event.findMany({
            take: id
          });
      
          if (oneEvent) {
            res.send(oneEvent)
          } else {
            res.send('event not found')
          }
    
    } catch (error) {
        res.send('some error ')
    } finally {
        await prisma.$disconnect();
      }
})

//// create event
const createEvent = asyncHandler(async (req,res)=>{
    console.log('in event controller create event')
    const {date,month,heading,venue,state,city,detail,timeStart,timeEnd} = req.body;
    const newDate = parseInt(date)
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
})

//// delete event
const deleteEvent = asyncHandler(async (req,res)=> {
    const id = parseInt(req.params.id, 10)
    //console.log('in event controller delete event here is req.body', id)
    
    const deleteEvent = await prisma.Event.delete({
        where: {
            id: id
        }
    })
    res.send({message: 'deleted'})
})


module.exports = {
    getAllEvent, createEvent, deleteEvent, getFiveEvent
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


