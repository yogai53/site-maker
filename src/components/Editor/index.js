import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import {configuration} from '../../templates/market/configuration.js'
import Template from './template'

class Editor extends React.Component{
	constructor(props){
		super(props)
		this.template = new URLSearchParams(this.props.location.search).get('name')
		console.log(this.template)
	}
	render(){
		
		return(
			<Container fluid>
				<Row>
					<Col>
					asd
					</Col>
				</Row>
				<Row>
					<Col md={12} style={{border: '1px solid black', padding: '0px'}}>
						<Template configuration={configuration}/>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default Editor;