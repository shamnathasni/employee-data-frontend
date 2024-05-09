import { useEffect, useState } from 'react';
import { employeeList, searchData } from '../Api/Employee-Api';
import { CSVLink } from 'react-csv';
import { NavbarSimple } from './Navbar';

function EmployersList() {
    const [ employees, setEmployeeList ] = useState([]);
    const [ search, setSearch ] = useState("")

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

    useEffect(()=>{
        if(search.trim() !== ""){
            searchData(search)
            .then((res)=>{
                const data = res.data.result
                setEmployeeList(data)
            })
        }else{
            setEmployeeList([])
        }
    },[search])

    const csvHeaders = [
        { label: 'Name', key: 'name' },
        { label: 'Email', key: 'email' },
        { label: 'Phone', key: 'phone' },
        { label: 'Address', key: 'address' }
    ];

    const csvData = employees.map(employee => ({
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        address: employee.address
    }));

    return (
        <>
        <NavbarSimple/>
            <div className='text-center font-extrabold py-3 text-3xl'>
                <h1>Employee List</h1>
            </div>
           
            {search.trim() !== "" && employees.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-screen">
                <h1 className='font-medium text-red-700'>Oops! No employees</h1>
                {/* <Link to="/add-employee-data">
                    <button className='bg-green-800 text-white my-3 h-10 w-32 rounded-sm hover:scale-105 ease-in-out duration-300'>Add Employee</button>
                </Link> */}
            </div>
                
            ) : (
                <div className='container mx-auto'>
                {/* <div className='flex justify-self-start items-center my-5 py-2 px-4'>
                    
                </div> */}
                 <div className='flex justify-between items-center my-5'>
                 <input type='text' onChange={(e)=>{setSearch(e.target.value)}} placeholder=' search employee with name..' className='placeholder:italic  border h-10 w-60 rounded-sm m-2 bg-slate-100'/>
                    <CSVLink data={csvData} headers={csvHeaders} filename={"employees.csv"}>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                            Download CSV
                        </button>
                    </CSVLink>
                 </div>
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
                                <tr key={employee._id}>
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
            )}
        </>
    );
}

export default EmployersList;
