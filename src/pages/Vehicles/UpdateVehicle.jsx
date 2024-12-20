import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getVehicleById, updateVehicleById } from '../../features/Action/Vehicles/vehicleAction'
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
    const { id } = useParams()
    const dispatch = useDispatch()
    const { singleVehicle } = useSelector((state) => state.vehicles);
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [selectedImages, setSelectedImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);

    useEffect(() => {
        dispatch(getVehicleById(id))
    }, [id])

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
                'ratings.averageRating': singleVehicle?.ratings?.averageRating ?? "",
                'ratings.numberOfRatings': singleVehicle?.ratings?.numberOfRatings ?? ""
            });

            // Set existing images from singleVehicle
            // if (singleVehicle.images) {
            //     setSelectedImages(singleVehicle.images.map((image) => image.secure_url));
            // }
        }
    }, [singleVehicle, reset]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages(files);
    };

    const onSubmit = (data) => {
     
       const formData = {...data, images:selectedImages, id:id}
        // Dispatch the action with the FormData object
        dispatch(updateVehicleById(formData));

        console.log('Updated Vehicle Data:', formData);
    };

    // Loading state
    if (!singleVehicle) {
        return <div>Loading...</div>;
    }

    return (
        <main className="flex-1 p-8 mt-16 ml-64">
            <div className="w-full mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Update Vehicle</h2>
                    <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold">Current Rating:</span>
                        <span className="text-yellow-500 text-xl">
                            {singleVehicle?.ratings?.averageRating.toFixed(1)}
                        </span>
                        <span className="text-gray-500">
                            ({singleVehicle?.ratings?.numberOfRatings} ratings)
                        </span>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Vehicle Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Vehicle Name</label>
                            <input
                                type="text"
                                {...register('vehicleName', { required: 'Vehicle Name is required' })}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                            />
                            {errors.vehicleName && <p className="text-red-500 text-sm">{errors.vehicleName.message}</p>}
                        </div>

                        {/* Service Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Service Type</label>
                            <select
                                {...register('serviceType', { required: 'Service Type is required' })}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                            >
                                {ServiceType?.map((type) => (
                                    <option key={type.id} value={type.serviceName}>
                                        {type.serviceName}
                                    </option>
                                ))}
                            </select>
                            {errors.serviceType && <p className="text-red-500 text-sm">{errors.serviceType.message}</p>}
                        </div>

                        {/* Vehicle Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                            <select
                                {...register('vehicleType', { required: 'Vehicle Type is required' })}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                            >
                                {VehicleType?.map((type) => (
                                    <option key={type.id} value={type.vehicleName}>
                                        {type.vehicleName}
                                    </option>
                                ))}
                            </select>
                            {errors.vehicleType && <p className="text-red-500 text-sm">{errors.vehicleType.message}</p>}
                        </div>

                        {/* Vehicle Class */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Vehicle Class</label>
                            <select
                                {...register('vehicleClass', { required: 'Vehicle Class is required' })}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                            >
                                {VehicleClass?.map((cls) => (
                                    <option key={cls.id} value={cls.className}>
                                        {cls.className}
                                    </option>
                                ))}
                            </select>
                            {errors.vehicleClass && <p className="text-red-500 text-sm">{errors.vehicleClass.message}</p>}
                        </div>

                        {/* Passenger Capacity */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Passenger Capacity</label>
                            <input
                                type="number"
                                {...register('passengerCapacity', {
                                    required: 'Passenger Capacity is required',
                                    min: { value: 1, message: 'Minimum 1 passenger' }
                                })}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                            />
                            {errors.passengerCapacity && <p className="text-red-500 text-sm">{errors.passengerCapacity.message}</p>}
                        </div>

                        {/* Luggage Capacity */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Luggage Capacity</label>
                            <input
                                type="number"
                                {...register('luggageCapacity', {
                                    required: 'Luggage Capacity is required',
                                    min: { value: 0, message: 'Minimum 0 luggage' }
                                })}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                            />
                            {errors.luggageCapacity && <p className="text-red-500 text-sm">{errors.luggageCapacity.message}</p>}
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price</label>
                            <input
                                type="number"
                                step="0.01"
                                {...register('price', {
                                    required: 'Price is required',
                                    min: { value: 0, message: 'Price must be positive' }
                                })}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                            />
                            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                        </div>

                        {/* Pickup Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Pickup Location</label>
                            <input
                                type="text"
                                {...register('pickupLocation', { required: 'Pickup Location is required' })}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                            />
                            {errors.pickupLocation && <p className="text-red-500 text-sm">{errors.pickupLocation.message}</p>}
                        </div>

                        {/* Destination */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Destination</label>
                            <input
                                type="text"
                                {...register('destination', { required: 'Destination is required' })}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                            />
                            {errors.destination && <p className="text-red-500 text-sm">{errors.destination.message}</p>}
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Vehicle Images</label>
                        <input
                            type="file"
                            id="images"
                            multiple
                            accept="image/*"
                            {...register('images')}
                            onChange={handleImageUpload}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        />
                    </div>

                    {/* Current and New Images Preview */}
                    <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Images</h3>
                        <div className="flex space-x-2 overflow-x-auto">
                            {selectedImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Vehicle image ${index + 1}`}
                                    className="w-24 h-24 object-cover rounded-md"
                                />
                            ))}
                        </div>
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