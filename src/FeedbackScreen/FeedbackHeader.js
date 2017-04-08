import React from 'react'
import {
  Image,
  Navigator,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { version } from '../../package.json'
import logo from '../logo.png'

function FeedbackHeader(props) {
  return (
    <Navigator.NavigationBar
      {...props}
      routeMapper={{
        LeftButton: () => (
          <TouchableOpacity
            style={{ flex: 1, height: 53, justifyContent: 'center', minWidth: 50, paddingLeft: 15 }}
            onPress={() => { props.navigator.pop() }}
          >
            <Icon color="white" name="ios-arrow-back" size={30} />
          </TouchableOpacity>
        ),
        RightButton: () => (
          <Text style={{
            color: '#444',
            fontSize: 13,
            fontWeight: '100',
            marginRight: 30,
            marginTop: 17,
          }}
          >v{version}</Text>
        ),
        Title: () => (
          <View
            style={{ alignItems: 'center', flex: 10, flexDirection: 'row', justifyContent: 'center' }}
          >
            <Image
              source={logo}
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
            >FEEDBACK</Text>
            <View style={{ width: 31 }} />
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

FeedbackHeader.propTypes = {
  navigator: React.PropTypes.shape({ // eslint-disable-line
    pop: React.PropTypes.func.isRequired,
  }),
  navState: React.PropTypes.shape({
    routeStack: React.PropTypes.array,
  }),
}

export default FeedbackHeader
