import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1 className='text-center font-extrabold py-10 text-3xl'>Welcome to Employees App</h1>
      <div className='flex flex-col items-center justify-center px-2 py-3 '>
        <Link to="/add-employee-data">
          <button className='bg-green-800 text-white my-3 h-12 w-[1000px]'>Add Employee</button>
        </Link>
        <Link to="/list-employee">
          <button className='bg-blue-800 text-white my-3 h-12 w-[1000px]'>List Employee</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
