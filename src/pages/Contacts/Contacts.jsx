import React, { useEffect, useState } from 'react'
import { Clock, Mail, MapPin, MessageSquare, User, Users, PhoneCall } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux'
import { getContacts } from '../../features/Action/Contacts/contactAction';
import Pagination from '../../components/Pagination/Pagination';

const Contacts = () => {
    const dispatch = useDispatch();
    const { contactsInfo, paginate } = useSelector((state)=> state.contacts)
    
    //state for setting the page
    const [currentPage, setCurrentPage] = useState(1);
    // calculate total pages
    const totalPages = Math.ceil(
        paginate.count / paginate.limit
    )
    console.log(totalPages,'-----------------------')
    
    /**handle for selecting page*/
    const handlePageClick = (page)=>{
        if(page >0 && page <= totalPages){
            setCurrentPage(page)
        }
    }


    useEffect(()=>{
        dispatch(getContacts({page: currentPage}))
    },[dispatch, currentPage]);


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
  return (
      <main className="flex-1 p-8 mt-16 ml-64 bg-red-100">
          <div className='text-4xl font-semibold p-2'>Contacts</div>
          <div>

              <div className="grid gap-6">
                  {Array.isArray(contactsInfo) && contactsInfo?.map((contact) => (
                      <div
                          key={contact?._id}
                          className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
                      >
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              <div className="space-y-4">
                                  <div className="flex items-center space-x-3">
                                      <div className="p-2 bg-blue-50 rounded-lg">
                                          <User className="text-blue-600" size={20} />
                                      </div>
                                      <div>
                                          <p className="text-sm text-gray-500 font-medium">Name</p>
                                          <p className="font-semibold text-gray-800">{contact?.name}</p>
                                      </div>
                                  </div>

                                  <div className="flex items-center space-x-3">
                                      <div className="p-2 bg-blue-50 rounded-lg">
                                          <Mail className="text-blue-600" size={20} />
                                      </div>
                                      <div>
                                          <p className="text-sm text-gray-500 font-medium">Email</p>
                                          <p className="font-semibold text-gray-800">{contact?.email}</p>
                                      </div>
                                  </div>

                                  <div className="flex items-center space-x-3">
                                      <div className="p-2 bg-blue-50 rounded-lg">
                                          <PhoneCall className="text-blue-600" size={20} />
                                      </div>
                                      <div>
                                          <p className="text-sm text-gray-500 font-medium">Contact No</p>
                                          <p className="font-semibold text-gray-800">{contact?.phoneNumber}</p>
                                      </div>
                                  </div>
                              </div>

                            

                              <div className="space-y-4">
                                  

                                  <div className="flex items-start space-x-3">
                                      <div className="p-2 bg-blue-50 rounded-lg mt-1">
                                          <MessageSquare className="text-blue-600" size={20} />
                                      </div>
                                      <div>
                                          <p className="text-sm text-gray-500 font-medium">Message</p>
                                          <p className="font-semibold text-gray-800 break-words">{contact.message}</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
           
          <Pagination
              paginate={paginate}
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageClick={handlePageClick}
          />
      </main>
   )
}

export default Contacts