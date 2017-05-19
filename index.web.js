/* global window */

import React from 'react'
import ReactNative from 'react-native-web'
import App from './src/App'
import { version } from './package.json'

window.VERSION = version

ReactNative.render(<App />, document.getElementById('react-app')) // eslint-disable-line no-undef
