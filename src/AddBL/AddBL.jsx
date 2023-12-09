import React, { useState,useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfoDest from '../InfoDest/InfoDest';
import InfoColis from '../InfoColis/InfoColis';
import NavBar from '../NavBar/NavBar';
import { createBL } from '../redux/actions/blActions';
import { generatePdf } from '../redux/actions/pdfActions'; // Import the generatePdf action
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import { ToastContainer, toast } from 'react-toastify';
import BASE_URL from '../services/apiConfig';

import './AddBl.css';

function AddBL() {
  const dispatch = useDispatch();
  const [destData, setDestData] = useState({});
  const [colisData, setColisData] = useState({});
  const userId = useSelector((state) => state.auth.user?.id);
  const [blId, setBlId] = useState(null); // State to store the BL ID
  const navigate = useNavigate(); // Get the navigate function from React Router
	const notify = () => toast.success('BL created successfully !');

  useEffect(() => {
    // Redirect to the URL with the actual user ID when the component mounts
    if (userId) {
      navigate(`/bl/${userId}/createbl`);
    }
  }, [navigate, userId]);


  const handleDestFormSubmit = (data) => {
    setDestData(data); // Store form data from InfoDest
  };

  const handleColisFormSubmit = (data) => {
    setColisData(data); // Store form data from InfoColis
  };

const handleValiderClick = async () => {
  try {
    const blData = {
      ...destData,
      ...colisData,
    };

    // Dispatch the createBL action and get the BL ID from the payload
    const { payload: createdBL } = await dispatch(createBL({ userId, blData }));

    console.log('createdBL:', createdBL); // Log the entire object

    if (createdBL) {
      notify(); // Call notify to show the toast

      setBlId(createdBL); // Set the BL ID
    } else {
      console.error('Invalid BL data received:', createdBL.id);
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
      // Handle the case where the BL ID is not available
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
