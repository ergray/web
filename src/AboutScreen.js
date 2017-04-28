import React from 'react'
import { View } from 'react-native'
import Iframe from 'react-iframe'

// https://blog.liquid.vote/2016/09/21/what-is-liquid-democracy/

const AboutScreen = () => (
  <View style={{ backgroundColor: '#fff' }}>
    <Iframe
      allowFullScreen
      display="initial"
      position="relative"
      url="https://blog.liquid.vote/2016/09/21/what-is-liquid-democracy/"
    />
  </View>
)

AboutScreen.disableHeader = true

AboutScreen.propTypes = {
}

export default AboutScreen
