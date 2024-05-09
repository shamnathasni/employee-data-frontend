import { Link } from 'react-router-dom';
import { NavbarSimple } from './Navbar';

function Home() {
  return (
    <>
      <NavbarSimple />
      <div className='flex flex-col lg:flex-row items-center justify-center h-[calc(100vh-64px)]'> {/* 64px is the height of the Navbar */}
        <div className='w-full flex text-center pb-20 flex-col '>
          <h1 className=' font-light font-serif text-3xl'>Welcome to Employees App</h1>
          <p className='font-extralight m-5 '>The Employee Management App is a comprehensive solution for organizations to efficiently manage their employee data. This app simplifies tasks like adding and editing employee information, tracking attendance, managing leave requests, and monitoring performance. It provides a user-friendly interface for accessing employee directories, generating reports, and setting performance goals.</p>
          <div className='flex flex-row  p-5 gap-4 justify-center'>
            <Link to="/add-employee-data">
              <button className='bg-green-800 text-white my-3 h-10 w-60 rounded-sm px-5 '>Add Employee</button>
            </Link>
            <Link to="/list-employee">
              <button className='bg-blue-800 text-white my-3 h-10 w-60  rounded-sm px-5'>List Employee</button>
            </Link>
          </div>
        </div>
        <div className='w-full lg:w-1/2 m-5'>
          <img className='h-80 w-80 m-9 object-cover' src='/public/home.jpg' alt='Home' />
        </div>
      </div>
    </>
  );
}

export default Home;
