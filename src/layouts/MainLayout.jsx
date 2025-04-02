import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div className='px-4 md:px-8 lg:px-16 xl:px-0'>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default MainLayout