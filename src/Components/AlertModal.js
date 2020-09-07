import React from 'react'

import {Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

function AlertModal(props) {

  const handleClose = () => {
	  props.toogleAlert(props.show);
  };

  return (
    <>
	  <Modal centered show={props.show} onHide={handleClose} animation={false}>

        <Modal.Header className="danger">
          <Modal.Title >Alert!</Modal.Title>
        </Modal.Header>
		
        <Modal.Body>
		  {props.message}
		</Modal.Body>
		
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
		
      </Modal>
    </>
  );
}

export default AlertModal