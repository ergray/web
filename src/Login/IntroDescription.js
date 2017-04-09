import React from 'react'
import {
  Text,
  View,
} from 'react-native'

export default function IntroDescription() {
  return (
    <View style={{
      paddingHorizontal: 30,
      width: 650,
    }}
    >
      <Text
        style={{
          color: '#fff',
          fontSize: 18,
          fontWeight: 'bold',
        }}
      >REAL POLITICAL REPRESENTATION</Text>

      <Text
        style={{
          color: '#fff',
          fontSize: 20,
          fontWeight: '200',
          marginTop: 70,
        }}
      >Reclaim your voice in government.</Text>
      <Text
        style={{
          color: '#fff',
          fontSize: 20,
          fontWeight: '200',
          marginTop: 30,
        }}
      >Hold politicians accountable.</Text>
      <Text
        style={{
          color: '#fff',
          fontSize: 20,
          fontWeight: '200',
          marginTop: 30,
        }}
      >Remove corruption.</Text>

      <a
        href="https://blog.liquid.vote/2016/09/21/what-is-liquid-democracy/"
        rel="noopener noreferrer"
        style={{
          color: '#5DA0FF',
          fontSize: 16,
          marginBottom: 20,
          marginTop: 80,
        }}
        target="_blank"
      >LEARN MORE</a>

    </View>
  )
}

IntroDescription.propTypes = {
}
