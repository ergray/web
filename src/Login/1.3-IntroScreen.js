import React from 'react'
import {
  Image,
  Text,
  View,
} from 'react-native'
import logo from '../logo.png'

export default function IntroScreen() {
  return (
    <View style={{
      paddingHorizontal: 30,
      width: 450,
    }}
    >
      <Image
        source={logo}
        style={{
          alignSelf: 'center',
          height: 56,
          marginBottom: 12,
          marginTop: 32,
          width: 59,
        }}
      />
      <Text style={{
        color: '#fff',
        fontSize: 22,
        marginBottom: 2,
        textAlign: 'center' }}
      >Welcome to</Text>
      <Text
        style={{
          color: '#fff',
          fontSize: 18,
          fontWeight: 'bold',
          textAlign: 'center',
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
          textAlign: 'center',
          textDecorationLine: 'underline',
        }}
        target="_blank"
      >LEARN MORE</a>

    </View>
  )
}

IntroScreen.propTypes = {
  navigator: React.PropTypes.shape({}).isRequired,
}
