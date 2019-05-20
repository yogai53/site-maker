import React from 'react';
import { withAuthorization } from '../Session';
import {Image} from 'react-bootstrap'
import MarketTemplateImage from '../../assets/images/market.png'
import * as ROUTES from '../../constants/routes';
class TemplatePage extends React.Component
{
	handleClick = (template) => {
		this.props.history.push(`${ROUTES.EDITOR}?template=${template}`)
	}

	render(){
		return (
			<React.Fragment>
				<div style={{textAlign: 'center', marginTop: '100px'}}>
					<h5>CHOOSE YOUR TEMPLATE</h5>				
				</div>

				<div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
					<div onClick={() => this.handleClick('market')} className='highlightable' style={{width: '30%', height: '300px', textAlign: 'center', cursor: 'pointer'}}>
						<Image src={MarketTemplateImage} style={{height: '100%',}}/> 
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(TemplatePage);