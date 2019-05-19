import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import Template from './template'

import {configuration as marketConfiguration} from '../../templates/market'

class Editor extends React.Component{
	constructor(props){
		super(props)
		this.state={
			configuration: []
		}
	}

	componentDidMount = () => {
		const template = new URLSearchParams(this.props.location.search).get('name')

		if(template == 'market')
			this.setState({configuration: marketConfiguration})
	}

	render(){
		return(
			<Container fluid>
				<Row>
					<Col md={12} style={{border: '1px solid black', padding: '0px'}}>
						{ this.state.configuration.length == 0 && <h4 style={{marginTop: '100px', textAlign: 'center'}}>NOT FOUND</h4>}
						{ this.state.configuration.length > 0 && <Template configuration={marketConfiguration}/>}
					</Col>
				</Row>
			</Container>
		)
	}
}

export default Editor;
//import ReactQuill from 'react-quill';
