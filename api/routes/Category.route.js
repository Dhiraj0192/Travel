import express from "express"
import { addCategory, deleteCategory, getAllCategory, showCategory, updateCategory, getBlogsByCategory, totalCategory, getPendingBlogsByCategory, search, getBlogsByCategory2, addSubCategory, getSubCategoriesByCategoryId, getCategoryTree } from "../controllers/Category.controller.js"


const CategoryRoute = express.Router()

CategoryRoute.post('/add',addCategory)
CategoryRoute.post('/add-sub',addSubCategory)
CategoryRoute.put('/update/:categoryid',updateCategory)
CategoryRoute.get('/show/:categoryid',showCategory)
CategoryRoute.delete('/delete/:categoryid',deleteCategory)
CategoryRoute.get('/all-category',getAllCategory)
CategoryRoute.get("/blogs/:categoryId", getBlogsByCategory)
CategoryRoute.get("/blogs2/:categoryId", getBlogsByCategory2)
CategoryRoute.get("/pending-blogs/:categoryId", getPendingBlogsByCategory)
CategoryRoute.get('/category-count',totalCategory)
CategoryRoute.get('/search/:q',search)
CategoryRoute.get('/subcategories/:categoryId', getSubCategoriesByCategoryId);

CategoryRoute.get('/tree', getCategoryTree);
export default CategoryRoute