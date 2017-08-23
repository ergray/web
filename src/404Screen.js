/* eslint-disable no-underscore-dangle, react-filenames/filename-matches-component */

import React from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import Button from './Button'

function _404Screen({ history }) {
  return (
    <View style={{ alignSelf: 'center', marginHorizontal: 30 }}>

      <Text style={{ fontSize: 26, marginVertical: 60 }}>Not sure what page you're looking for.</Text>

      <Button
        primary
        history={history}
        text="Feedback"
        to="/feedback"
      />

      <Button
        history={history}
        style={{ marginTop: '.5rem' }}
        text="&#9664;&nbsp; HOME"
        to="/"
      />
    </View>
  )
}

_404Screen.title = '404 PAGE NOT FOUND'

_404Screen.propTypes = {
  history: React.PropTypes.shape({}),
}

export default connect()(_404Screen)
