import mongoose from "mongoose";

const sigglepostadvertiseSchema = new mongoose.Schema({
    
    image:{
        type: String,
        required: true,
        
    },
    
    

},{timestamps : true})


const SinglePostAdvertise = mongoose.model('SinglePostAdvertise', sigglepostadvertiseSchema , 'singlepostadvertises')
export default SinglePostAdvertise