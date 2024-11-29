import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { addVehicle } from '../../features/Action/Vehicles/vehicleAction'

/** for service Type */
const ServiceType = [
  {
    id:1,
    serviceName:"Shared"
  },
  {
    id:2,
    serviceName:"Private"
  },
  {
    id:3,
    serviceName:"Rideshare"
  }
]
/** for vehicleType */
const VehicleType =[
  {
    id:1,
    vehicleName:"Van"
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
const VehicleClass =[
  {
    id:1,
    className:"Economy"
  },
  {
    id:2,
    className:"Business"
  },
  {
    id:3,
    className:"Luxury"
  }
]


const AddVehicle = () => {
  const dispatch = useDispatch()

  /** state to manage all the selected images */
  const [selectedImages, setSelectedImages] = useState([])

  const {register, handleSubmit, formState:{errors}} = useForm()
  
  /** Handle to Select and set Images */
  const handleSelectImage = (e) => {
    setSelectedImages(Array.from(e.target.files));
  }
  const SubmitForm =(data)=>{
    const formData = {...data, images:selectedImages}
    dispatch(addVehicle(formData))
  }
  
  
  
  return (
    <main className="flex-1 p-8 mt-16 ml-64">
     <div>AddVehicle</div>
     <form onSubmit={handleSubmit(SubmitForm)} >
      {/**  Vehicle Name */}
        <div className="mb-4">
          <label htmlFor="vehicleName" className="block text-sm font-medium text-gray-700">
            Add Vehicle Name
          </label>
          <input
            type="text"
            id="vehicleName"
            {...register("vehicleName", { required: "vehicle name is required" })}
            className={`mt-1 p-2 block w-full rounded-md border-2 ${errors.vehicleName ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          {errors.vehicleName && <p className="text-red-500 text-sm mt-1">{errors.vehicleName.message}</p>}
        </div>

        {/** service type */}
        <div className="mb-4">
          <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">
            Add Service Type
          </label>
          <select
            id="serviceType"
            {...register("serviceType", { required: "Service Type is required" })}
            className={`mt-1 p-2 block w-full rounded-md border-2 ${errors.serviceType ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          >
            <option value="">Select a Service Type</option>
            {Array.isArray(ServiceType) &&
              ServiceType.map((type) => (
                <option key={type.id} value={type.serviceName}>
                  {type.serviceName}
                </option>
              ))}
          </select>
          {errors.serviceType && <p className="text-red-500 text-sm mt-1">{errors.serviceType.message}</p>}
        </div>
        {/** vehicle type */}
        <div className="mb-4">
          <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">
            Add Vehicle Type
          </label>
          <select
            id="vehicleType"
            {...register("vehicleType", { required: "Service Type is required" })}
            className={`mt-1 p-2 block w-full rounded-md border-2 ${errors.vehicleType ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          >
            <option value="">Select a Vehicle Type</option>
            {Array.isArray(VehicleType) &&
              VehicleType.map((type) => (
                <option key={type.id} value={type.vehicleName}>
                  {type.vehicleName}
                </option>
              ))}
          </select>
          {errors.vehicleType && <p className="text-red-500 text-sm mt-1">{errors.vehicleType.message}</p>}
        </div>
        {/** add vehicle class */}
        <div className="mb-4">
          <label htmlFor="vehicleClass" className="block text-sm font-medium text-gray-700">
            Add Vehicle Class
          </label>
          <select
            id="vehicleClass"
            {...register("vehicleClass", { required: "Vehicle Class Type is required" })}
            className={`mt-1 p-2 block w-full rounded-md border-2 ${errors.vehicleClass ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          >
            <option value="">Select a Vehicle Class</option>
            {Array.isArray(VehicleClass) &&
              VehicleClass.map((type) => (
                <option key={type.id} value={type.className}>
                  {type.className}
                </option>
              ))}
          </select>
          {errors.destinations && <p className="text-red-500 text-sm mt-1">{errors.destinations.message}</p>}
        </div>
        {/** passenger capacity */}
        <div className="mb-4">
          <label htmlFor="passengerCapacity" className="block text-sm font-medium text-gray-700">
            Add Passenger Capacity
          </label>
          <input
            type="number"
            id="passengerCapacity"
            {...register("passengerCapacity", { required: "Passenger Capacity is required" })}
            className={`mt-1 p-2 block w-full rounded-md border-2 ${errors.passengerCapacity ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          {errors.passengerCapacity && <p className="text-red-500 text-sm mt-1">{errors.passengerCapacity.message}</p>}
        </div>
        {/** Luggage capacity */}
        <div className="mb-4">
          <label htmlFor="luggageCapacity" className="block text-sm font-medium text-gray-700">
            Add Luggage Capacity
          </label>
          <input
            type="number"
            id="luggageCapacity"
            {...register("luggageCapacity", { required: "Luggage Capacity is required" })}
            className={`mt-1 p-2 block w-full rounded-md border-2 ${errors.luggageCapacity ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          {errors.luggageCapacity && <p className="text-red-500 text-sm mt-1">{errors.luggageCapacity.message}</p>}
        </div>
        {/** price */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Add Price
          </label>
          <input
            type="number"
            id="price"
            {...register("price", { required: "price is required" })}
            className={`mt-1 p-2 block w-full rounded-md border-2 ${errors.price ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
        </div>
        
        {/** Rating */}
        <div className="mb-4">
          <label htmlFor="ratings.averageRating" className="block text-sm font-medium text-gray-700">
            Add Average Vehicle Rating
          </label>
          <input
            type="number"
            id="ratings.averageRating"
            {...register("ratings.averageRating", { required: "Average rating is required" })}
            className={`mt-1 p-2 block w-full rounded-md border-2 ${errors.ratings ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          {errors.ratings && <p className="text-red-500 text-sm mt-1">{errors.ratings.message}</p>}
        </div>
        {/** number of ratings */}
        <div className="mb-4">
          <label htmlFor="ratings.numberOfRatings" className="block text-sm font-medium text-gray-700">
            Add Number of Ratings
          </label>
          <input
            type="number"
            id="ratings.numberOfRatings"
            {...register("ratings.numberOfRatings", { required: "Total no of rating is required" })}
            className={`mt-1 p-2 block w-full rounded-md border-2 ${errors.ratings ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          {errors.ratings && <p className="text-red-500 text-sm mt-1">{errors.ratings.message}</p>}
        </div>
        {/** images */}
        <div className="mb-6">
          <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
            Upload vehicle images
          </label>
          <input
            type="file"
            id="images"
            accept="image/*"
            multiple
            {...register("images", { required: "Vehicle Images are required" })}
            onChange={handleSelectImage}
            className={`block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:bg-blue-50 file:text-blue-700 ${errors.images ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
          />
        </div>
        <button type='submit'>
          Submit
        </button>
     </form>
    </main>
  )
}

export default AddVehicle