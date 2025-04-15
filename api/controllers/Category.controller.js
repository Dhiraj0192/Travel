import { handleError } from "../helpers/handleError.js";
import Category from "../models/category.model.js";
import Blog from "../models/blog.model.js";

export const addCategory = async (req,res,next) =>{

    try {

        const {name, slug} = req.body
        const category = new Category({
            name,slug
        })

        await category.save()

        res.status(200).json({
            success: true,
            message: 'Category added successfully.'
        })
        
    } catch (error) {
        next(handleError(500, error.message))
    }

}

export const showCategory = async (req,res,next) =>{
    try {
        const {categoryid} = req.params
        const category = await Category.findById(categoryid)
        if (!category) {
            next(handleError(404,'Data not found.'))
        }
        res.status(200).json({
            category
        })
        
    } catch (error) {
        next(handleError(500, error.message))
    }
    
}

export const updateCategory = async (req,res,next) =>{
    try {
        const {name, slug} = req.body
        const {categoryid} = req.params
        const category = await Category.findByIdAndUpdate(categoryid,{
            name,slug
        },{new : true})

        res.status(200).json({
            success: true,
            message: 'Category updated successfully.',
            category
        })
        
    } catch (error) {
        next(handleError(500, error.message))
    }
    
}

export const deleteCategory = async (req,res,next) =>{
    try {
        const {categoryid} = req.params
        await Category.findByIdAndDelete(categoryid)
        res.status(200).json({
            success : true,
            message: 'Category Deleted Successfully.'
        })
        
    } catch (error) {
        next(handleError(500, error.message))
    }
    
}

export const getAllCategory = async (req,res,next) =>{
    try {
        const category = await Category.find().sort({name:1}).lean().exec()
        res.status(200).json({
            category
        })
        
    } catch (error) {
        next(handleError(500, error.message))
    }
    
}

export const getBlogsByCategory = async (req, res, next) => {
    try {
        let { categoryId } = req.params;
        const blogs = await Blog.find({ category: categoryId,status: 'published' })
            .populate("category", "name slug")
            .sort({ createdAt: -1 })
            .lean()
            .exec();

        res.status(200).json({
            success: true,
            blogs,
        });
    } catch (error) {
        next(handleError(500, error.message));
    }
};

export const getPendingBlogsByCategory = async (req, res, next) => {
    try {
        let { categoryId } = req.params;
        const blogs = await Blog.find({ category: categoryId,status: 'pending' })
            .populate("category", "name slug")
            .sort({ createdAt: -1 })
            .lean()
            .exec();

        res.status(200).json({
            success: true,
            blogs,
        });
    } catch (error) {
        next(handleError(500, error.message));
    }
};

export const totalCategory = async (req, res, next) => {
  try {
    const totalCategory = await Category.countDocuments();
    res.status(200).json({
        totalCategory,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

  export const search = async (req, res, next) =>{
    try {

      const { q } = req.params
      const category = await Category.find({name: {$regex : q, $options: 'i'}}).lean().exec()

      res.status(200).json({
        category,
      })
      
    } catch (error) {
      next(handleError(500, error.message))
    }
  }

  