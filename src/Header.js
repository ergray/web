import React from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import logo from './logo.png'
import screens from './_screens'
import NoHeader from './NoHeader'

function Header(props) {
  const route = props.route
  const screen = screens[route.name]

  if (screen.disableHeader) {
    return <NoHeader {...props} />
  }

  const CustomHeader = screen.header
  if (CustomHeader) {
    return <CustomHeader route={route} {...props} {...screen.headerProps} />
  }

  return (
    <View style={{
      backgroundColor: '#000',
      borderBottomWidth: 1,
      borderColor: '#222',
    }}
    >
      <View>
        <TouchableOpacity
          style={{ height: 53, paddingLeft: 15, paddingRight: 20, paddingTop: 5 }}
          onPress={() => { props.navigator.pop() }}
        >
          <Icon color="white" name={route.transition ? 'md-close' : 'ios-arrow-back'} size={30} />
        </TouchableOpacity>
      </View>
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
    </View>
  )
}

Header.propTypes = {
  navigator: React.PropTypes.shape({ // eslint-disable-line
    pop: React.PropTypes.func.isRequired,
  }),
  route: React.PropTypes.shape({}),
}

export default Header
