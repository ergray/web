import React from 'react'
import {
  Image,
  Navigator,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import trumpIcon from './trump-icon.png'

function TrumpApprovalHeader(props) {
  return (
    <Navigator.NavigationBar
      {...props}
      routeMapper={{
        LeftButton: () => (
          <TouchableOpacity
            style={{ height: 53, paddingLeft: 15, paddingRight: 20, paddingTop: 5 }}
            onPress={() => { props.navigator.pop() }}
          >
            <Icon color="white" name="ios-arrow-back" size={30} />
          </TouchableOpacity>
        ),
        RightButton: () => {},
        Title: () => (
          <View
            style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', paddingTop: 10 }}
          >
            <Image
              source={trumpIcon}
              style={{
                height: 24,
                marginRight: 7,
                width: 24,
              }}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: 19,
                fontWeight: '700',
              }}
            >U.S. PRESIDENT</Text>
            <View style={{ width: 24 }} />
          </View>
        ),
      }}
      style={{
        backgroundColor: '#000',
        borderBottomWidth: 1,
        borderColor: '#222',
      }}
    />
  )
}

TrumpApprovalHeader.propTypes = {
  navigator: React.PropTypes.shape({ // eslint-disable-line
    pop: React.PropTypes.func.isRequired,
  }),
}

export default TrumpApprovalHeader
