import React from 'react'
import {
  Image,
  Navigator,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { last } from 'lodash'
import logo from './logo.png'
import screens from './_screens'
import NoHeader from './NoHeader'

function Header(props) {
  const route = last(props.navState.routeStack)
  const screen = screens[route.name]

  if (screen.disableHeader) {
    return <NoHeader {...props} />
  }

  const CustomHeader = screen.header
  if (CustomHeader) {
    return <CustomHeader route={route} {...props} {...screen.headerProps} />
  }

  return (
    <Navigator.NavigationBar
      {...props}
      routeMapper={{
        LeftButton: () => (
          <TouchableOpacity
            style={{ height: 53, paddingLeft: 15, paddingRight: 20, paddingTop: 5 }}
            onPress={() => { props.navigator.pop() }}
          >
            <Icon color="white" name={route.transition ? 'md-close' : 'ios-arrow-back'} size={30} />
          </TouchableOpacity>
        ),
        RightButton: () => {},
        Title: () => (
          <View
            style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', paddingTop: 10 }}
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
            >{screen.title}</Text>
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

Header.propTypes = {
  navigator: React.PropTypes.shape({ // eslint-disable-line
    pop: React.PropTypes.func.isRequired,
  }),
  navState: React.PropTypes.shape({
    routeStack: React.PropTypes.array,
  }),
}

export default Header
