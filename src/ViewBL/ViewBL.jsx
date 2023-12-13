import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Pagination } from 'react-bootstrap';
import { FaFileDownload } from 'react-icons/fa';
import NavBar from '../NavBar/NavBar';
import './ViewBL.css';
import { useDispatch, useSelector } from 'react-redux';
import BASE_URL from '../services/apiConfig';

function ViewBL() {
  const [bills, setBills] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ dateBl: '', nomDest: '', blname: '' });
  const userId = useSelector((state) => state.auth.user?.id);

  useEffect(() => {
    const filterParams = new URLSearchParams({
      page: currentPage,
      dateBl: filters.dateBl,
      nomDest: filters.nomDest,
      blname: filters.blname,
    });

    fetch(`${BASE_URL}/bl/${userId}/getAllBlByUserFilter?${filterParams.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setBills(data);
          // Calculate total pages based on the assumption that there are 10 items per page
          const totalPages = Math.ceil(data.length / 10);
          setTotalPages(totalPages);
        } else {
          setBills([]);
          setTotalPages(0);
        }
      })
      .catch((error) => console.error('Error fetching bills:', error));
  }, [currentPage, userId, filters]);

  const downloadPdf = (billId) => {
    const pdfUrl = `${BASE_URL}/bl/${billId}/downloadImported`;
    window.location.href = pdfUrl;
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (filterName, value) => {
    setCurrentPage(1); // Reset page when filters change
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  };

  return (
    <div>
      <div className='filters-container'>
        <NavBar />
        <div>
          <label>Date:</label>
          <input
            type='date'
            value={filters.dateBl}
            onChange={(e) => handleFilterChange('dateBl', e.target.value)}
          />
        </div>
        <div>
          <label>Nom Destinataire:</label>
          <input
            type='text'
            value={filters.nomDest}
            onChange={(e) => handleFilterChange('nomDest', e.target.value)}
          />
        </div>
        <div>
          <label>BL Name:</label>
          <input
            type='text'
            value={filters.blname}
            onChange={(e) => handleFilterChange('blname', e.target.value)}
          />
        </div>
      </div>
      <div className='table-container'>
        <table className='custom-table'>
          <thead className='table-header'>
            <tr>
              <th>Date</th>
              <th>Nom Destinataire</th>
              <th>Numéro Téléphone</th>
              <th>Prix Hliv</th>
              <th>description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='table-body'>
            {bills.map((bill) => (
              <tr key={bill.id}>
                <td>{bill.dateBl}</td>
                <td>{bill.nomDest}</td>
                <td>{bill.numTelephone1}</td>
                <td>{bill.prixHliv}</td>
                <td>{bill.desc}</td>
                <td>
                  <Button
                    size='sm'
                    variant='success'
                    onClick={() => downloadPdf(bill.id)}
                  >
                    <FaFileDownload /> Télécharger
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <Row className='pagination-container'>
          <Col>
            <Pagination>
              {[...Array(totalPages).keys()].map((page) => (
                <Pagination.Item
                  key={page + 1}
                  active={page + 1 === currentPage}
                  onClick={() => handlePagination(page + 1)}
                >
                  {page + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ViewBL;
