import React from 'react';

import { withFirebase } from '../Firebase';
import { Button } from 'react-bootstrap';
const SignOutButton = ({ firebase }) => (
	<Button onClick={firebase.doSignOut} variant="warning">
		SignOut
	</Button>
);

export default withFirebase(SignOutButton);