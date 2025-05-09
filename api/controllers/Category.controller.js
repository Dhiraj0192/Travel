import { handleError } from "../helpers/handleError.js";
import Category from "../models/category.model.js";
import Blog from "../models/blog.model.js";
import SubCategory from "../models/subcategory.model.js";

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

export const addSubCategory = async (req,res,next) =>{

    try {

        const {name, slug , subcategory} = req.body
        const category = new SubCategory({
            name,slug,parentCategory:subcategory
        })

        await category.save()

        res.status(200).json({
            success: true,
            message: 'Sub Category added successfully.'
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
        
        const blogs = await Blog.find({ subcategory: categoryId,status: 'published' })
            .populate("subcategory", "name slug")
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

export const getBlogsByCategory2 = async (req, res, next) => {
    try {
        let { categoryId } = req.params;
        console.log(categoryId);
        
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        
        const blogs = await Blog.find({ subcategory: categoryId,status: 'published' })
            .populate("subcategory", "name slug")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .lean()
            .exec();

        console.log(blogs);
        

         const total = await Blog.countDocuments({subcategory: categoryId, status: "published" });

        res.status(200).json({
            success: true,
            blogs,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page),
        });
    } catch (error) {
        next(handleError(500, error.message));
    }
};

export const getPendingBlogsByCategory = async (req, res, next) => {
    try {
        let { categoryId } = req.params;
        const blogs = await Blog.find({ category: categoryId,status: 'pending' })
            .populate("subcategory", "name slug")
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

  export const getSubCategoriesByCategoryId = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const subcategories = await SubCategory.find({ parentCategory: categoryId }).lean().exec();

        if (!subcategories || subcategories.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No subcategories found for the given category ID."
            });
        }

        res.status(200).json({
            success: true,
            subcategories
        });
    } catch (error) {
        next(handleError(500, error.message));
    }
};



export const getCategoryTree = async (req, res) => {
    try {
        const categories = await Category.find().lean();
        const categoryTree = await Promise.all(categories.map(async (category) => {
            const subCategories = await SubCategory.find(
                { parentCategory: category._id },
                { name: 1, slug: 1 }
            );
            return {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                subCategories
            };
        }));
        res.status(200).json(categoryTree);
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Error fetching category tree',
            error: error.message
        });
    }
};
