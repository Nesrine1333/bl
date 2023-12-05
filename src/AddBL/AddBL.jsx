import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfoDest from '../InfoDest/InfoDest';
import InfoColis from '../InfoColis/InfoColis';
import NavBar from '../NavBar/NavBar';
import { createBL } from '../redux/actions/blActions';
import { generatePdf } from '../redux/actions/pdfActions'; // Import the generatePdf action

import '../AddBL/AddBL.css';

function AddBL() {
  const dispatch = useDispatch();
  const [destData, setDestData] = useState({});
  const [colisData, setColisData] = useState({});
  const userId = useSelector((state) => state.auth.user?.id);
  const [blId, setBlId] = useState(null); // State to store the BL ID

  const handleDestFormSubmit = (data) => {
    setDestData(data); // Store form data from InfoDest
  };

  const handleColisFormSubmit = (data) => {
    setColisData(data); // Store form data from InfoColis
  };

  const handleValiderClick = async () => {
    const blData = {
      ...destData,
      ...colisData,
    };
    const createdBL = await dispatch(createBL({ userId, blData }));
    if (createdBL && createdBL.id) {
      setBlId(createdBL.id); // Store the BL ID after it's created
    }
  }
  
  

  const handleGeneratePdfClick = () => {
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
