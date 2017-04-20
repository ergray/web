import React from 'react'
import {
  Text,
  View,
} from 'react-native'

export default function IntroDescription() {
  return (
    <View style={{
      backgroundImage: 'linear-gradient(-180deg, #fff 0%, hsla(0,0%,100%,0.4) 100%)',
      borderRadius: 10,
      boxShadow: '6px 6px 25px 0 rgba(0,0,0,0.2)',
      height: 218,
      justifyContent: 'space-around',
      marginBottom: 60,
      paddingHorizontal: 20,
      paddingVertical: 10,
    }}
    >
      <Text
        style={{
          color: '#222',
          fontSize: 30,
          fontWeight: '700',
        }}
      >Vote on laws.</Text>
      <Text
        style={{
          color: '#222',
          fontSize: 30,
          fontWeight: '700',
        }}
      >Hold politicians accountable.</Text>

      <a
        href="https://blog.liquid.vote/2017/04/08/liquid-privacy/"
        rel="noopener noreferrer"
        style={{
          color: '#0000FF',
          cursor: 'pointer',
          fontSize: 16,
          width: 115,
        }}
        target="_blank"
      >LEARN MORE</a>

    </View>
  )
}

IntroDescription.propTypes = {
}
