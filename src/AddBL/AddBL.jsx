import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfoDest from '../InfoDest/InfoDest';
import InfoColis from '../InfoColis/InfoColis';
import NavBar from '../NavBar/NavBar';
import { createBL } from '../redux/actions/blActions';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import BASE_URL from '../services/apiConfig';

import './AddBl.css';

function AddBL() {
  const dispatch = useDispatch();
  const [destData, setDestData] = useState({});
  const [colisData, setColisData] = useState({});
  const userId = useSelector((state) => state.auth.user?.id);
  const [blId, setBlId] = useState(null);
  const navigate = useNavigate();
  const notify = () => toast.success('BL created successfully !');

  useEffect(() => {
    if (userId) {
      navigate(`/bl/${userId}/createbl`);
    }
  }, [navigate, userId]);

  const handleDestFormSubmit = (data) => {
    setDestData(data);
  };

  const handleColisFormSubmit = (data) => {
    setColisData(data);
  };

 const handleValiderClick = async () => {
  try {
    const blData = {
      ...destData,
      ...colisData,
    };

    // Dispatch the createBL action and get the BL ID from the payload
    const { payload: createdBL, error } = await dispatch(createBL({ userId, blData }));

    if (createdBL) {
      notify(); // Call notify to show the toast
      setBlId(createdBL); // Set the BL ID
    } else {
      console.error('Error creating BL:', error);

      // Check for specific error messages and handle accordingly
      if (error && error.message === 'Your specific error message') {
        // Handle specific error
      } else {
        // Handle generic error
      }
    }
  } catch (error) {
    console.error('Error creating BL:', error);
  }
};


  const handleGeneratePdfClick = () => {
    if (blId) {
      const downloadUrl = `${BASE_URL}/bl/${blId}/file`;
      window.location.href = downloadUrl;
    } else {
      console.error('BL ID not available');
    }
  };

  return (
    <div className="container">
      <NavBar />
      <InfoDest onSubmit={handleDestFormSubmit} className="InfoDest" />
      <InfoColis onSubmit={handleColisFormSubmit} className="InfoColis" />
      <div className='validation'>
        <div className="button-container">
          <button type="button" className='btnv' onClick={handleValiderClick}>
            Valider
          </button>
          <button type="button" className='btnp' onClick={handleGeneratePdfClick}>
            Télécharger PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddBL;
