import React from 'react'
import {
  Navigator,
} from 'react-native'

function NoHeader({ ...props }) {
  return (
    <Navigator.NavigationBar
      {...props}
      routeMapper={{
        LeftButton: () => {},
        RightButton: () => {},
        Title: () => {},
      }}
      style={{ height: 0 }}
    />
  )
}

NoHeader.propTypes = {}

export default NoHeader
