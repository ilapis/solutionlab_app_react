import React, {useState, useEffect} from 'react';

import BootstrapModal from './BootstrapModal';
import AlertModal from './AlertModal';

import {
	Row,
	Col,
	Button, Card } from 'react-bootstrap';

function CoffeeList() {

  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const fetchList = () => {
	fetch(process.env.REACT_APP_PUBLIC_COFFE_LIST)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
    )
  }

  const handleDelete = id => {
	  	fetch(
	    process.env.REACT_APP_PUBLIC_COFFE_LIST + "/" + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
	})
      .then(res => {
		console.log(res);
		if ( 200 === res.status ) { 
			return res.json();
		} else {
			fetchList();
		}
	})
      .then(
        (result) => {
			if ( undefined !== result ) {
				setMessageAlert(result.toString());
				setShowAlert(true);
				console.log("result", result);
			}
        },
        (error) => {
			setMessageAlert(error.toString());
			setShowAlert(true);
			console.log("error", error);
        }
      )
  }

  useEffect(() => { fetchList() }, [])

  const toogleAlert = (state) => {
	setShowAlert(!state);
  }

  const refreshList = () => {
	fetchList();
  }

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading</div>
  } else {
    return (
	<>
      <AlertModal show={showAlert} message={messageAlert} toogleAlert={toogleAlert.bind(this)} />
	  
	  <Row className="sticky-top">
		<Col className="shadow bg-white">
			<BootstrapModal refreshList={refreshList.bind(this)} />
		</Col>
	  </Row>
	  
      <Row>
        {items.map(item => (
          <Col xs={3} key={item.id}>
		  
			<Card className='coffee-card'>
			
			<Card.Img variant="top" src={item.image} className='coffee-image' />
			  <Card.Body>
				<Card.Title>{item.title}</Card.Title>
				<Card.Text className='coffee-text' >
				  Price: {item.price}
				<Button variant="danger" className='float-right' data-id={item.id} onClick={(e) => handleDelete(e.target.dataset.id)} >Delete</Button>
				</Card.Text>
			  </Card.Body>
			</Card>
			
          </Col>
        ))}
      </Row>
	</>
    );
  }
}

export default CoffeeList