import React from 'react'
import {Container, Row, Col, Image, Button} from 'react-bootstrap'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'font-awesome/css/font-awesome.min.css'; 
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
		<iframe src={props.link} style={{...props.style, borderWidth: '0px'}}>
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
				<React.Fragment>
					{c.type == 'image' && <TemplateImage {...c}/>}
					{c.type == 'video' && <TemplateVideo {...c}/>}
				</React.Fragment>
			))
		}
	</Carousel>
)

const TemplateComponent = (props) => (
	<Col style={{...props.style}}>
		{
			props.children.map((child, i) => {
				if(child.type == 'div') return <TemplateComponent key={i} {...child} /> //Recursion


				if(child.type == 'image') return <TemplateImage key={i} {...child}/>
				if(child.type == 'text') return <TemplateText key={i} {...child}/>
				if(child.type == 'button') return <TemplateButton key={i}  {...child}/>
				if(child.type == 'video') return <TemplateVideo key={i} {...child} />
				if(child.type == 'carousel') return <TemplateCarousel key={i} {...child} />
				if(child.type == 'icon') return <TemplateIcon key={i} {...child} />
			})
		}
	</Col>
)

class Market extends React.Component{
	  constructor(props) {
    super(props)
    this.state = { text: '' } // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this)
  }
 
  handleChange(value) {
    this.setState({ text: value })
  }
	render(){
		return(
			<React.Fragment>
				<Container style={{padding: '0px'}}>
					{
						configuration.map((config, i) => (
							<Row key={`config-${i}`}>
								<TemplateComponent key={i} {...config}/>
							</Row>
						))
					}
					<ReactQuill value={this.state.text}
	                  onChange={this.handleChange} />
					</Container>
			</React.Fragment>
		)
	}
}

export default Market