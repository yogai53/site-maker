import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './custom.scss';
import Firebase, { FirebaseContext } from './components/Firebase';
import Editor from './components/Editor'

ReactDOM.render(
	<FirebaseContext.Provider value={new Firebase()}>
		<App />
	</FirebaseContext.Provider>
	, document.getElementById('root')
);

serviceWorker.unregister();
