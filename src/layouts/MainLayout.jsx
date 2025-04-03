import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet, useLocation } from 'react-router-dom'

function MainLayout() {
  const location = useLocation();
  const hideNavbarPaths = ['/admin-login','/admin-register','/admin-dashboard'];
  return (
    
    <div className='px-4 md:px-8 lg:px-16 xl:px-0'>
        {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
        <Outlet/>
    </div>
  )
}

export default MainLayout