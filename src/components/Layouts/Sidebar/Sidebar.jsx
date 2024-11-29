import React, { useState } from 'react'
 import { Link } from 'react-router-dom';

const Sidebar = () => {
  
   
  return (
      <div>
          <aside className="bg-gray-800 text-white w-64 py-8 px-4 fixed top-0 bottom-0 z-10">
              <div className="mb-8">
                  <h2 className="text-2xl font-bold">Riaz</h2>
              </div>
              <nav>

                  {/*-------------------Dashboard section------------------*/}
                  <div className="mb-4">
                      <Link to="/">
                          <div className="flex justify-between items-center cursor-pointer hover:text-gray-300">
                              <span>Dashboard</span>
                          </div>
                      </Link>


                  </div>

                  {/**-----------------------------Users Section---------------*/}
                  <div className="mb-4">
                      <Link to="users">
                          <div className="flex justify-between items-center cursor-pointer hover:text-gray-300">
                              <span>All Users</span>
                          </div>
                      </Link>
                  </div>
                 
                  {/*------------------------------Contact-------------------------------------*/}
                  <div className="mb-4">
                      <Link to="contacts">
                          <div className="flex justify-between items-center cursor-pointer hover:text-gray-300">
                              <span>Contacts</span>
                          </div>
                      </Link>
                  </div>

                 {/**------------------------------Bookings------------------------------------*/}
                  <div className="mb-4">
                      <Link to="bookings">
                          <div className="flex justify-between items-center cursor-pointer hover:text-gray-300">
                              <span>Bookings</span>
                          </div>
                      </Link>
                  </div>

                  {/**-----------------------------Reviews-------------------------------------*/}
                  <div className="mb-4">
                      <Link to="reviews">
                          <div className="flex justify-between items-center cursor-pointer hover:text-gray-300">
                              <span>Reviews</span>
                          </div>
                      </Link>
                  </div>

                  {/**-----------------------------Vehicles List-------------------------------------*/}
                  <div className="mb-4">
                      <Link to="vehicles">
                          <div className="flex justify-between items-center cursor-pointer hover:text-gray-300">
                              <span>Vehicle List</span>
                          </div>
                      </Link>
                  </div>

                  {/**-----------------------------Add Vehicles-------------------------------------*/}
                  <div className="mb-4">
                      <Link to="add-vehicle">
                          <div className="flex justify-between items-center cursor-pointer hover:text-gray-300">
                              <span>Add Vehicle</span>
                          </div>
                      </Link>
                  </div>
              </nav>
          </aside>
      </div>
  )
}

export default Sidebar