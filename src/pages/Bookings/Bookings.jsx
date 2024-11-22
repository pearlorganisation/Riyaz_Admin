import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBookings } from '../../features/Action/Bookings/bookingsAction';
import { Car, Calendar, MapPin, CreditCard, User, Phone, Star } from 'lucide-react';

import Pagination from '../../components/Pagination/Pagination';

const Bookings = () => {
    const dispatch = useDispatch();
    const { bookingInfo, paginate } = useSelector((state)=>state.bookings);

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(
        paginate.total / paginate.limit
    )
    
    console.log(totalPages, '----------------total pages')
    
    const hanldePageChnage = (page)=>{
        if(page>0 && page <= totalPages){
            setCurrentPage(page)
        }
    }

    useEffect(()=>{
        dispatch(getBookings({page: currentPage}))
    },[dispatch, currentPage])
  return (
    <main className="flex-1 p-8 mt-16 ml-64 bg-red-100">
     <div>Bookings</div>
     <div>
              <div className="grid gap-6">
                  {Array.isArray(bookingInfo) && bookingInfo?.map((booking) => (
                      <div
                          key={booking._id}
                          className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
                      >
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {/* Vehicle Information */}
                              <div className="space-y-4">
                                  <div className="flex items-center space-x-3">
                                      <div className="p-2 bg-blue-50 rounded-lg">
                                          <Car className="text-blue-600" size={20} />
                                      </div>
                                      <div>
                                          <p className="text-sm text-gray-500 font-medium">Vehicle</p>
                                          <p className="font-semibold text-gray-800">{booking.vehicle.vehicleName}</p>
                                          <div className="flex items-center space-x-1 mt-1">
                                              <Star className="text-yellow-400" size={16} />
                                              <span className="text-sm text-gray-600">
                                                  {booking.vehicle.ratings.averageRating} ({booking.vehicle.ratings.numberOfRatings} reviews)
                                              </span>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="flex items-center space-x-3">
                                      <div className="p-2 bg-blue-50 rounded-lg">
                                          <Calendar className="text-blue-600" size={20} />
                                      </div>
                                      <div>
                                          <p className="text-sm text-gray-500 font-medium">Pickup Date & Time</p>
                                          <p className="font-semibold text-gray-800">
                                              {new Date(booking.bookingDate).toLocaleDateString()} at {booking.vehicle.pickupTime}
                                          </p>
                                      </div>
                                  </div>
                              </div>

                              {/* Location Information */}
                              <div className="space-y-4">
                                  <div className="flex items-start space-x-3">
                                      <div className="p-2 bg-blue-50 rounded-lg mt-1">
                                          <MapPin className="text-blue-600" size={20} />
                                      </div>
                                      <div>
                                          <p className="text-sm text-gray-500 font-medium">Pickup Location</p>
                                          <p className="font-semibold text-gray-800">{booking.vehicle.pickupLocation}</p>
                                          <p className="text-sm text-gray-500 font-medium mt-2">Destination</p>
                                          <p className="font-semibold text-gray-800">{booking.vehicle.destination}</p>
                                      </div>
                                  </div>
                              </div>

                              {/* Booking Details */}
                              <div className="space-y-4">
                                  <div className="flex items-center space-x-3">
                                      <div className="p-2 bg-blue-50 rounded-lg">
                                          <User className="text-blue-600" size={20} />
                                      </div>
                                      <div>
                                          <p className="text-sm text-gray-500 font-medium">Passenger</p>
                                          <p className="font-semibold text-gray-800">{booking.user.name}</p>
                                      </div>
                                  </div>

                                  <div className="flex items-center space-x-3">
                                      <div className="p-2 bg-blue-50 rounded-lg">
                                          <Phone className="text-blue-600" size={20} />
                                      </div>
                                      <div>
                                          <p className="text-sm text-gray-500 font-medium">Contact</p>
                                          <p className="font-semibold text-gray-800">{booking.user.mobileNumber}</p>
                                      </div>
                                  </div>

                                  <div className="flex items-center space-x-3">
                                      <div className="p-2 bg-blue-50 rounded-lg">
                                          <CreditCard className="text-blue-600" size={20} />
                                      </div>
                                      <div>
                                          <p className="text-sm text-gray-500 font-medium">Payment Status</p>
                                          <div className="flex items-center space-x-2">
                                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                  }`}>
                                                  {booking.paymentStatus.toUpperCase()}
                                              </span>
                                              <span className="font-semibold text-gray-800">${booking.totalPrice}</span>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
     </div>
     <Pagination paginate={paginate} currentPage={currentPage} totalPages={totalPages} handlePageClick={hanldePageChnage}/>
    </main>
  )
}

export default Bookings