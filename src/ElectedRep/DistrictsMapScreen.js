import React from 'react'
import {
  Image,
  ScrollView,
} from 'react-native'
import districtsMap from './districts-map.png'

function DistrictsMapScreen() {
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}
      style={{ backgroundColor: '#fff', width: 612 }}
    >
      <Image
        source={districtsMap}
        style={{
          height: 478,
          width: 500,
        }}
      />
    </ScrollView>
  )
}

DistrictsMapScreen.title = 'SF DISTRICTS'

DistrictsMapScreen.propTypes = {}

export default DistrictsMapScreen
