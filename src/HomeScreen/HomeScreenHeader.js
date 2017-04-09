import React from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import legislatureIcon from './legislature-icon.png'

function HomeScreenHeader({ navigator, openDrawer }) {
  return (
    <View style={{
      alignItems: 'center',
      backgroundColor: '#000',
      borderBottomWidth: 1,
      borderColor: '#222',
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}
    >
      <TouchableOpacity
        style={{ height: 42, justifyContent: 'center', paddingLeft: 15, paddingRight: 30 }}
        onPress={() => { openDrawer() }}
      >
        <Icon color="white" name="ios-menu" size={28} />
      </TouchableOpacity>

      <TouchableWithoutFeedback onLongPress={() => { navigator.push({ name: 'TrumpApprovalScreen' }) }}>
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
          <Image
            source={legislatureIcon}
            style={{
              height: 20,
              marginRight: 7,
              width: 20,
            }}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 19,
              fontWeight: '700',
            }}
          >CITY LEGISLATURE</Text>
          <View style={{ width: 27 }} />
        </View>
      </TouchableWithoutFeedback>

      <View style={{ height: 42, paddingRight: 50 }} />
    </View>
  )
}

HomeScreenHeader.propTypes = {
  navigator: React.PropTypes.shape({}),
  openDrawer: React.PropTypes.func.isRequired,
}

export default HomeScreenHeader
