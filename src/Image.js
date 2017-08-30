import PropTypes from 'prop-types'
import React from 'react'
import ReactNative, { Platform } from 'react-native'

export default function Image({ alt, size, source, style }) {
  if (Platform.OS === 'web') {
    const sizeStyle = size ? { height: size, width: size } : {}
    return <img alt={alt} src={source} style={{ ...sizeStyle, ...style }} />
  }

  return <ReactNative.Image {...this.props} />
}

Image.propTypes = {
  alt: PropTypes.string,
  size: PropTypes.number,
  source: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  style: PropTypes.shape({}),
}
