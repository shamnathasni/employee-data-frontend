import { useEffect, useState } from 'react';
import { employeeList } from '../Api/Employee-Api';
import { Link } from 'react-router-dom';

function EmployersList() {
    const [employees, setEmployeeList] = useState([]);

    useEffect(() => {
        employeeList()
            .then((response) => {
                const employeeData = response.data.employers;
                setEmployeeList(employeeData);
                console.log(response, "res");
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <div className='text-center font-extrabold py-3 text-3xl'>
                <h1>Employee List</h1>
            </div>
            {employees.length > 0 ? (
                <div className='py-5 container mx-auto'>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {employees.map((employee, index) => (
                                    <tr key={employee.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{employee.phone}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{employee.address}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-screen">
                    <h1 className='font-medium text-red-700'>Oops! No employees</h1>
                    <Link to="/add-employee-data">
                        <button className='bg-green-800 text-white my-3 h-10 w-32 rounded-sm hover:scale-105 ease-in-out duration-300'>Add Employee</button>
                    </Link>
                </div>
            )}
        </>
    );
}

export default EmployersList;
