import PropTypes from 'prop-types'
import React from 'react'
import ReactNative, { Platform, View } from 'react-native'
import ActivityIndicatorImage from 'ActivityIndicator.svg'
import CommonStyle from 'CommonStyle'
import Text from 'Text'

const cstyle = CommonStyle()

export default function ActivityIndicator({ size, text }) {
  const defaultSize = 30

  const containerStyle = {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '2rem',
  }

  const textStyle = {
    color: cstyle.activityIndicatorColor,
    fontSize: 13,
    marginBottom: '2rem',
  }

  if (Platform.OS === 'web') {
    return (
      <View style={containerStyle}>
        {!!text && <Text style={textStyle}>{text}</Text>}
        <img
          alt="Loading..."
          className="rotating"
          src={ActivityIndicatorImage}
          style={{ height: size || defaultSize, resizeMode: 'contain', width: size }}
        />
      </View>
    )
  }

  return (
    <View style={containerStyle}>
      {!!text && <Text style={textStyle}>{text}</Text>}
      <ReactNative.ActivityIndicator {...this.props} size={size || defaultSize} />
    </View>
  )
}

ActivityIndicator.propTypes = {
  size: PropTypes.number,
  text: PropTypes.string,
}
