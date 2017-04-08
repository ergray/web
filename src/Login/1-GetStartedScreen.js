import React from 'react'
import {
  Dimensions,
  Image,
  Text,
  View,
} from 'react-native'
import logo from '../logo.png'

export default function GetStartedScreen() {
  return (
    <View style={{ width: Dimensions.get('window').width }}>
      <Image
        source={logo}
        style={{
          alignSelf: 'center',
          height: 136,
          marginBottom: 17,
          marginTop: 90,
          width: 144,
        }}
      />
      <Text style={{
        color: '#fff',
        fontSize: 22,
        marginBottom: 2,
        textAlign: 'center' }}
      >Welcome to</Text>
      <Text style={{
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center' }}
      >LIQUID DEMOCRACY</Text>
    </View>
  )
}
