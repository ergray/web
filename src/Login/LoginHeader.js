import React from 'react'
import {
  Image,
  Text,
  View,
} from 'react-native'
import logo from '../logo.png'

export default function LoginHeader() {
  return (
    <View style={{ alignSelf: 'center', marginBottom: 120, marginTop: 20 }}>
      <Image
        source={logo}
        style={{
          alignSelf: 'center',
          height: 100,
          marginBottom: 17,
          width: 106,
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
