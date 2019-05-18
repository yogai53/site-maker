import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { PasswordForgetLink } from '../PasswordForget';

const SignInPage = () => (
	<Container>
		<Row>
			<Col className="mt-5" md={{ span: 6, offset: 3 }}>
				<SignInForm />
				<PasswordForgetLink />
				<SignUpLink />
			</Col>
		</Row>
	</Container>
	);

const INITIAL_STATE = {
	email: '',
	password: '',
	error: null,
};


class SignInFormBase extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	onSubmit = event => {
		const { email, password } = this.state;

		this.props.firebase
		.doSignInWithEmailAndPassword(email, password)
		.then(() => {
			this.setState({ ...INITIAL_STATE });
			this.props.history.push(ROUTES.HOME);
		})
		.catch(error => {
			this.setState({ error });
		});

		event.preventDefault();
	};

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { email, password, error } = this.state;

		const isInvalid = password === '' || email === '';

		return (
			<React.Fragment>
				{error && <Alert variant={'warning'}>
					{error.message}
				</Alert>}
				
				<Form className="mt-5" onSubmit={this.onSubmit}>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control name='email' type="email" placeholder="Enter email" value={email} onChange={this.onChange}/>
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control name='password' type="password" placeholder="Password" value={password} onChange={this.onChange}/>
					</Form.Group>
					
					<Button disabled={isInvalid} variant="primary" type="submit" block>
						Submit
					</Button>
				</Form>
			</React.Fragment>
			);
	}
}

const SignInForm = compose(
	withRouter,
	withFirebase,
	)(SignInFormBase);

export default SignInPage;

export { SignInForm };