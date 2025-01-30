import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'

const Body = () => {
  return (
    <div>
        <NavBar/>
        <Outlet/>
        <h1 className="text-3xl font-bold">Hello World</h1>
        <Footer/>
    </div>
  )
}

export default Body