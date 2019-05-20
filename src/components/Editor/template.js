import React from 'react'
import {Container, Row, Col, Image, Button} from 'react-bootstrap'
import Carousel from 'react-multi-carousel';
import ReactQuill from 'react-quill';
import TemplateContext from './template-context'

import 'font-awesome/css/font-awesome.min.css'; 
import 'react-quill/dist/quill.snow.css';
import 'react-multi-carousel/lib/styles.css';

const InternalTemplate = React.createContext();
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
	<TemplateContext.Consumer>
		{context => 
			<InternalTemplate.Consumer>
				{internalTemplateContext => <React.Fragment>
					{ props.editor == true &&  <div ref={context.activeTextEditorRef}><ReactQuill  value={props.content} onChange={(value) => context.handleTextChange(props.id, value)} /> </div>}
					{ props.editor == false &&  <span 
													dangerouslySetInnerHTML={{__html: props.content}} 
													className="templateTextSpan" 
													onClick={() => context.handleTextClick(props.id)} style={props.style}></span> 
												}
				</React.Fragment>}
			</InternalTemplate.Consumer>
		}
	</TemplateContext.Consumer>
)

const TemplateIcon = (props) => (
	<Button variant="primary" style={props.buttonStyle}>
		<i className={props.className} aria-hidden="true"  style={props.iconStyle}></i>
	</Button>
)

const TemplateVideo = (props) => (
		<iframe  title={'video'}  src={props.link} style={{...props.style, borderWidth: '0px'}}>
		</iframe>
)

const TemplateButton = (props) => (
		<Button  onClick={() => {window.location = props.link}} style={props.style}>{props.content}</Button>
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
	  draggable={true}
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
	<InternalTemplate.Consumer>
				{internalTemplateContext =>
				<Col draggable 
					onDragEnter={e=>internalTemplateContext.handleDragEnter(e)} 
					onDrop={e => internalTemplateContext.handleDragDrop(e, props.id)} 
					onDragOver={(e) => internalTemplateContext.handleDragOver(e)} 
					onDragStart={(e) => internalTemplateContext.handleDragStart(e, props.id)} 
					style={{...props.style}}
				>
					{
						props.children.map((child, i) => (
							<React.Fragment key={i}>
								{child.type === 'div' && <TemplateComponent  {...child} />} {/**Recursion**/}
								{child.type === 'image' && <TemplateImage  {...child}/>}
								{child.type === 'text' && <TemplateText  handleTextChange={props.handleTextChange} {...child}/>}
								{child.type === 'button' && <TemplateButton   {...child}/>}
								{child.type === 'video' && <TemplateVideo  {...child} />}
								{child.type === 'carousel' && <TemplateCarousel  {...child} />}
								{child.type === 'icon' && <TemplateIcon  {...child} />}
							</React.Fragment>
						))
					}
				</Col>}
	</InternalTemplate.Consumer>
)

class Template extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			handleDragStart: this.handleDragStart,
			handleDragEnter: this.handleDragEnter, 
			handleDragOver: this.handleDragOver, 
			handleDragDrop: this.handleDragDrop
		}
	}
	handleDragStart = (e, id) => {
		e.dataTransfer.effectAllowed='move';
		e.dataTransfer.setData("Text", id);
		return true;
	}

	handleDragEnter = (e) => {
		e.preventDefault()
		return true;
	}

	handleDragOver = (e) => {
		e.preventDefault()
		return false
	}

	handleDragDrop = (e, dropId) => {
		const dragId = e.dataTransfer.getData("Text");
		this.props.handleElementSwap(dragId, dropId)
	}

	render(){
		return (
			<Container style={{padding: '0px'}}>
				{
					this.props.configuration.map((config, i) => (
						<Row key={`config-${i}`}>
							<InternalTemplate.Provider value={this.state}> 
								<TemplateComponent handleDragStart={this.handleDragStart} key={i} {...config}/>
							</InternalTemplate.Provider>
						</Row>
					))
				}
			</Container>
		)
	}
}

export default Template