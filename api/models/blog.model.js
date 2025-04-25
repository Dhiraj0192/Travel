import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    
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
    category:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    title:{
        type: String,
        required: true,
        trim: true
    },
    slug:{
        type: String,
        required: true,
        unique:true,
        trim: true
    },
    blogcontent: {
        type: String,
        required: true,
        trim: true
    },
    featuredimage : {
        type: String,
        required: true,
        trim: true
    },
    status:{
        type: String,
        enum: ['published', 'pending'],
        default: 'published'
        
    },
    
    isFeatured: { type: Boolean, default: false },
    

},{timestamps : true})


blogSchema.index({ isFeatured: 1, createdAt: -1 });

const Blog = mongoose.model('Blog', blogSchema , 'blogs')
export default Blog