import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'

const Layout = () => {
  return (
      <div className="flex h-screen">
              <Sidebar />
          <div className="flex-1 flex flex-col">
              <Header />
              <Outlet />
          </div>
      </div>
  )
}

export default Layout