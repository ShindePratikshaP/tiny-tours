import { model, Schema } from "mongoose";
import User from "./user";

const tourSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    cities: {
        type: [String],
        default: []
    },
    startDate: {
        type: Date,
        
    },
    endDate:{
        type: Date,
        
    },
    
    photos: {
        type: [
            {
                imgUrl: String,
                title: String,
                description: String
            }
        ],
        default: []
    
    },
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Tour = model('Tour', tourSchema);

export default Tour;       