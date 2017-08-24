import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ReactNative from 'react-native'
import CommonStyle from './CommonStyle'

const NativeText = ReactNative.Text

const cstyle = CommonStyle()

export default class Text extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const style = this.props.style || {}
    const props = {
      ...this.props,
      style: [{
        color: cstyle.bodyColor,
        lineHeight: '160%',
      }, style],
    }

    return (
      <NativeText {...props} />
    )
  }
}

Text.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}
