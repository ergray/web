import React from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import CloseIcon from 'react-icons/lib/md/close'
import BackIcon from 'react-icons/lib/md/chevron-left'
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

  const Icon = route.transition ? CloseIcon : BackIcon

  return (
    <View style={{
      backgroundColor: '#000',
      borderBottomWidth: 1,
      borderColor: '#222',
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}
    >
      <View>
        <TouchableOpacity
          style={{ height: 53, paddingLeft: 15, paddingRight: 20, paddingTop: 12 }}
          onPress={() => { props.navigator.pop() }}
        >
          <Icon color="white" size={30} />
        </TouchableOpacity>
      </View>
      <View
        style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}
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

      <View style={{ height: 42, paddingRight: 50 }} />
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
