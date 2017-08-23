import React from 'react'
import {
  Image,
  View,
} from 'react-native'
import { screens } from './_screens'
import NoHeader from './NoHeader'
import Text from './Text'

function Header(props) {
  const { location, title } = props
  const screen = screens[location.pathname]
  const disableHeader = !title && (!screen || screen.disableHeader)
  const titleIcon = screen && screen.titleIcon
  const screenTitle = (screen ? (title || screen.title) : title) || location.pathname

  if (disableHeader) {
    return <NoHeader {...props} />
  }

  const CustomHeader = screen && screen.header
  if (CustomHeader) {
    return <CustomHeader {...props} {...screen.headerProps} />
  }

  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15,
    }}
    >
      <View style={{ width: 65 }} />
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          maxWidth: 'calc(100% - 130px)',
          paddingBottom: '1rem',
          paddingLeft: 0,
          paddingTop: '1rem',
        }}
      >
        {titleIcon &&
          <Image
            source={titleIcon}
            style={{
              height: 20,
              marginRight: 7,
              width: 20,
            }}
          />
        }
        <Text
          style={{
            fontSize: 19,
            fontWeight: '500',
          }}
        >{screenTitle}</Text>
      </View>
      <View style={{ width: 65 }} />
    </View>
  )
}

Header.propTypes = {
  history: React.PropTypes.shape({ // eslint-disable-line
    goBack: React.PropTypes.func.isRequired,
    push: React.PropTypes.func.isRequired,
  }),
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string.isRequired,
    state: React.PropTypes.shape({
      backable: React.PropTypes.bool,
    }),
  }),
  title: React.PropTypes.string,
}

export default Header
