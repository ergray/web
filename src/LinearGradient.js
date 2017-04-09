import React from 'react'
import { View } from 'react-native'

// TODO: Add support for 'colors' prop

const LinearGradient = ({ style, children }) => (
  <View
    children={children} // eslint-disable-line
    style={{ ...style }}
  />
)

LinearGradient.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.node).isRequired,
  // colors: React.PropTypes.arrayOf(React.PropTypes.string).isRequired, // TODO
  style: React.PropTypes.shape({}),
}

export default LinearGradient
