import mongoose from "mongoose";

const advertiseSchema = new mongoose.Schema({
    
    image:{
        type: String,
        required: true,
        
    },
    
    

},{timestamps : true})


const Advertise = mongoose.model('Advertise', advertiseSchema , 'advertises')
export default Advertise