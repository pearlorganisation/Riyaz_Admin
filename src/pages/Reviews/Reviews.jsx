import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReviews } from '../../features/Action/ReviewsAction/reviewsAction';
import { Car, Star, Calendar, MapPin, MessageSquare } from 'lucide-react';
import { deleteReview } from '../../features/Action/ReviewsAction/reviewsAction';
import { MdOutlineDelete } from "react-icons/md";
import ConfirmDeleteModal from "../../components/Modals/ConfirmDeleteModal"
import { useLocation, useNavigate } from 'react-router-dom';
// filter for reviews by stars
const ratingsTypes = [
    {
        id: 1,
        stars: 4,
    },
    {
        id: 2,
        stars: 3,
    },
    {
        id: 3,
        stars: 2,
    },
];

const sortTypes = [
    {
        id: 1,
        value:"highest",
    },
    {
        id: 2,
        value:"newest",
    },
    {
        id: 3,
        value: "oldest",
    },
];


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


    /**------------------------------------------Section of filters--------------------------------------------- */

    // states for managing the rating type
    const navigate = useNavigate()
    const location = useLocation()
    const [selectedRatingTypes, setSelectedRatingTypes] = useState([]); // for selecting vehicles on ratings type
    
    // For Filtering based on the newest, oldest and highest 
    const [sortBy, setSortBy] = useState([])
    
    // handle for filtering based on rating type
   const handleSelect = (rating)=>{
    let updatedRating = [...selectedRatingTypes];
    if(updatedRating.includes(rating)){
        updatedRating = updatedRating.filter((rt)=> rt !== rating)
    }else{
        updatedRating.push(rating)
    }
        setSelectedRatingTypes(updatedRating)
   }

   // select based on the newest and oldest and highest

   const handleSortBy=(sortValue)=>{
    setSortBy(sortValue);
   }
   useEffect(()=>{
    dispatch(getReviews({
        sortBy:sortBy
    }))
   },[sortBy])
  
   console.log("============sortby value",sortBy)
   useEffect(()=>{
    const searchParams = new URLSearchParams(location.search) ;
    let existingRating = searchParams.getAll("rating")
     
    if(selectedRatingTypes.sort().join(",") !== existingRating.sort().join(",")){
        searchParams.delete("rating")
        selectedRatingTypes.forEach((rating)=>
        searchParams.append("rating",rating));

      navigate({
        pathname: location.pathname,
        search: searchParams.toString()
      },{
        replace: true
      })
    }
   // dispatching with the search params
   dispatch(getReviews({
    rating: selectedRatingTypes,
     
   }))
   },[navigate, location,dispatch, selectedRatingTypes])


/**--------------------------------------------deleting review logic----------------------------------------------------- */
// state for holding the id of review and opening the modal
const [reviewId, setReviewId] = useState(null);
const [openModal, setOpenModal] = useState(false);

const handleDelete =(id)=>{
    setReviewId(id);
    setOpenModal(true)
}

const confirmDelete = ()=>{
    dispatch(deleteReview(reviewId));
    dispatch(getReviews());
    setOpenModal(false)
}

  return (
      <main className="flex-1 p-8 mt-16 ml-64">
          <div className="flex justify-between items-start mb-8">
              <h2 className="text-2xl font-semibold">Reviews</h2>

              {/* Filters Container */}
              <div className="flex gap-6">
                  {/* Checkboxes Container */}
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm font-medium text-gray-700 mb-2">Filter by Rating</p>
                      <div className="space-y-2">
                          {ratingsTypes.map((rating) => (
                              <label
                                  key={rating.id}
                                  className="flex items-center cursor-pointer group"
                              >
                                  <input
                                      type="checkbox"
                                      name="myRatingType"
                                      value={parseInt(rating.stars)}
                                      onChange={() => handleSelect(parseInt(rating.stars))}
                                      defaultChecked={false}
                                      className="w-4 h-4 mr-2 text-blue-600 border-gray-300 rounded focus:ring-blue-500 group-hover:border-blue-500"
                                  />
                                  <span className="text-sm text-gray-600">{rating.stars} Stars and More</span>
                              </label>
                          ))}
                      </div>
                  </div>

                  {/* Sort Dropdown */}
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm font-medium text-gray-700 mb-2">Sort By</p>
                      <select
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          onChange={(e) => handleSortBy(e.target.value)}
                      >
                          <option value="">Select an option</option>
                          {sortTypes.map((val) => (
                              <option key={val.id} value={val.value}>
                                  {val.value} Stars and More
                              </option>
                          ))}
                      </select>
                  </div>
              </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid gap-6">
              {Array.isArray(reviewInfo) && reviewInfo?.map((review) => (
                  <div
                      key={review?._id}
                      className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
                  >
                      <div className="flex w-full justify-end">
                          <button
                              className="text-red-500 hover:text-red-800"
                              onClick={() => handleDelete(review?._id)}
                          >
                              <MdOutlineDelete size={24} />
                          </button>
                      </div>

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

          {openModal && (
              <ConfirmDeleteModal confirmDelete={confirmDelete} setShowDeleteModal={setOpenModal} />
          )}
      </main>
  )
}

export default Reviews