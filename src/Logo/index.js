import React from 'react'
import { View } from 'react-native'
import LiquidName from './liquid-text-dark.svg'
import LiquidMark from './liquid-mark.svg'

export default function Logo({ style }) { // eslint-disable-line react-filenames/filename-matches-component
  return (
    <View style={{ flexDirection: 'row', ...style }}>
      <img alt="LIQUID" src={LiquidName} style={{ height: '100%', marginRight: 10 }} />
      <img alt="^" src={LiquidMark} style={{ height: '100%' }} />
    </View>
  )
}

Logo.propTypes = {
  style: React.PropTypes.shape({}),
}
