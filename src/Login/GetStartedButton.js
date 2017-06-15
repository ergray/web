import React from 'react'
import {
  Text,
} from 'react-native'
import HoverableOpacity from '../HoverableOpacity'

export default function GetStartedButton({ pressGetStarted }) {
  return (
    <HoverableOpacity
      activeOpacity={0.8}
      hoverStyle={{
        backgroundImage: 'linear-gradient(-180deg, #B4ED50 0%, #47a521 100%)',
      }}
      outerStyle={{
        backgroundImage: 'linear-gradient(-180deg, #B4ED50 0%, #429321 100%)',
        borderColor: '#5F5F5F',
        borderRadius: 6,
        borderWidth: 1,
        boxShadow: 'rgba(0, 30, 0, 0.5) 0px 40px 28px -25px',
      }}
      style={{
        height: 64,
        justifyContent: 'center',
        paddingHorizontal: 30,
      }}
      onPress={pressGetStarted}
    >
      <Text
        style={{
          color: '#fff',
          fontSize: 25,
          fontWeight: '700',
          letterSpacing: 2,
          textAlign: 'center',
        }}
      >COUNT ME IN</Text>
    </HoverableOpacity>
  )
}

GetStartedButton.propTypes = {
  pressGetStarted: React.PropTypes.func.isRequired,
}
