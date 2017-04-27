import React from 'react'
import {
  Image,
  Text,
  View,
} from 'react-native'
import BackIcon from 'react-icons/lib/md/chevron-left'
import HoverableOpacity from './HoverableOpacity'
import logo from './logo.png'
import { screens } from './_screens'
import NoHeader from './NoHeader'

function Header(props) {
  const screen = screens[props.path]

  if (screen.disableHeader) {
    return <NoHeader {...props} />
  }

  const CustomHeader = screen.header
  if (CustomHeader) {
    return <CustomHeader {...props} {...screen.headerProps} />
  }

  return (
    <View style={{
      backgroundColor: '#000',
      borderBottomWidth: 1,
      borderColor: '#222',
      flexDirection: 'row',
      height: 50,
      justifyContent: 'space-between',
    }}
    >
      <View style={{ width: 65 }}>
        { props.path.backable && (
          <HoverableOpacity
            hoverStyle={{ backgroundColor: 'hsla(0,0%,100%,0.1)' }}
            style={{ height: 49, paddingHorizontal: 15, paddingTop: 10 }}
            onPress={() => { props.history.goBack() }}
          >
            <BackIcon color="white" size={30} />
          </HoverableOpacity>
        ) }
      </View>
      <View
        style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}
      >
        <Image
          source={logo}
          style={{
            height: 24,
            marginRight: 7,
            width: 25,
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

      <View style={{ width: 65 }} />
    </View>
  )
}

Header.propTypes = {
  history: React.PropTypes.shape({ // eslint-disable-line
    goBack: React.PropTypes.func.isRequired,
  }),
  path: React.PropTypes.string.isRequired,
}

export default Header
