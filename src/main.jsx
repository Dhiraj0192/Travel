import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import HomePage from './routes/HomePage.jsx';
import PostListPage from './routes/PostListPage.jsx';
import Write from './routes/Write.jsx';
import LoginPage from './routes/LoginPage.jsx';
import RegisterPage from './routes/RegisterPage.jsx';
import SinglePostPage from './routes/SinglePostPage.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import { ClerkProvider } from '@clerk/clerk-react';
import MainPage from './routes/MainPage.jsx';
import AdminLoginPage from './routes/adminPages/AdminLogin.jsx';
import AdminRegisterPage from './routes/adminPages/AdminRegister.jsx';
import Dashboard from './routes/adminPages/Dashboard.jsx';


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
        path: "/posts",
        element : <PostListPage/>
      },
      {
        path: "/:slug",
        element : <SinglePostPage/>
      },
      {
        path: "/write",
        element : <Write/>
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
      
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>,
)
