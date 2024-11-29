import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllVehicles } from '../../features/Action/Vehicles/vehicleAction';
import { Star, Briefcase, Users, Clock, MapPin } from 'lucide-react';
const VehicleCard = ({ vehicle }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            {/* Image */}
            <div className="mb-4 h-48 overflow-hidden rounded-lg">
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
                <div className="flex items-center text-gray-600 font-semibold text-blue-600">
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
        </div>
    );
};

const VehiclesList = () => {
    const dispatch = useDispatch();
    const { vehiclesData } = useSelector((state) => state.vehicles);

    useEffect(() => {
        dispatch(getAllVehicles());
    }, [dispatch]);

    return (
        <main className="flex-1 p-8 mt-16 ml-64">
            <h1 className="text-2xl font-bold mb-6">Available Vehicles</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {vehiclesData?.map((vehicle) => (
                    <VehicleCard key={vehicle._id} vehicle={vehicle} />
                ))}
            </div>
            {vehiclesData?.length === 0 && (
                <div className="text-center text-gray-500 mt-10">
                    No vehicles available
                </div>
            )}
        </main>
    );
};

export default VehiclesList