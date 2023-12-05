import React from 'react'
import '../ExcelPage/ExcelPage.css'
import NavBar from '../NavBar/NavBar'
import { Button } from 'react-bootstrap'
import { FaFileImport } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";

function ExcelPage() {
  return (
    <div className='excel-container'>
        <NavBar/>
    <div className='import-export'>
        <Button className='btn-excel'> 
           <p> Importer un fichier</p>
           <FaFileImport />

        </Button>
        <Button className='btn-excel'>
            <p> Télécharger un fichier </p>
            <FaFileDownload/>
        </Button>
    </div>
    </div>
  )
}

export default ExcelPage