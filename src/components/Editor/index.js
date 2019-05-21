import React from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap'
import Template from './template'
import TemplateContext from './template-context'
import {configuration as marketConfiguration} from '../../templates/market'
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

class Editor extends React.Component{
	constructor(props){
		super(props)
		this.state={
			configuration: [],
			handleTextChange: this.handleTextChange,
			handleTextClick: this.handleTextClick,
			activeTextEditorRef: null
		}

		
		this.tempId = 1;
	}

	componentDidMount = () => {
		const template = new URLSearchParams(this.props.location.search).get('template')

		if(template == 'market')
			this.setState({configuration: marketConfiguration})

		this.attachIdForConfiguration(marketConfiguration)
		this.setState({activeTextEditorRef: React.createRef()})
	}

	attachIdForConfiguration = (configuration) => {
		configuration.map(c => {
			c.id = this.tempId++
			if('children' in c){
				this.attachIdForConfiguration(c['children'])
			}
		})
	}
	
	changeConfiguration = (configuration, id, params) => {
		configuration.map(c => {
			if(c.id == id){
				Object.keys(params).forEach(k => {
					c[k] = params[k]
				})
			}
			if('children' in c){
				this.changeConfiguration(c['children'], id, params)
			}
		})
		return configuration
	}

	handleTextClick = (id) => {
		let configuration = this.state.configuration.slice()
		this.changeConfiguration(configuration, id, {editor: true})
		this.setState({configuration})
	}

	handleTextChange = (id, value) => {
		let configuration = this.state.configuration.slice()
		this.changeConfiguration(configuration, id, {content: value})
		this.setState({configuration})
	}

	componentWillMount(){
		document.addEventListener('mousedown', this.handleClickOutside, false)
	}

	componentWillUnmount(){
		document.removeEventListener('mousedown', this.handleClickOutside, false)
		this.props.firebase.users().off();
	}

	closeAllTextEditors = (configuration) => {
		configuration.map(c => {
			if(c.type == 'text'){
				c.editor = false
			}
			if('children' in c){
				this.closeAllTextEditors(c['children'])
			}
		})
		return configuration
	}

	handleClickOutside = (e) => {
		if(this.state.activeTextEditorRef.current){
			if(this.state.activeTextEditorRef.current.contains(e.target)){
				return
			}

			let configuration = this.state.configuration.slice()
			this.closeAllTextEditors(configuration)

			this.setState({configuration})
		}
	}

	handleElementSwap = (dragId, dropId) => {
		if(dragId == dropId) return
		let configuration = this.state.configuration.slice()
		let dragConfiguration = configuration.filter(c => c.id == dragId)[0]
		configuration = configuration.filter(c => c.id != dragId)

		for(let i = 0; i < configuration.length; i++){
			if(configuration[i].id == dropId)
			{
				configuration.splice(i, 0, dragConfiguration)
				break;
			}
		}

		this.setState({configuration: configuration})
	}

	saveTemplate = () => {
		let username = ''
		let email = ''
		this.props.firebase.user(this.props.authUser.uid).once('value').then(snapshot =>  {
		  	username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
		 	email = (snapshot.val() && snapshot.val().email) || 'Anonymous';
		 	this.props.firebase.user(this.props.authUser.uid).set({
				template: this.state.configuration,
				username: username,
				email: email
			})
		});
	}

	render(){
		return(
			<Container fluid className='editor'>
				<Row>
					<Col md={12}>
						<Button onClick={() => this.saveTemplate()} style={{float: 'right'}}> Save </Button>
					</Col>
					<Col md={12} style={{border: '1px solid black', padding: '0px'}}>
						{ this.state.configuration.length == 0 && <h4 style={{marginTop: '100px', textAlign: 'center'}}>NOT FOUND</h4>}
						{ this.state.configuration.length > 0 && 
							<TemplateContext.Provider value={this.state}>
								<Template handleElementSwap={this.handleElementSwap} handleTextChange={this.handleTextChange} configuration={this.state.configuration}/>
							</TemplateContext.Provider>
						}
					</Col>
				</Row>
			</Container>
		)
	}
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(withFirebase(Editor));
