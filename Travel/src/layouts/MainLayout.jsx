import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet, useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function MainLayout() {
  const location = useLocation();
  const user = useSelector((state) => state.user);

  const hideNavbarPaths = ['/','/blogs','/write','/login','/register',
    '/home','/account','/contact','/about','/write-blog','/your-blogs','/travel-packages','/gallery','/terms-condition'
  ];

  // Protect the /home route
  if (location.pathname === '/home' && !user.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Protect the /home route
  if (location.pathname === '/account' && !user.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  

  // check user login 
  if ((location.pathname === '/login' || location.pathname === '/register') && user.isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className='px-4 md:px-8 lg:px-16 xl:px-0'>
        {hideNavbarPaths.includes(location.pathname) && <Navbar />}
        <Outlet/>
    </div>
  )
}

export default MainLayout