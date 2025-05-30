import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet, useLocation, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { setUser } from '../redux/user/user.slice.js'

function MainLayout() {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const hideNavbarPaths = ['/','/blogs','/write','/login','/register',
    '/home','/account','/contact','/about','/write-blog','/your-blogs','/travel-packages','/gallery','/terms-condition','/privacy-policy','/videos'
  ];

 
  

  // protect home page
  const params = new URLSearchParams(window.location.search);
  const urlToken = params.get('token');
  // Store token in localStorage if present in URL
  if (urlToken) {
    localStorage.setItem('access_token', urlToken);
  }
  // Retrieve token from localStorage
  const storedToken = localStorage.getItem('access_token');
  if (location.pathname === '/home' && !storedToken && !user.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // check user login 
  if ((location.pathname === '/login' || location.pathname === '/register') && user.isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  if (location.pathname === '/account' && !user.isLoggedIn && !storedToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className='  lg:px-16 xl:px-0 '>
        {hideNavbarPaths.includes(location.pathname) && <div className='sticky -top-20 z-50'>
          <Navbar />
        </div> }
        <Outlet/>
    </div>
  )
}

export default MainLayout