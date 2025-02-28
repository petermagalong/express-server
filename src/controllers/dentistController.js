const Dentist = require('../models/dentistModel');
const userModel = require('../models/userModel');
const AppError = require('../utils/appError');
const { days } = require('../utils/constants');
const { paginatedData } = require('../utils/paginatedData');

const getAllDentist = async (req, res) => {
    const options = {
        populate: { path:'userId', select: '-password -role -__v' },
        select: '-__v'
    }
   const result = await paginatedData(req,Dentist,options);

   if(!result.success)
   {

    throw new AppError(false, `Paginate Error ${result.message? result.message : ''}`, 500);

   }

    return res.status(200)
        .json({
            success: true,
            message: 'Success',
            result
        })
}

const addDentist = async (req, res) => {
    const { username, email, unavailability, availability} = req.body;

    if(!username)
    {   
        throw new AppError(false, 'User id or Email is required', 400);
    }
    if(!email && !username)
    {   
        throw new AppError(false, 'User id or Email is required', 400);
    }

    let getUser = {}
    if (username) {
        getUser = { username };
    } else {
        getUser = { email };
    }
    
    const userId = await userModel.findOne(getUser).select('-password');
    if (!userId) {
        throw new AppError(false, 'User not found', 404);
    }

    const checkDays =  availability.some(day => !days.includes(day.dayOfWeek));

    if(checkDays)
    {
        throw new AppError(false, 'Invalid day of week', 400);
    } 

    if(unavailability)
    {
        unavailability.startDate = new Date(unavailability.startDate);
        unavailability.endDate = new Date(unavailability.endDate);
    }

    const dentist = await Dentist.findOne({ userId:userId._id }).populate('userId','-password');

    const payload = {}
    if(dentist)
    {
        payload.availability = availability;
        payload.unavailability = unavailability;
        const result = await Dentist.findByIdAndUpdate(dentist._id, payload, { new: true });

        return res.status(201).json({
                        success: true,
                        message: 'Dentist update successfully',
                        result: result
                    })
    }
    else{
        const newDentist = new Dentist({
            userId: userId._id,
            availability,
            unavailability: unavailability,
        });
    
        // Save the dentist document to the database
        const result = await newDentist.save();
    
        return res.status(201)
            .json({
                success: true,
                message: 'Dentist inserted successfully',
                result: result
            })
    }
    
}

module.exports = {
    getAllDentist,
    addDentist
}