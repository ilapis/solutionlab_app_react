import React, {useState, useRef} from 'react'
import AlertModal from './../AlertModal';
import {Form, Card} from 'react-bootstrap';

function InputImage(props) {
	
    //For Input image
    const fileInput = useRef(null);
    const [imagePreview, setImagePreview] = useState(process.env.REACT_APP_IMAGE_PLACEHOLDER);
	
	//For AlertModal
	const [showAlert, setShowAlert] = useState(false);
	const [messageAlert, setMessageAlert] = useState("");
   
    const handleFile = event => {
		var reader = new FileReader();
		reader.onload = function(e) {
		    setImagePreview(e.target.result);
		    props.setBase64(e.target.result);
		}
		
		const imageFile = event.target.files[0];
		
		if ( undefined !== imageFile ) {
		
			var match = /^\/(.*)\/([a-z]*)$/.exec("/\\.(" + process.env.REACT_APP_IMAGE_FILE_FORMAT + ")$/")
			var x = new RegExp(match[1], match[2]);
			
			if ( !x.test(imageFile.name.toLowerCase()) ) {
				setMessageAlert(process.env.REACT_APP_IMAGE_FILE_FORMAT_ERROR);
				setShowAlert(true);
				return false;
			}
			
			if ( imageFile.size > process.env.REACT_APP_IMAGE_FILE_SIZE ) {
				setMessageAlert(process.env.REACT_APP_IMAGE_FILE_SIZE_ERROR);
				setImagePreview(process.env.REACT_APP_IMAGE_PLACEHOLDER);
				setShowAlert(true);
				return false;
			}
		
			reader.readAsDataURL(imageFile);
		}
    };
	
	//For Input image
    const handleClick = () => {
        fileInput.current.click();
    };
	
	//For AlertModal
	const toogleAlert = (state) => {
	    setShowAlert(!state);
    }

	return (
		<>
        <AlertModal show={showAlert} message={messageAlert} toogleAlert={toogleAlert.bind(this)} />
	    <Form.Group controlId="formHorizontalImage">
		    <Card.Img variant="top" src={imagePreview} className='coffee-image' onClick={() => handleClick()} />
			<Form.File id="file" name="image" label="File input" isInvalid={props.isInvalid} feedback={props.errors} onChange={handleFile} ref={fileInput} className="feedback-only"  />
		</Form.Group>
		</>
	);	
}

export default InputImage
