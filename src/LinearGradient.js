import React from 'react'
import { View } from 'react-native'

const LinearGradient = ({ style, children, colors }) => (
  <View
    children={children} // eslint-disable-line
    style={{ ...style,
      backgroundImage: `linear-gradient(to bottom, ${colors[0]} 0%, ${colors[1]} 100%)`,
    }}
  />
)

LinearGradient.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.node),
  colors: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  style: React.PropTypes.shape({}),
}

export default LinearGradient
