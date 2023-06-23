import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function EditModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add New Input Type
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify Input Types</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <table> {/* Here we would loop through using map all the custom inputs the user has created*/}
                <tr>
                    <td>Content 1</td>
                    <td><Button>Edit</Button></td>
                    <td><Button>Delete</Button></td>
                </tr>
                <tr>
                    <td>Content 2</td>
                    <td><Button>Edit</Button></td>
                    <td><Button>Delete</Button></td>
                </tr>
                <tr>
                    <td>Content 3</td>
                    <td><Button>Edit</Button></td>
                    <td><Button>Delete</Button></td>
                </tr>
            </table>
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

export default EditModal;