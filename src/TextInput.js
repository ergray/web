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
        backgroundColor: cstyle.panelColor,
        borderBottomColor: cstyle.panelBorderColor,
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        borderLeftColor: cstyle.bodyColorLowlight,
        borderLeftStyle: 'solid',
        borderLeftWidth: 1,
        borderRadius: 3,
        borderTopColor: cstyle.bodyColorLowlight,
        borderTopStyle: 'solid',
        borderTopWidth: 1,
        color: cstyle.bodyColor,
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 5,
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
