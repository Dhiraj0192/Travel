import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    
    author:{
        type: String,
        required: true,
        
    },
    authorid:{
        type: String,
        
        
    },
    authorimage:{
        type: String,
        required :true,
    },
    authoremail:{
        type: String,
        
    },
    
    title:{
        type: String,
        required: true,
        trim: true
    },
    
    
    video : {
        type: String,
       
        trim: true
    },
    videolink : {
        type: String,
       
        trim: true
    },
    
    
    
    

},{timestamps : true})



const Video = mongoose.model('Video', videoSchema , 'videos')
export default Video