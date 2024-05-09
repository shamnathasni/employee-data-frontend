import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'react-toastify';
import { postEmployeeData } from '../Api/Employee-Api';
import { NavbarSimple } from './Navbar';
import { useNavigate } from "react-router-dom";


function AddEmployee() {

  const navigate = useNavigate()
  const schema = z.object({
    name: z.string().min(2, "minimum 2 letters").max(20),
    email: z.string().email('Invalid email address').min(5, 'Email is required'),
    phone: z.string().refine(value => /^\d{10}$/.test(value), {
      message: "Invalid phone number. It should be 10 digits long.",
    }),  
    address: z.string().refine(value => !!value.trim(), {
      message: "Address is required",
    }),
  });
  
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({ resolver: zodResolver(schema) });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setEmployee((prevEmployee) => ({
  //     ...prevEmployee,
  //     [name]: value,
  //   }));
  // };

  const submitData = async(formData) => {
    try {  
      const response = await postEmployeeData(formData)
      if (response) {
        toast(response.data.alert)
        navigate("/")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <NavbarSimple />
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5">Add Employees</h1>
      <form onSubmit={handleSubmit(submitData)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
            type="text"
            placeholder="Enter name"
            {...register("name")}
          />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message} </p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}     
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone</label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phone ? 'border-red-500' : ''}`}
            type="tel"
            placeholder="Enter phone number"
            {...register("phone")}
          />
          {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address</label>
          <textarea
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.address ? 'border-red-500' : ''}`}
            placeholder="Enter address"
            {...register("address")}
          />
          {errors.address && <p className="text-red-500 text-xs italic">{errors.address.message}</p>}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add Employee
        </button>
      </form>
    </div>
    </>
  );
}

export default AddEmployee;
