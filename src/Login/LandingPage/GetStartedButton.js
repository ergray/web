import PropTypes from 'prop-types'
import React from 'react'
import {
  Text,
} from 'react-native'
import HoverableOpacity from '../../HoverableOpacity'

export default function GetStartedButton({ large, pressGetStarted }) {
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
      }}
      onPress={pressGetStarted}
    >
      <Text
        style={{
          color: '#fff',
          fontSize: large ? 24 : 21,
          fontWeight: '700',
          letterSpacing: large ? 2 : 0,
          textAlign: 'center',
        }}
      >RECLAIM YOUR VOICE</Text>
    </HoverableOpacity>
  )
}

GetStartedButton.propTypes = {
  large: PropTypes.bool,
  pressGetStarted: PropTypes.func.isRequired,
}
