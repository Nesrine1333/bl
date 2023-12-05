import React from 'react'
import NavBar from '../NavBar/NavBar'
import { Col,Row,Button } from 'react-bootstrap'
import '../ViewBL/ViewBL.css'
import { FaFileDownload } from "react-icons/fa";

function ViewBL() {
  return (
    <div>
<div className='filters-container'>
   <NavBar/>
   <Row className='filtres'>
    <Col>
    </Col>
      <Col className='labelf'>
        <p>Filtrer par:</p>
      </Col>
      <Col className='filtre-btn'>
        <Button onClick={() => handleFilterClick('date')}>Date</Button>
      </Col>
      <Col className='filtre-btn'>
        <Button onClick={() => handleFilterClick('number')}>N° Tel</Button>
      </Col>
      <Col className='filtre-btn'>
        <Button onClick={() => handleFilterClick('name')}>Nom Destinataire</Button>
      </Col>
    </Row>
 
</div>
<div className='view-container'>
    <Row className='details'>
      <Col className='filename'>
        <p> Nom du fichier:</p>
      </Col>
      <Col className='filedate'>
        date de création:
      </Col>
    </Row>
    <div className='files-container'>
    <Row className='files'>
    <Col className='filename2'>
       dhfjdhfjkdshfkjsd
      </Col>
      <Col className='filedate2'>
      ffjksdkfhsdjkhfsk
      </Col>
      <Button className='download'> <FaFileDownload/> </Button>
    </Row>
    </div>
    </div>
</div>

  )
}

export default ViewBL