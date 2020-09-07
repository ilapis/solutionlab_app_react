import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function PageNotFound() {
  return ( 
	<Container>
		<Row>
			<Col className="not-found" >404</Col>
		</Row>
	</Container>
  );
}

export default PageNotFound;