import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import HomePage from './routes/HomePage.jsx';

import LoginPage from './routes/LoginPage.jsx';
import RegisterPage from './routes/RegisterPage.jsx';
import SinglePostPage from './routes/SinglePostPage.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import { ClerkProvider } from '@clerk/clerk-react';
import MainPage from './routes/MainPage.jsx';
import AdminLoginPage from './routes/adminPages/AdminLogin.jsx';
import AdminRegisterPage from './routes/adminPages/AdminRegister.jsx';
import Dashboard from './routes/adminPages/Dashboard.jsx';
import Posts from './routes/adminPages/Posts.jsx';
import Categories from './routes/adminPages/Categories.jsx';
import CommentsDashboard from './routes/adminPages/Comment.jsx';
import { ToastContainer } from 'react-toastify';

import { GoogleOAuthProvider} from '@react-oauth/google'

import { Provider} from "react-redux"
import { persistor,store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import AccountPage from './routes/AccountPage';
import AddBlog from './routes/adminPages/AddBlog';
import EditBlog from './routes/adminPages/EditBlog';
import BlogPage from './routes/BlogPage.jsx';
import Users from './routes/adminPages/Users';
import WriteBlogPage from './routes/WriteBlogPage';
import PendingPosts from './routes/adminPages/PendingBlog';
import UserBlogPage from './routes/UserBlogs';
import UserEditPage from './routes/UserEditPage';
import TravelBookingPage from './routes/TravelBookingPage';
import AddPackage from './routes/adminPages/AddPackage';
import Packages from './routes/adminPages/Packages';
import EditPackage from './routes/adminPages/EditPackage';
import AddAdvertise from './routes/adminPages/AddAdvertise';
import EditAdvertise from './routes/adminPages/EditAdvertise';
import GalleryPage from './routes/GalleryPage';
import TermsConditionPage from './routes/TermsConditionPage';



const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const router = createBrowserRouter([
  {
    element : <MainLayout/>,
    children : [
      {
        path: "/",
        element: <HomePage/>
      },
      {
        path: "/blogs",
        element : <BlogPage/>
      },
      {
        path: "/your-blogs",
        element : <UserBlogPage/>
      },
      {
        path: "/blog/:category/:post",
        element : <SinglePostPage/>
      },
      {
        path: "/write-blog",
        element : <WriteBlogPage/>
      },
      {
        path: "/edit-user-blog/:blog_id",
        element : <UserEditPage/>
      },
      {
        path: "/login",
        element : <LoginPage/>
      },
      {
        path: "/register",
        element : <RegisterPage/>
      },
      {
        path: "/home",
        element : <MainPage/>
      },
      {
        path: "/account",
        element : <AccountPage/>
      },
      {
        path: "/gallery",
        element : <GalleryPage/>
      },
      {
        path: "/travel-packages",
        element : <TravelBookingPage/>
      },
      {
        path: "/terms-condition",
        element : <TermsConditionPage/>
      },

      {
        path: "/admin-login",
        element : <AdminLoginPage/>
      },
      {
        path: "/admin-register",
        element : <AdminRegisterPage/>
      },
      {
        path: "/admin-dashboard",
        element : <Dashboard/>
      },
      {
        path: "/admin-posts",
        element : <Posts/>
      },
      {
        path: "/admin-pending-posts",
        element : <PendingPosts/>
      },
      {
        path: "/admin-users",
        element : <Users/>
      },
      {
        path: "/admin-add-blog",
        element : <AddBlog/>
      },
      {
        path: "/admin-blog/edit/:blog_id",
        element : <EditBlog/>
      },
      {
        path: "/admin-package/edit/:package_id",
        element : <EditPackage/>
      },
      
      {
        path: "/admin-categories",
        element : <Categories/>
      },
      {
        path: "/admin-categories/edit/:category_id",
        element : <Categories/>
      },
      {
        path: "/admin-comments",
        element : <CommentsDashboard/>
      },
      {
        path: "/admin-add-package",
        element : <AddPackage/>
      },
      {
        path: "/admin-packages",
        element : <Packages/>
      },
      {
        path: "/admin-add-advertise",
        element : <AddAdvertise/>
      },
      {
        path: "/admin-advertise/edit/:advertise_id",
        element : <EditAdvertise/>
      },
      
      
      
    ],
  },
])

const CLIENT_ID = "324192363608-0p4jtq61h643ptasd9podhtrgmf3v1kr.apps.googleusercontent.com"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading....</div>}
      persistor={persistor}>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
    <ToastContainer/>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <RouterProvider router={router} />
    </ClerkProvider>
    </GoogleOAuthProvider>
    </PersistGate>
    </Provider>
    
  </StrictMode>,
)
