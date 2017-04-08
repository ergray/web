import React from 'react'
import { Text, TouchableOpacity, View, WebView } from 'react-native'

// A screen to display intro.liquid.vote in an embedded WebView
function LiquidDotVoteScreen({ navigator }) {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{ backgroundColor: '#222', paddingTop: 20 }}
        onPress={() => navigator.pop()}
      >
        <Text style={{ color: '#fff', fontSize: 18, marginBottom: 8, marginHorizontal: 12, marginTop: 5 }}>Done</Text>
      </TouchableOpacity>
      <WebView
        source={{ uri: 'https://blog.liquid.vote/2016/09/21/what-is-liquid-democracy/' }}
      />
    </View>
  )
}

LiquidDotVoteScreen.disableHeader = true

LiquidDotVoteScreen.propTypes = {
  navigator: React.PropTypes.shape({}).isRequired,
}

export default LiquidDotVoteScreen
