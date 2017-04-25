import React from 'react'
import { View } from 'react-native'

const LinearGradient = ({ style, children, colors }) => (
  <View style={{ ...style,
    backgroundImage: `linear-gradient(to bottom, ${colors[0]} 0%, ${colors[1]} 100%)`,
  }}
  >
    { children }
  </View>
)

LinearGradient.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.node),
  colors: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  style: React.PropTypes.shape({}),
}

export default LinearGradient
