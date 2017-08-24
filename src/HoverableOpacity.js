import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { TouchableOpacity, View } from 'react-native'

export default class HoverableOpacity extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { children, hoverStyle, outerStyle, style, ...remainingProps } = this.props

    return (
      <TouchableOpacity
        {...remainingProps}
        activeOpacity={0.6}
        style={{
          cursor: 'pointer',
          outline: 'none',
          ...outerStyle,
          ...((this.state.hover ? hoverStyle : {})),
        }}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <View style={style}>{children}</View>
      </TouchableOpacity>
    )
  }
}

HoverableOpacity.propTypes = {
  children: PropTypes.element,
  hoverStyle: PropTypes.shape({}),
  outerStyle: PropTypes.shape({}),
  style: PropTypes.shape({}),
}
