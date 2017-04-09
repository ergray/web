import React from 'react'
import {
  Image,
  Text,
  View,
} from 'react-native'
import legislatureIcon from './legislature-icon.png'

function HomeScreenHeader() {
  return (
    <View style={{
      alignItems: 'center',
      backgroundColor: '#000',
      borderBottomWidth: 1,
      borderColor: '#222',
      flexDirection: 'row',
      height: 50,
      justifyContent: 'center',
      width: 884,
    }}
    >
      <Image
        source={legislatureIcon}
        style={{
          height: 20,
          marginRight: 7,
          width: 20,
        }}
      />
      <Text
        style={{
          color: '#fff',
          fontSize: 19,
          fontWeight: '700',
        }}
      >CITY LEGISLATURE</Text>
      <View style={{ width: 27 }} />
    </View>
  )
}

HomeScreenHeader.propTypes = {}

export default HomeScreenHeader
