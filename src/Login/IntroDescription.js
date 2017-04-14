import React from 'react'
import {
  Text,
  View,
} from 'react-native'

export default function IntroDescription() {
  return (
    <View style={{
      alignItems: 'center',
      flex: 10,
      flexBasis: 530,
      marginBottom: 60,
      paddingHorizontal: 30,
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
        alignSelf: 'flex-start',
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
          padding: '18 0',
          textAlign: 'center',
          textDecorationLine: 'none',
          width: 232,
        }}
        target="_blank"
      >LEARN MORE</a>

    </View>
  )
}

IntroDescription.propTypes = {
}
