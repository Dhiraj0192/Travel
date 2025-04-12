import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    
    author:{
        type: String,
        required: true,
        
    },
    authorimage:{
        type: String,
        required :true,
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
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    

},{timestamps : true})

blogSchema.index({ views: 1, likes: 1, createdAt: 1 });
blogSchema.index({ isFeatured: 1, createdAt: -1 });

const Blog = mongoose.model('Blog', blogSchema , 'blogs')
export default Blog