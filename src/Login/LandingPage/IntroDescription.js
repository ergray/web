/* global window */

import React from 'react'
import {
  Text,
  View,
} from 'react-native'
import HoverableOpacity from '../../HoverableOpacity'

export default function IntroDescription({ large }) {
  return (
    <View style={{
      alignItems: 'center',
      backgroundImage: 'linear-gradient(-180deg, #fff 0%, hsla(0,0%,100%,0.7) 100%)',
      borderRadius: 10,
      boxShadow: 'rgba(0,0,0,0.3) 0px 60px 28px -40px',
      height: 205,
      justifyContent: 'space-around',
      marginBottom: 60,
      paddingVertical: 15,
    }}
    >
      <Text
        style={{
          color: 'hsl(0, 0%, 32%)',
          fontSize: large ? 24 : 18,
          fontWeight: '700',
        }}
      >Hold politicians accountable</Text>
      <Text
        style={{
          bottom: 13,
          color: 'hsl(0, 0%, 22%)',
          fontSize: large ? 45 : 34,
          fontWeight: '700',
          position: 'relative',
        }}
      >VOTE&nbsp;
        <Text style={{ bottom: 2, fontSize: large ? 31 : 26, position: 'relative' }}>ON</Text>
        &nbsp;LAWS
      </Text>

      <HoverableOpacity
        hoverStyle={{ backgroundColor: 'hsla(0, 0%, 0%, 0.1)', borderColor: 'black' }}
        outerStyle={{ borderColor: 'white', borderRadius: 3, borderStyle: 'solid', borderWidth: 1, cursor: 'pointer', padding: 3 }}
        onPress={() => { window.scrollTo(0, 750) }}
      >
        <Text
          style={{
            color: '#0000FF',
            cursor: 'pointer',
            fontSize: 16,
            textDecorationLine: 'underline',
          }}
        >LEARN MORE</Text>
      </HoverableOpacity>

    </View>
  )
}

IntroDescription.propTypes = {
  large: React.PropTypes.bool,
}
