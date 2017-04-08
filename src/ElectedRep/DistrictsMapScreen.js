import React from 'react'
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
} from 'react-native'
import districtsMap from './districts-map.png'

function DistrictsMapScreen() {
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}
      maximumZoomScale={2}
      style={{ backgroundColor: '#fff' }}
    >
      <Image
        source={districtsMap}
        style={{
          height: Dimensions.get('window').width * (478 / 500),
          width: Dimensions.get('window').width,
        }}
      />
      <Text style={{ fontSize: 12, fontWeight: '600', marginTop: 50 }}>
        PINCH TO ZOOM
      </Text>
    </ScrollView>
  )
}

DistrictsMapScreen.title = 'SF DISTRICTS'

DistrictsMapScreen.propTypes = {}

export default DistrictsMapScreen
