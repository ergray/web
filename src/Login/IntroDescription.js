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
          fontSize: 26,
          fontWeight: 'bold',
        }}
      >REAL POLITICAL REPRESENTATION</Text>

      <View style={{
        marginLeft: 30,
        marginVertical: 50,
      }}
      >
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            fontWeight: '200',
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
      </View>

      <a
        href="https://blog.liquid.vote/2016/09/21/what-is-liquid-democracy/"
        rel="noopener noreferrer"
        style={{
          borderColor: '#5DA0FF',
          borderRadius: 13,
          borderStyle: 'solid',
          borderWidth: 1,
          color: '#5DA0FF',
          fontSize: 16,
          marginLeft: 100,
          padding: '18 60',
          textDecorationLine: 'none',
          width: 110,
        }}
        target="_blank"
      >LEARN MORE</a>

    </View>
  )
}

IntroDescription.propTypes = {
}
