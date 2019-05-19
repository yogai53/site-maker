import React from 'react'
import {Container, Row, Col, Image, Button} from 'react-bootstrap'
import Carousel from 'react-multi-carousel';

import 'font-awesome/css/font-awesome.min.css'; 
import 'react-quill/dist/quill.snow.css';
import 'react-multi-carousel/lib/styles.css';

const TemplateImage = (props) => {
	if(props.link == null)
	{
		return (<div style={{display: 'inline-block'}}><Image src={props.src} style={props.style}/></div>)
	}
	else
	{
		return (<div style={{display: 'inline-block'}}>
			<Image src={props.src} style={{...props.style, cursor: 'pointer'}} onClick={() => {window.open(props.link, '_blank')}}/>
		</div>)
	}
}

const TemplateText = (props) => (
	<span style={props.style}>{props.content}</span>
)

const TemplateIcon = (props) => (
	<Button variant="primary" style={props.buttonStyle}>
		<i className={props.className} aria-hidden="true"  style={props.iconStyle}></i>
	</Button>
)

const TemplateVideo = (props) => (
		<iframe title={'video'}  src={props.link} style={{...props.style, borderWidth: '0px'}}>
		</iframe>
)

const TemplateButton = (props) => (
		<Button onClick={() => {window.location = props.link}} style={props.style}>{props.content}</Button>
)

const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 3
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1
	}
};

const TemplateCarousel = (props) => (

	<Carousel
	  swipeable={false}
	  draggable={false}
	  showDots={true}
	  responsive={responsive}
	  ssr={true} // means to render carousel on server-side.
	  slidesToSlide={2}
	  infinite={true}
	  autoPlay={false}
	  autoPlaySpeed={1000}
	  keyBoardControl={true}
	  customTransition="all .5"
	  transitionDuration={500}
	  containerClass="carousel-container"
	  removeArrowOnDeviceType={["tablet", "mobile"]}
	  // deviceType={this.props.deviceType}
	  dotListClass="custom-dot-list-style"
	  itemClass="carousel-item-padding-40-px"
	>
		{
			props.content.map((c, i) => (
				<React.Fragment key={i}>
					{c.type === 'image' && <TemplateImage {...c}/>}
					{c.type === 'video' && <TemplateVideo {...c}/>}
				</React.Fragment>
			))
		}
	</Carousel>
)

const TemplateComponent = (props) => (
	<Col style={{...props.style}}>
		{
			props.children.map((child, i) => (
				<React.Fragment key={i}>
					{child.type === 'div' && <TemplateComponent {...child} />} {/**Recursion**/}
					{child.type === 'image' && <TemplateImage {...child}/>}
					{child.type === 'text' && <TemplateText {...child}/>}
					{child.type === 'button' && <TemplateButton  {...child}/>}
					{child.type === 'video' && <TemplateVideo {...child} />}
					{child.type === 'carousel' && <TemplateCarousel {...child} />}
					{child.type === 'icon' && <TemplateIcon {...child} />}
				</React.Fragment>
			))
		}
	</Col>
)

class Template extends React.Component{
	render(){
		return (
			<Container style={{padding: '0px'}}>
				{
					this.props.configuration.map((config, i) => (
						<Row key={`config-${i}`}>
							<TemplateComponent key={i} {...config}/>
						</Row>
					))
				}
			</Container>
		)
	}
}

export default Template