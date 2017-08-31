import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Tappable from 'react-tappable'
import { Platform, TouchableOpacity, View } from 'react-native'

export default class HoverableOpacity extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { children, hoverStyle, onPress, outerStyle, style } = this.props

    if (Platform.OS === 'web') {
      return (
        <Tappable
          component="div"
          moveThreshold={150}
          style={{
            cursor: 'pointer',
            outline: 'none',
            ...outerStyle,
            ...((this.state.hover ? hoverStyle : {})),
          }}
          onMouseEnter={() => this.setState({ hover: true })}
          onMouseLeave={() => this.setState({ hover: false })}
          onTap={onPress}
        >
          <View style={style}>{children}</View>
        </Tappable>
      )
    }

    return (
      <TouchableOpacity
        accessibilityRole="button"
        style={{
          cursor: 'pointer',
          outline: 'none',
          ...outerStyle,
          ...((this.state.hover ? hoverStyle : {})),
        }}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        onPress={onPress}
      >
        <View style={style}>{children}</View>
      </TouchableOpacity>
    )
  }
}

HoverableOpacity.propTypes = {
  children: PropTypes.element,
  hoverStyle: PropTypes.shape({}),
  onPress: PropTypes.func,
  outerStyle: PropTypes.shape({}),
  style: PropTypes.shape({}),
}
