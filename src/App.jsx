
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Home from './Home/Home';

import AddBL from './AddBL/AddBL';
import ViewBL from './ViewBL/ViewBL';
import ExcelPage from './ExcelPage/ExcelPage';
import ProtectedRoute from './layout/ProtectedRoute';

function App() {


  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
       <Route path="/bl/:idUser/createbl" element= {
          <ProtectedRoute>
            <AddBL />
          </ProtectedRoute>
        } />
        <Route path='/viewbl' element={
          <ProtectedRoute>
            <ViewBL />
          </ProtectedRoute>
        }></Route>
        <Route path='/excel' element={
          <ProtectedRoute>
            <ExcelPage />
          </ProtectedRoute>
        }></Route>
      </Routes>


    </div>

  );
}

export default App
