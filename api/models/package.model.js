import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
    
    title:{
        type: String,
        required: true,
        
    },
    price:{
        type: String,
        required: true,
    },
    packageurl:{
        type: String,
        required :true,
    },
    packageImage:{
        type: String,
        required :true,
    },
    
    

},{timestamps : true})


const Package = mongoose.model('Package', packageSchema , 'packages')
export default Package