import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

const SignUpPage = () => (
  <Container>
    <Row>
      <Col className="mt-5" md={{ span: 6, offset: 3 }}>
        <SignUpForm />
      </Col>
    </Row>
  </Container>
  );

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    this.props.firebase
    .doCreateUserWithEmailAndPassword(email, passwordOne)
    .then(authUser => {
      this.props.firebase
        .user(authUser.user.uid)
        .set({
          username,
          email,
        });
    })
    .then(authUser => {
      this.setState({ ...INITIAL_STATE });
      this.props.history.push(ROUTES.HOME)
    })
    .catch(error => {
      this.setState({ error });
    });

    event.preventDefault();
  }

  onChange = event => { this.setState({ [event.target.name]: event.target.value }) }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';

    return (
      <React.Fragment>
        {error && <Alert variant={'warning'}>
          {error.message}
        </Alert>}
        
        <Form className="mt-5" onSubmit={this.onSubmit}>
          <Form.Group controlId="formBasicUser">
            <Form.Label>UserName</Form.Label>
            <Form.Control name='username' type="text" placeholder="Enter Username" value={username} onChange={this.onChange}/>
            <Form.Text className="text-muted">
            Enter your Full Name.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control name='email' type="email" placeholder="Enter email" value={email} onChange={this.onChange}/>
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name='passwordOne' type="password" placeholder="Password" value={passwordOne} onChange={this.onChange}/>
          </Form.Group>

          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control name='passwordTwo' type="password" placeholder="Confirm Password" value={passwordTwo} onChange={this.onChange}/>
          </Form.Group>

          <Button disabled={isInvalid} variant="primary" type="submit" block>
            Submit
          </Button>
        </Form>
      </React.Fragment>
      
      );
  }
}

const SignUpForm = compose(
  withRouter,
  withFirebase,
  )(SignUpFormBase);

  const SignUpLink = () => (
    <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
    );

  export default SignUpPage;

  export { SignUpForm, SignUpLink };