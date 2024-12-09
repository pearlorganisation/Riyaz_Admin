import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getVehicleById } from '../../features/Action/Vehicles/vehicleAction'
import { useForm } from 'react-hook-form'


/** for service Type */
const ServiceType = [
    {
        id: 1,
        serviceName: "Shared"
    },
    {
        id: 2,
        serviceName: "Private"
    },
    {
        id: 3,
        serviceName: "Rideshare"
    }
]
/** for vehicleType */
const VehicleType = [
    {
        id: 1,
        vehicleName: "Van"
    },
    {
        id: 2,
        vehicleName: "Bus"
    },
    {
        id: 3,
        vehicleName: "SUV"
    },
    {
        id: 4,
        vehicleName: "Limousine"
    },
    {
        id: 5,
        vehicleName: "Sedan"
    },
]
/** for vehicle class */
const VehicleClass = [
    {
        id: 1,
        className: "Economy"
    },
    {
        id: 2,
        className: "Business"
    },
    {
        id: 3,
        className: "Luxury"
    }
]


const UpdateVehicle = () => {
    const { id }= useParams()
    const dispatch = useDispatch()
    const { singleVehicle } = useSelector((state)=> state.vehicles);
    const { register, handleSubmit, watch, reset,formState:{errors}} = useForm()

    const [previewImages, setPreviewImages] = useState([]);
    const [currentImages, setCurrentImages] = useState([]);

    useEffect(()=>{
        dispatch(getVehicleById(id))
    },[id])

    useEffect(() => {
        if (singleVehicle) {
            reset({
                vehicleName: singleVehicle.vehicleName,
                serviceType: singleVehicle.serviceType,
                vehicleType: singleVehicle.vehicleType,
                vehicleClass: singleVehicle.vehicleClass,
                passengerCapacity: singleVehicle.passengerCapacity,
                luggageCapacity: singleVehicle.luggageCapacity,
                price: singleVehicle.price,
                pickupLocation: singleVehicle.pickupLocation,
                destination: singleVehicle.destination,
                'ratings.averageRating': singleVehicle.ratings.averageRating,
                'ratings.numberOfRatings': singleVehicle.ratings.numberOfRatings

             });
            setCurrentImages(singleVehicle.images || []);
        }
    }, [singleVehicle, reset]);

    const onSubmit = (data) => {
        // You'll handle the update logic in the parent component
        console.log('Updated Vehicle Data:', data);
    };

    // Loading state
    if (!singleVehicle) {
        return <div>Loading...</div>;
    }

   return (
       <main className="flex-1 p-8 mt-16 ml-64">
           <div className="w-full mx-auto bg-white p-8 rounded-lg shadow-md">
               <h2 className="text-2xl font-bold mb-6">Update Vehicle</h2>
               <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                   {/* Vehicle Name */}
                   <div>
                       <label className="block text-sm font-medium text-gray-700">Vehicle Name</label>
                       <input
                           type="text"
                           {...register('vehicleName', {
                               required: 'Vehicle Name is required',
                               minLength: { value: 3, message: 'Vehicle Name must be at least 3 characters' }
                           })}
                           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                       />
                       {errors.vehicleName && (
                           <p className="text-red-500 text-sm mt-1">{errors.vehicleName.message}</p>
                       )}
                   </div>

                   {/* Service Type */}
                   <div>
                       <label className="block text-sm font-medium text-gray-700">Service Type</label>
                       <select
                           {...register('serviceType', { required: 'Service Type is required' })}
                           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                       >
                           {ServiceType.map((service) => (
                               <option key={service.id} value={service.serviceName}>
                                   {service.serviceName}
                               </option>
                           ))}
                       </select>
                       {errors.serviceType && (
                           <p className="text-red-500 text-sm mt-1">{errors.serviceType.message}</p>
                       )}
                   </div>

                   {/* Vehicle Type */}
                   <div>
                       <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                       <select
                           {...register('vehicleType', { required: 'Vehicle Type is required' })}
                           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                       >
                           {VehicleType.map((vehicle) => (
                               <option key={vehicle.id} value={vehicle.vehicleName}>
                                   {vehicle.vehicleName}
                               </option>
                           ))}
                       </select>
                       {errors.vehicleType && (
                           <p className="text-red-500 text-sm mt-1">{errors.vehicleType.message}</p>
                       )}
                   </div>

                   {/* Vehicle Class */}
                   <div>
                       <label className="block text-sm font-medium text-gray-700">Vehicle Class</label>
                       <select
                           {...register('vehicleClass', { required: 'Vehicle Class is required' })}
                           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                       >
                           {VehicleClass.map((vehicleClass) => (
                               <option key={vehicleClass.id} value={vehicleClass.className}>
                                   {vehicleClass.className}
                               </option>
                           ))}
                       </select>
                       {errors.vehicleClass && (
                           <p className="text-red-500 text-sm mt-1">{errors.vehicleClass.message}</p>
                       )}
                   </div>

                   {/* Passenger Capacity */}
                   <div>
                       <label className="block text-sm font-medium text-gray-700">Passenger Capacity</label>
                       <input
                           type="number"
                           {...register('passengerCapacity', {
                               required: 'Passenger Capacity is required',
                               min: { value: 1, message: 'Minimum 1 passenger' },
                               max: { value: 50, message: 'Maximum 50 passengers' }
                           })}
                           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                       />
                       {errors.passengerCapacity && (
                           <p className="text-red-500 text-sm mt-1">{errors.passengerCapacity.message}</p>
                       )}
                   </div>

                   {/* Luggage Capacity */}
                   <div>
                       <label className="block text-sm font-medium text-gray-700">Luggage Capacity</label>
                       <input
                           type="number"
                           {...register('luggageCapacity', {
                               required: 'Luggage Capacity is required',
                               min: { value: 1, message: 'Minimum 1 luggage' },
                               max: { value: 50, message: 'Maximum 50 luggage items' }
                           })}
                           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                       />
                       {errors.luggageCapacity && (
                           <p className="text-red-500 text-sm mt-1">{errors.luggageCapacity.message}</p>
                       )}
                   </div>

                   {/* Price */}
                   <div>
                       <label className="block text-sm font-medium text-gray-700">Price</label>
                       <input
                           type="number"
                           {...register('price', {
                               required: 'Price is required',
                               min: { value: 0, message: 'Price cannot be negative' }
                           })}
                           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                       />
                       {errors.price && (
                           <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                       )}
                   </div>

                   {/* Pickup Location */}
                   <div>
                       <label className="block text-sm font-medium text-gray-700">Pickup Location</label>
                       <input
                           type="text"
                           {...register('pickupLocation', {
                               required: 'Pickup Location is required',
                               minLength: { value: 2, message: 'Location must be at least 2 characters' }
                           })}
                           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                       />
                       {errors.pickupLocation && (
                           <p className="text-red-500 text-sm mt-1">{errors.pickupLocation.message}</p>
                       )}
                   </div>

                   {/* Destination */}
                   <div>
                       <label className="block text-sm font-medium text-gray-700">Destination</label>
                       <input
                           type="text"
                           {...register('destination', {
                               required: 'Destination is required',
                               minLength: { value: 2, message: 'Destination must be at least 2 characters' }
                           })}
                           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                       />
                       {errors.destination && (
                           <p className="text-red-500 text-sm mt-1">{errors.destination.message}</p>
                       )}
                   </div>
                   <div>
                       <label className="block text-sm font-medium text-gray-700">Average Rating</label>
                       <input
                           type="number"
                           step="0.1"
                           {...register('ratings.averageRating', {
                               required: 'Average Rating is required',
                               min: { value: 0, message: 'Rating must be at least 0' },
                               max: { value: 5, message: 'Rating cannot exceed 5' }
                           })}
                           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                       />
                       {errors.ratings?.averageRating && (
                           <p className="text-red-500 text-sm mt-1">{errors.ratings.averageRating.message}</p>
                       )}
                   </div>

                   {/* Number of Ratings */}
                   <div>
                       <label className="block text-sm font-medium text-gray-700">Number of Ratings</label>
                       <input
                           type="number"
                           {...register('ratings.numberOfRatings', {
                               required: 'Number of Ratings is required',
                               min: { value: 0, message: 'Number of ratings cannot be negative' }
                           })}
                           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                       />
                       {errors.ratings?.numberOfRatings && (
                           <p className="text-red-500 text-sm mt-1">{errors.ratings.numberOfRatings.message}</p>
                       )}
                   </div>
                   {/* Submit Button */}
                   <div className="pt-4">
                       <button
                           type="submit"
                           className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                       >
                           Update Vehicle
                       </button>
                   </div>
               </form>
           </div>
       </main>
  )
}

export default UpdateVehicle