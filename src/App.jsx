import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Home from './Home/Home';
import AddBL from './AddBL/AddBL';
import ViewBL from './ViewBL/ViewBL';
import ExcelPage from './ExcelPage/ExcelPage';
import ProtectedRoute from './layout/ProtectedRoute';
import useAuth from './useAuth'; 

function App() {
  const isAuthenticated = useAuth();

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={
          isAuthenticated ? (
            <ProtectedRoute> 
              <Home />
            </ProtectedRoute>
          ) : (
            // Redirect to login if not authenticated
            <Navigate to="/login" replace />
          )
        } />
        <Route path="/bl/:idUser/createbl" element={
          isAuthenticated ? (
            <ProtectedRoute>
              <AddBL />
            </ProtectedRoute>
          ) : (
            // Redirect to login if not authenticated
            <Navigate to="/login" replace />
          )
        } />
        <Route path='/viewbl' element={
          isAuthenticated ? (
            <ProtectedRoute>
              <ViewBL />
            </ProtectedRoute>
          ) : (
            // Redirect to login if not authenticated
            <Navigate to="/login" replace />
          )
        } />
        <Route path='/excel' element={
          isAuthenticated ? (
            <ProtectedRoute>
              <ExcelPage />
            </ProtectedRoute>
          ) : (
            // Redirect to login if not authenticated
            <Navigate to="/login" replace />
          )
        } />
      </Routes>
    </div>
  );
}

export default App;
