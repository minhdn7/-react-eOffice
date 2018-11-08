/** @format */

import {AppRegistry} from 'react-native';
// import App from './App';
import App from './app/App.js';
import Login from './app/components/screen/Login.js';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
