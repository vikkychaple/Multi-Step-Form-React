



import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const SubmitModal = ({ show, handleClose, handleAnotherResponse }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Submission Successful</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Thank you for submitting data. Your data has now been submitted successfully.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleAnotherResponse}>
          Submit Another Response
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SubmitModal;
