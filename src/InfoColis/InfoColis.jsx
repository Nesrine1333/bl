import React from 'react';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function InfoColis({ onSubmit }) {
  const { register, handleSubmit } = useForm();

  const onSubmitColis = (data) => {
    onSubmit(data); // Pass form data up to the parent component
  };

  return (
    <div className='container-dest'>
      <Form onSubmit={handleSubmit(onSubmitColis)}>
        <Form.Label className='saisie'>Saisir ici les données de votre colis :</Form.Label>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              {...register('desc', { required: true })}
              as="textarea"
              rows={3}
              placeholder="Enter description"
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="montantHLiv">
            <Form.Label>Montant Hors Livraison</Form.Label>
            <Form.Control
              {...register('prixtHliv', { required: true })}
              type="number"
              placeholder="Enter Montant Hors Livraison"
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="etatC">
            <Form.Label>Livraison</Form.Label>
            <Form.Control
              {...register('etatC', { required: true })}
              type="text"
              placeholder="Enter Livraison"
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="montantLiv">
            <Form.Label>Montant Livraison</Form.Label>
            <Form.Control
              {...register('prixLiv', { required: true })}
              type="number"
              placeholder="Enter Montant Livraison"
              required
            />
          </Form.Group>
        </Row>

        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}

export default InfoColis;
