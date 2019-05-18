import React from 'react';
import { withAuthorization } from '../Session';
const AccountPage = () => (
  <div>
    <h1>Account</h1>
  </div>
);


const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);