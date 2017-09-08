import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ReactNative, { View } from 'react-native'
import CommonStyle from 'CommonStyle'
import Text from 'Text'

const NativeTextInput = ReactNative.TextInput

const cstyle = CommonStyle()

export default class TextInput extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { error, style, ...remainingProps } = this.props
    const errorColor = 'rgb(204,0,0)'
    const inputStyle = {
      backgroundColor: cstyle.panelColor,
      borderBottomColor: cstyle.panelBorderColor,
      borderBottomStyle: 'solid',
      borderBottomWidth: 1,
      borderLeftColor: cstyle.bodyColorLowlight,
      borderLeftStyle: 'solid',
      borderLeftWidth: 1,
      borderRadius: 3,
      borderRightColor: cstyle.panelBorderColor,
      borderRightStyle: 'solid',
      borderRightWidth: 1,
      borderTopColor: cstyle.bodyColorLowlight,
      borderTopStyle: 'solid',
      borderTopWidth: 1,
      color: cstyle.bodyColor,
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 5,
      ...style,
    }

    if (error) {
      inputStyle.borderBottomColor = errorColor
      inputStyle.borderLeftColor = errorColor
      inputStyle.borderRightColor = errorColor
      inputStyle.borderTopColor = errorColor
    }

    return (
      <View className={error ? 'form-error' : ''}>
        <NativeTextInput aria-invalid={!!error} style={inputStyle} {...remainingProps} />
        {!!error && <Text style={{ color: errorColor, fontSize: '13px', paddingTop: '.3rem', textAlign: 'center' }} >{error}</Text>}
      </View>
    )
  }
}

TextInput.propTypes = {
  error: PropTypes.string,
  style: PropTypes.shape({}),
}
