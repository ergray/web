/* eslint-disable no-underscore-dangle, react-filenames/filename-matches-component */

import React from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import HoverableOpacity from './HoverableOpacity'

function _404Screen({ history }) {
  return (
    <View style={{ alignSelf: 'center', marginHorizontal: 30 }}>

      <Text style={{ color: '#fff', fontSize: 26, marginVertical: 60 }}>Not sure what page you're looking for.</Text>

      <HoverableOpacity
        activeOpacity={0.5}
        hoverStyle={{ backgroundColor: 'rgba(5, 165, 209, 0.1)' }}
        style={{
          alignItems: 'center',
          borderColor: 'rgb(5, 165, 209)',
          borderRadius: 5,
          borderWidth: 2,
          height: 38,
          justifyContent: 'center',
        }}
        onPress={() => {
          history.replace('/feedback')
        }}
      >
        <Text style={{ color: '#fff', fontSize: 13 }}>
          FEEDBACK
        </Text>
      </HoverableOpacity>

      <HoverableOpacity
        activeOpacity={0.5}
        hoverStyle={{ backgroundColor: 'hsla(0, 0%, 100%, 0.1)' }}
        outerStyle={{
          marginTop: 30,
        }}
        style={{
          alignItems: 'center',
          borderColor: 'white',
          borderRadius: 5,
          borderWidth: 1,
          height: 38,
          justifyContent: 'center',
        }}
        onPress={() => {
          history.replace('/sf')
        }}
      >
        <Text style={{ color: '#fff', fontSize: 13 }}>
          &#9664;&nbsp; HOME
        </Text>
      </HoverableOpacity>

    </View>
  )
}

_404Screen.title = '404 PAGE NOT FOUND'

_404Screen.propTypes = {
  history: React.PropTypes.shape({}),
}

export default connect()(_404Screen)
