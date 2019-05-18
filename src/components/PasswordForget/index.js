import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';

const PasswordForgetPage = () => (
    <Container>
    <Row>
      <Col className="mt-5" md={{ span: 6, offset: 3 }}>
        <PasswordForgetForm />
      </Col>
    </Row>
  </Container>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { email, error } = this.state;

    const isInvalid = email === '';

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

          
          <Button disabled={isInvalid} variant="primary" type="submit" block>
            Reset My Password
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };