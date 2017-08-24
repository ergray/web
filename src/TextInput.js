import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ReactNative from 'react-native'
import CommonStyle from './CommonStyle'

const NativeTextInput = ReactNative.TextInput

const cstyle = CommonStyle()

export default class TextInput extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { style, ...remainingProps } = this.props
    const props = {
      ...remainingProps,
      style: {
        color: cstyle.bodyColor,
        ...style,
      },
    }

    return (
      <NativeTextInput {...props} />
    )
  }
}

TextInput.propTypes = {
  style: PropTypes.shape({}),
}
