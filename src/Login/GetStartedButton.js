import React from 'react'
import {
  Text,
  TouchableOpacity,
} from 'react-native'

export default function GetStartedButton({ pressGetStarted }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        backgroundImage: 'linear-gradient(-180deg, #B4ED50 0%, #429321 100%)',
        borderColor: '#5F5F5F',
        borderRadius: 6,
        borderWidth: 1,
        height: 64,
        justifyContent: 'center',
        paddingHorizontal: 30,
      }}
      onPress={pressGetStarted}
    >
      <Text
        style={{
          color: '#fff',
          fontFamily: 'ArialMT',
          fontSize: 25,
          fontWeight: '700',
          letterSpacing: 2,
          textAlign: 'center',
        }}
      >GET STARTED</Text>
    </TouchableOpacity>
  )
}

GetStartedButton.propTypes = {
  pressGetStarted: React.PropTypes.func.isRequired,
}
