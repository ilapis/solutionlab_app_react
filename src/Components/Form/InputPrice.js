import React from 'react'

import {Form} from 'react-bootstrap';

function InputPrice(props) {

	const step = props.step ? props.step : '0.01' ;
	const errors = props.errors ? props.errors : '' ;
	const invalid = props.isInvalid ? props.isInvalid : '' ;

    const handlePrice = event => {
	    
		let value = event.target.value;
		if (value.indexOf(".") !== -1 && value.split(".")[1].length > 2 ) {
			
		}
		if (value.indexOf(".") !== -1 && value.split(".")[1].length > 2 ) {
			event.target.value = parseFloat(value).toFixed(2);
		}
	    props.setPrice(event.target.value);
    };

	return (
	    <>
    	    <Form.Control type="number" step={step} onChange={handlePrice} isInvalid={invalid} />
			<Form.Control.Feedback type="invalid" >{errors}</Form.Control.Feedback>
		</>
	);
}

export default InputPrice