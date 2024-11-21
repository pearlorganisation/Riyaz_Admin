import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  
    const [isContactOpen, setIsContactOpen] = useState(false);
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
                  {/*------------------------------Bookings------------------------------------*/}
                  {/* <div className="mb-4">
                        <div className="flex justify-between items-center cursor-pointer hover:text-gray-300">
                        <Link to="bookings"><span>Bookings</span></Link> 
                        </div>
                    </div> */}

                  {/*------------------------------Contact-------------------------------------*/}
                  <div className="mb-4">
                      <Link to="contacts">
                          <div className="flex justify-between items-center cursor-pointer hover:text-gray-300">
                              <span>Contacts</span>
                          </div>
                      </Link>


                  </div>

              </nav>
          </aside>
      </div>
  )
}

export default Sidebar