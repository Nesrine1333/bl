import React, { useState,useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfoDest from '../InfoDest/InfoDest';
import InfoColis from '../InfoColis/InfoColis';
import NavBar from '../NavBar/NavBar';
import { createBL } from '../redux/actions/blActions';
import { generatePdf } from '../redux/actions/pdfActions'; // Import the generatePdf action
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router

import '../AddBL/AddBL.css';

function AddBL() {
  const dispatch = useDispatch();
  const [destData, setDestData] = useState({});
  const [colisData, setColisData] = useState({});
  const userId = useSelector((state) => state.auth.user?.id);
  const [blId, setBlId] = useState(null); // State to store the BL ID
  const navigate = useNavigate(); // Get the navigate function from React Router

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

    if (createdBL && createdBL.id) {
      alert(`BL created successfully with ID: ${createdBL.id}`);
      setBlId(createdBL.id); // Set the BL ID
    } else {
      console.error('Invalid BL data received:', createdBL);
    }
  } catch (error) {
    console.error('Error creating BL:', error);
  }
};
  
  

  const handleGeneratePdfClick = () => {
    alert(blId)
    if (blId) {
      dispatch(generatePdf(blId)); // Dispatch the generatePdf action with the stored BL ID
    } else {
      // Handle the case where the BL ID is not available
      console.error('BL ID not available');
    }
  };

  return (
    <div>
      <NavBar />
      <InfoDest onSubmit={handleDestFormSubmit} />
      <InfoColis onSubmit={handleColisFormSubmit} />
      <div className='validation'>
        <button type="button" className='btnv' onClick={handleValiderClick}>
          Valider
        </button>
      </div>
      <div className='pdf'>
        <button type="button" className='btnp' onClick={handleGeneratePdfClick}>
          Créer PDF
        </button>
      </div>
    </div>
  );
}

export default AddBL;
