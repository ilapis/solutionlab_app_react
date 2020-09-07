import React, {useState} from 'react'

import {Row, Col, Button, Form} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import InputImage from './Form/InputImage';
import InputPrice from './Form/InputPrice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function BootstrapModal(props) {

  const [show, setShow] = useState(false); // Show/Hide form popup
  const [disabled, setDisable] = useState(""); // Disable/Enable Submit button
  const [formData, setFormData] = useState({"title": "", "image": "", "price": ""}); // Form data holder for post
  const [errors, setErrors] = useState(""); // Form validation erors from server if any.

  const handleClose = () => {
	  setShow(false);
  };
  const handleShow = () => setShow(true);
  
  const setTitle = event => {
	  formData["title"] = event.target.value;
  };

  const setBase64 = (base64) => {
	formData["image"] = base64;
  }
  
  const setPrice = (price) => {
	formData["price"] = price;
  }

  const handleSubmit = event => {
    event.preventDefault();
	setDisable("disabled");
	
	fetch(
	    process.env.REACT_APP_PUBLIC_COFFE_LIST, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: formData })
	})
      .then(res => res.json())
      .then(
        (result) => {
			/*
			* If there were errors, update formData with response from server,
			* enable submit button
			*/
			if (undefined !== result.errors) {
				for (const [key, value] of Object.entries(result.data)) {
				  formData[key] = value;
				}
				setErrors(result.errors);
				setDisable("");
			/*
			* If no errors after upload
			*/
			} else {
				setDisable("");
				setFormData({"title": "", "image": "", "price": ""});
				setShow(false);
				props.refreshList();
			}
        },
        (error) => {
			// TODO
			console.log("error", error);
			setDisable("");
        }
      )
  };
  
  return (
    <>
	  
	<Button onClick={handleShow} varian="primary" type="button" className="float-right mt-3 mb-3" >
		<FontAwesomeIcon icon={faPlus} /> Add
	</Button>

	  <Modal size="lg" show={show} onHide={handleClose} animation={false}>
	  
		<Form>
			
        <Modal.Header closeButton>
          <Modal.Title>Add coffee</Modal.Title>
        </Modal.Header>
		
        <Modal.Body>
			
			<Row>
			<Col sm={6} className='float-left'>
				<Col>
				<Form.Group as={Row} controlId="formHorizontalTitle">
					<Form.Label>Title</Form.Label>
					<Form.Control type="text" onChange={setTitle} isInvalid={errors.title} />
					<Form.Control.Feedback type="invalid" >{errors.title}</Form.Control.Feedback>
				</Form.Group>
				</Col>
			  
				<Col>
				<Form.Group as={Row} controlId="formHorizontalPrice">
					<Form.Label >Price</Form.Label>
					<InputPrice setPrice={setPrice.bind(this)} isInvalid={errors.price} errors={errors.price} />
				</Form.Group>
				</Col>
			</Col>
		  
			<Col sm={6} className='float-right' >
				<InputImage setBase64={setBase64.bind(this)} isInvalid={errors.image} errors={errors.image} />
			</Col>
			</Row>
			  
		</Modal.Body>
		
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={disabled} >
            Save Changes
          </Button>
        </Modal.Footer>
		
		</Form>
		
      </Modal>
    </>
  );
}

export default BootstrapModal