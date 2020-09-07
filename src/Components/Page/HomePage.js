import React from 'react';

import CoffeeList from './../CoffeeList'
import {Container, Row, Col} from 'react-bootstrap';

function HomePage() {
  return (
	<Container>
		<Row>
			<Col>
				<CoffeeList />
			</Col>
		</Row>
	</Container>
  );
}

export default HomePage