import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'

import Market from '../../templates/market'
class Editor extends React.Component{
	render(){
		return(
			<Container fluid>
				<Row>
					<Col>
					asd
					</Col>
				</Row>
				<Row>
					<Col md={2}>
					asd
					</Col>
					<Col md={10} style={{border: '1px solid black', padding: '0px'}}>
						<Market />
					</Col>
				</Row>
			</Container>
		)
	}
}

export default Editor;