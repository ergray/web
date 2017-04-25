import React from 'react'
import {
  Image,
  Text,
  View,
} from 'react-native'
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
      alignItems: 'center',
      backgroundColor: '#000',
      borderBottomWidth: 1,
      borderColor: '#222',
      flexDirection: 'row',
      height: 50,
      justifyContent: 'center',
    }}
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
  )
}

Header.propTypes = {
  navigator: React.PropTypes.shape({ // eslint-disable-line
    pop: React.PropTypes.func.isRequired,
  }),
  route: React.PropTypes.shape({}),
}

export default Header
