import React from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import logo from '../logo.png'

export default function IntroScreen({ navigator }) {
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

      <TouchableOpacity
        style={{ marginTop: 80 }}
        onPress={() => navigator.push({ name: 'LiquidDotVoteScreen', transition: 'FloatFromBottom' })}
      >
        <Text
          style={{
            color: '#5DA0FF',
            fontSize: 16,
            marginVertical: 20,
            textAlign: 'center',
            textDecorationLine: 'underline',
          }}
        >LEARN MORE</Text>
      </TouchableOpacity>

    </View>
  )
}

IntroScreen.propTypes = {
  navigator: React.PropTypes.shape({}).isRequired,
}
