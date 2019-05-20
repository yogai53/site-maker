const FONT_SIZE = '12px'
const COLOR = 'black'
const BODY_PADDING = '100px'
const FOOTER_PADDING = '150px'
export const configuration = [
	{
		type: 'div',
		cssClass: 'row',
		style: {
			marginTop: '50px'
		},
		children: [
			{
				type: 'image',
				src: 'https://www.designevo.com/images/logo/designevo-logo.png?v=1.0.0',
				link: '/',
				style: {
					height: '30px',
					position: 'relative'
				}				
			},
			{
				type: 'div',
				cssClass: 'row',
				style: {
					width: 'auto',
					display: 'inline',
					float: 'right',
					marginTop: '0px'
				},
				children: [
						{
							type: 'icon',
							className: 'fa fa-facebook',
							link: '/',
							buttonStyle: {
								borderRadius: 50,
								height: '40px',
								width: '40px',
								marginLeft: '5px',
								marginRight: '5px',
								position: 'relative'
							},
							iconStyle: {
								fontSize: '15px'
							}			
						},
						{
							type: 'icon',
							className: 'fa fa-twitter',
							link: '/',
							buttonStyle: {
								borderRadius: 50,
								height: '40px',
								width: '40px',
								marginLeft: '5px',
								marginRight: '5px',
								position: 'relative'
							},
							iconStyle: {
								fontSize: '15px'
							}			
						},
						{
							type: 'icon',
							className: 'fa fa-google-plus',
							link: '/',
							buttonStyle: {
								borderRadius: 50,
								height: '40px',
								width: '40px',
								marginLeft: '5px',
								marginRight: '5px',
								position: 'relative'
							},
							iconStyle: {
								fontSize: '15px'
							}			
						},
						{
							type: 'div',
							style:{display: 'inline', width: 'auto'},
							children: [
								{
									type: 'text',
									editor: false,
									content: 'John | Marketing executive officer|Email yoga@tesark.in|Tel: 9790614535', 
									style: {color: COLOR, fontSize: FONT_SIZE, display: 'inline-block'}
								}				
							]
						}
				]
			}	
		]
	},
	{
		type: 'div',
		cssClass: 'row',
		style: {marginTop: '50px', textAlign: 'center', paddingLeft: BODY_PADDING, paddingRight: BODY_PADDING},
		children: [
			{
				type: 'text',
				editor: false,
				content: 'Lorem Ipsum',
				style: {color: COLOR, fontSize: FONT_SIZE + 2, fontWeight: 800, display: 'block'}
			},
			{
				type: 'text',
				editor: false,
				content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
				style: {color: COLOR, fontSize: FONT_SIZE, display: 'block'}
			}
		]
	},
	{
		type: 'div',
		cssClass: 'row',
		style: {
			marginTop: '50px', paddingLeft: BODY_PADDING, paddingRight: BODY_PADDING
		},
		children: [
			{
				type: 'video',
				link: 'https://www.youtube.com/embed/tgbNymZ7vqY',
				style: {
					height: '400px',
					width: '100%'
				}
			}
		]
	},
	{
		type: 'div',
		cssClass: 'row',
		style: {marginTop: '50px', flex: 1, textAlign: 'center', paddingLeft: BODY_PADDING, paddingRight: BODY_PADDING},
		children: [
			{
				type: 'button',
				link: 'https://www.youtube.com/embed/tgbNymZ7vqY',
				content: 'BUTTON 1',
				style: {
					width: '150px',
					height: '40px',
					marginLeft: '10px',
					marginRight: '10px'
				}
			},
			{
				type: 'button',
				link: 'https://www.youtube.com/embed/tgbNymZ7vqY',
				content: 'BUTTON 2',
				style: {
					width: '150px',
					height: '40px',
					marginLeft: '10px',
					marginRight: '10px'
				}
			},
			{
				type: 'button',
				link: 'https://www.youtube.com/embed/tgbNymZ7vqY',
				content: 'BUTTON 3',
				style: {
					width: '150px',
					height: '40px',
					marginLeft: '10px',
					marginRight: '10px'
				}
			}
		]
	},
	{
		type: 'div',
		cssClass: 'row',
		style: {
			marginTop: '50px', paddingLeft: BODY_PADDING, paddingRight: BODY_PADDING
		},
		children: [
			{
				type: 'text',
				editor: false,
				content: 'Lorem Ipsum',
				style: {color: COLOR, fontSize: FONT_SIZE + 2}
			}
		]
	},
	{
		type: 'div',
		cssClass: 'row',
		style: {paddingLeft: BODY_PADDING, paddingRight: BODY_PADDING},
		children: [
			{
				type: 'carousel',
				content: [
					{
						type: 'video',
						link: 'https://www.youtube.com/embed/tgbNymZ7vqY',
						style: {
							height: '200px',
							width: '100%',
							padding: '20px'
						},
						caption: {
							type: 'text',
							editor: false,
							content: 'Content 1',
							style: {color: COLOR, fontSize: FONT_SIZE}
						}			
					},
					{
						type: 'video',
						link: 'https://www.youtube.com/embed/tgbNymZ7vqY',
						style: {
							height: '200px',
							width: '100%',
							padding: '20px'
						},
						caption: {
							type: 'text',
							editor: false,
							content: 'Content 1',
							style: {color: COLOR, fontSize: FONT_SIZE}
						}			
					},
					{
						type: 'video',
						link: 'https://www.youtube.com/embed/tgbNymZ7vqY',
						style: {
							height: '200px',
							width: '100%',
							padding: '20px'
						},
						caption: {
							type: 'text',
							editor: false,
							content: 'Content 1',
							style: {color: COLOR, fontSize: FONT_SIZE}
						}			
					},
				]
			}
		]
	},
	{
		type: 'div',
		cssClass: 'row',
		justifyContent: 'center',
		style: {marginTop: '50px', textAlign: 'center', background: '#f2f6ff', padding: '30px', paddingLeft: FOOTER_PADDING, paddingRight: FOOTER_PADDING},
		children: [
			{
				type: 'text',
				editor: false,
				content: 'The carousel is a slideshow for cycling through a series of content, built with CSS 3D transforms and a bit of JavaScript. It works with a series of images, text, or custom markup.',
				style: {fontSize: FONT_SIZE}
			}
		]
	}
]