import  { useState } from 'react';
import { z } from 'zod';
import { postEmployeeData } from '../Api/Employee-Api';

const schema = z.object({
  name: z.string().min(2,"minimum 2 letters").max(20),
  email: z.string().email('Invalid email address').min(5,'Email is required'),
  phone: z.string().refine((value) => /^\d{10}$/.test(value), {
    message: "Invalid phone number. It should be 10 digits long.",
  }),  
  address: z.string('Address is required'),
});

function AddEmployee() {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await postEmployeeData(employee)
      if (response) {
        alert(response.data.alert)
      }
      console.log('response:', response);
      console.log('Submitted:', employee);
      // Reset form fields
      setEmployee({
        name: '',
        email: '',
        phone: '',
        address: '',
      });
      setErrors({});
    } catch (error) {
      // Validation failed, set errors
      setErrors(error.formErrors.fieldErrors);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5">Add Employees</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
            id="name"
            name="name"
            type="text"
            placeholder="Enter name"
            value={employee.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
            id="email"
            name="email"
            type="email"
            placeholder="Enter email"
            value={employee.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone</label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phone ? 'border-red-500' : ''}`}
            id="phone"
            name="phone"
            type="tel"
            placeholder="Enter phone number"
            value={employee.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address</label>
          <textarea
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.address ? 'border-red-500' : ''}`}
            id="address"
            name="address"
            placeholder="Enter address"
            value={employee.address}
            onChange={handleChange}
          />
          {errors.address && <p className="text-red-500 text-xs italic">{errors.address}</p>}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;
