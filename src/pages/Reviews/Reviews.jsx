import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReviews } from '../../features/Action/ReviewsAction/reviewsAction';
import { Car, Star, Calendar, MapPin, MessageSquare } from 'lucide-react';

const Reviews = () => {
    const dispatch = useDispatch();
    const { reviewInfo } = useSelector((state)=>state.reviews);

    useEffect(()=>{
        dispatch(getReviews())
    },[]);

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <Star
                key={index}
                className={`${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                size={16}
                fill={index < rating ? 'currentColor' : 'none'}
            />
        ));
    };
  return (
    <main className="flex-1 p-8 mt-16 ml-64">
      <div>Reviews</div>
      <div>
              <div className="grid gap-6">
                  {Array.isArray(reviewInfo) && reviewInfo?.map((review) => (
                      <div
                          key={review?._id}
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
                                          <p className="font-semibold text-gray-800">{review?.vehicleId?.vehicleName}</p>
                                          <div className="flex items-center space-x-1 mt-1">
                                              <Star className="text-yellow-400" size={16} />
                                              <span className="text-sm text-gray-600">
                                                  {review?.vehicleId?.ratings?.averageRating} ({review?.vehicleId?.ratings?.numberOfRatings} reviews)
                                              </span>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="w-full h-40 rounded-lg overflow-hidden">
                                      <img
                                          src={review?.vehicleId?.images[0]?.secure_url}
                                          alt={review?.vehicleId?.vehicleName}
                                          className="w-full h-full object-cover"
                                      />
                                  </div>
                              </div>

                              {/* Vehicle Details */}
                              <div className="space-y-4">
                                  <div className="flex items-center space-x-3">
                                      <div className="p-2 bg-blue-50 rounded-lg">
                                          <Calendar className="text-blue-600" size={20} />
                                      </div>
                                      <div>
                                          <p className="text-sm text-gray-500 font-medium">Service Details</p>
                                          <p className="font-semibold text-gray-800">
                                              {review?.vehicleId?.serviceType} - {review?.vehicleId?.vehicleClass}
                                          </p>
                                          <p className="text-sm text-gray-600">
                                              {review?.vehicleId?.vehicleType} · {review?.vehicleId?.passengerCapacity} Passengers · {review?.vehicleId?.luggageCapacity} Luggage
                                          </p>
                                      </div>
                                  </div>

                                  <div className="flex items-start space-x-3">
                                      <div className="p-2 bg-blue-50 rounded-lg mt-1">
                                          <MapPin className="text-blue-600" size={20} />
                                      </div>
                                      <div>
                                          <p className="text-sm text-gray-500 font-medium">Route</p>
                                          <p className="font-semibold text-gray-800">{review?.vehicleId?.pickupLocation}</p>
                                          <p className="text-sm text-gray-500 font-medium mt-2">to</p>
                                          <p className="font-semibold text-gray-800">{review?.vehicleId?.destination}</p>
                                      </div>
                                  </div>
                              </div>

                              {/* Review Details */}
                              <div className="space-y-4">
                                  <div className="flex items-start space-x-3">
                                      <div className="p-2 bg-blue-50 rounded-lg">
                                          <MessageSquare className="text-blue-600" size={20} />
                                      </div>
                                      <div>
                                          <p className="text-sm text-gray-500 font-medium">Review</p>
                                          <div className="flex space-x-1 my-1">
                                              {renderStars(review?.rating)}
                                          </div>
                                          <p className="text-gray-800">{review?.content}</p>
                                          <p className="text-sm text-gray-500 mt-2">
                                              Posted on {new Date(review?.createdAt).toLocaleDateString()}
                                          </p>
                                      </div>
                                  </div>

                                  <div className="flex items-center space-x-3">
                                      <div className="p-2 bg-blue-50 rounded-lg">
                                          <Car className="text-blue-600" size={20} />
                                      </div>
                                      <div>
                                          <p className="text-sm text-gray-500 font-medium">Price</p>
                                          <p className="font-semibold text-gray-800">${review?.vehicleId?.price}</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
      </div>
    </main>
  )
}

export default Reviews