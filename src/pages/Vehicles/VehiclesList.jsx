import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllVehicles, removeVehicle } from '../../features/Action/Vehicles/vehicleAction';
import { Star, Briefcase, Users, Clock, MapPin, Trash } from 'lucide-react';
import ConfirmDeleteModal from '../../components/Modals/ConfirmDeleteModal';
import Pagination from '../../components/Pagination/Pagination';
const VehicleCard = ({ vehicle , currentPage}) => {
    const dispatch = useDispatch()
    /** states for managing confirm delete */
    const [selctedVehicleId, setSelectedVehicleId] = useState(null)
    const [showDeleteModal,setDeleteModal] = useState(false)

    // handle for opening the popup delete modal //
    const handleOpenModal = (id)=>{
        setSelectedVehicleId(id)
        setDeleteModal(true)
    }

    const confirmDelete =()=>{
        dispatch(removeVehicle(selctedVehicleId))
        dispatch(getAllVehicles({page:currentPage}))
        setDeleteModal(false);
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            {/* Image */}
             <div className="mb-4 h-48 overflow-hidden rounded-lg">
                <div className='flex justify-end'><button onClick={()=>handleOpenModal(vehicle?._id)}><Trash size={20} color='red' /></button></div>
               
                <img
                    src={vehicle.images[0]?.secure_url || '/placeholder-image.png'}
                    alt={vehicle.vehicleName}
                    className="w-full h-full object-cover"
                />
                
            </div>

            {/* Vehicle Name and Rating */}
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-800">{vehicle.vehicleName}</h3>
                <div className="flex items-center text-yellow-500">
                    <Star size={16} fill="currentColor" className="mr-1" />
                    <span>{vehicle.ratings.averageRating.toFixed(1)} ({vehicle.ratings.numberOfRatings})</span>
                </div>
            </div>

            {/* Vehicle Details */}
            <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="flex items-center text-gray-600">
                    <Users size={16} className="mr-2 text-blue-500" />
                    <span>{vehicle.passengerCapacity} Passengers</span>
                </div>
                <div className="flex items-center text-gray-600">
                    <Briefcase size={16} className="mr-2 text-green-500" />
                    <span>{vehicle.luggageCapacity} Bags</span>
                </div>
                <div className="flex items-center text-gray-600">
                    <Clock size={16} className="mr-2 text-purple-500" />
                    <span>{vehicle.pickupTime}</span>
                </div>
                <div className="flex items-center text-gray-600 font-semibold">
                    <span>AED {vehicle.price}</span>
                </div>
            </div>

            {/* Location Details */}
            <div className="border-t pt-3">
                <div className="flex items-center text-gray-500 mb-2">
                    <MapPin size={16} className="mr-2 text-red-500" />
                    <span className="text-sm truncate">{vehicle.pickupLocation}</span>
                </div>
                <div className="flex items-center text-gray-500">
                    <MapPin size={16} className="mr-2 text-green-500" />
                    <span className="text-sm truncate">{vehicle.destination}</span>
                </div>
            </div>
            {/** confirm modal */}
            {showDeleteModal && <>
            <ConfirmDeleteModal confirmDelete={confirmDelete} setShowDeleteModal={setDeleteModal} />
            </>}
        </div>
    );
};

const VehiclesList = () => {
    const dispatch = useDispatch();
    const { vehiclesData, paginationData } = useSelector((state) => state.vehicles);
   /**-------for managing current page--------------*/
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(
        paginationData?.total / paginationData?.pageSize
    )
 const handlePageChange=(page)=>{
     if (page > 0 && page <= totalPages) {
         setCurrentPage(page)
     }
 }
    useEffect(() => {
        dispatch(getAllVehicles({page: currentPage}));
    }, [dispatch, currentPage]);

    return (
        <main className="flex-1 p-8 mt-16 ml-64">
            <h1 className="text-2xl font-bold mb-6">Available Vehicles</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.isArray(vehiclesData) && vehiclesData?.map((vehicle) => (
                    <VehicleCard key={vehicle._id} currentPage={currentPage} vehicle={vehicle} />
                ))}
            </div>
            <Pagination paginate={paginationData} currentPage={currentPage} totalPages={totalPages} handlePageClick={handlePageChange} />
            {vehiclesData?.length === 0 && (
                <div className="text-center text-gray-500 mt-10">
                    No vehicles available
                </div>
            )}
        </main>
    );
};

export default VehiclesList