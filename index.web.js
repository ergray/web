/* global window, document */

import React from 'react'
import a11y from 'react-a11y'
import ReactNative from 'react-native-web'
import App from './src/App'
import { version } from './package.json'

if (process.env.NODE_ENV !== 'production') {
  a11y(React, { filterFn: name => name !== 'Link' })
}

// Force https in production
if (window.location.port !== '3000' && window.location.protocol !== 'https:') {
  window.location.href = `https:${window.location.href.substring(window.location.protocol.length)}`
}

window.VERSION = version

const containerElem = document.createElement('div')
document.body.appendChild(containerElem)

ReactNative.render(<App />, containerElem)
