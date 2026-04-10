import Tour from '../models/tours.js';
import dotenv from 'dotenv';

dotenv.config();

const getCreateTour = async(req, res) => {
    const {title, description, cities, startDate, endDate, photos} = req.body;
    const newTour = new Tour({
        title,
        description,
        cities,
        startDate,
        endDate,
        photos,
        User: req.user.id
    });

    try {
        const savedTour = await newTour.save();
        return res.json({
            success: true,
            message: 'Tour created successfully',
            data: savedTour
        });
    } catch (error) {
        return res.json({
            success: false,
            message: `Failed to create tour: ${error.message}`,
            data: null
        });
    }
};

const getTours = async(req, res) => {
    const tours = await Tour.find({ User: req.user.id }).populate('User', 'name email');
    return res.json({
        success:true,
        message:"fetched tours successsfully",
        data: tours
    });
};

export { getCreateTour, getTours };