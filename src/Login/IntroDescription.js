import React from 'react'
import {
  Linking,
  Text,
  View,
} from 'react-native'
import HoverableOpacity from '../HoverableOpacity'

export default function IntroDescription({ large }) {
  return (
    <View style={{
      alignItems: 'center',
      backgroundImage: 'linear-gradient(-180deg, #fff 0%, hsla(0,0%,100%,0.7) 100%)',
      borderRadius: 10,
      boxShadow: 'rgba(0,0,0,0.3) 0px 60px 28px -40px',
      height: 218,
      justifyContent: 'space-around',
      marginBottom: 60,
    }}
    >
      <Text
        style={{
          color: 'hsl(0, 0%, 28%)',
          fontSize: 28,
          fontWeight: '700',
        }}
      >VOTE ON LAWS</Text>
      <Text
        style={{
          color: 'hsl(0, 0%, 32%)',
          fontSize: large ? 24 : 22,
          fontWeight: '700',
        }}
      >Hold politicians accountable.</Text>

      <HoverableOpacity
        hoverStyle={{ backgroundColor: 'rgba(59,89,152,0.5)' }}
        style={{ padding: 3 }}
        onPress={() => {
          Linking.openURL('https://blog.liquid.vote/2016/09/21/what-is-liquid-democracy/')
          .catch(() => {})
        }}
      >
        <Text
          style={{
            color: '#0000FF',
            cursor: 'pointer',
            fontSize: 16,
            textDecorationLine: 'underline',
          }}
        >LEARN MORE</Text>
      </HoverableOpacity>

    </View>
  )
}

IntroDescription.propTypes = {
  large: React.PropTypes.bool,
}
