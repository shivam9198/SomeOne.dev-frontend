import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

function Body() {
  return (
   <>
   <Navbar/>
   <Outlet/>

   </>
  )
}

export default Body

// outlet is used to render the child components of the parent component