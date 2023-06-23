import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function InputModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add New Input
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Input</Modal.Title>
        </Modal.Header>
        <Modal.Body>New Field
          <input />
          <div>Data type 
            <select name="data type">
            <option value="integer">Number, no decimals</option>
            <option value="float">Number with decimals</option>
            <option value="string">Text</option>
            <option value="boolean">Yes/no (boolean)</option>
            </select>
          </div>
          <div>Range <input placeholder="minimum" /><input placeholder="maximum" /></div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InputModal;