import { body } from "express-validator";

export const loginValidator = [
    body('email', 'Invalid should not be empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('password','Password min length 3 cgarcters').isLength({min: 6}),
]

//const {date,month,heading,venue,state,city,detail,timeStart,timeEnd} = req.body;
export const createEventValidator = [
    body('date').not().isEmpty,
    body('month').not().isEmpty,
    body('heading').not().isEmpty,
    body('venue').not().isEmpty,
    body('state').not().isEmpty,
    body('city').not().isEmpty,
    body('detail').not().isEmpty,
    body('timeStart').not().isEmpty,
    body('timeEnd').not().isEmpty,
]














