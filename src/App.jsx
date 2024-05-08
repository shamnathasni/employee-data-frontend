import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import AddEmployee from './Components/AddEmployee';
import EmployersList from './Components/EmployersList';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/add-employee-data' element={<AddEmployee />} />
        <Route path='/list-employee' element={ <EmployersList/> }/>
      </Routes>
    </Router>
  );
}

export default App;
