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
    <View
      style={{
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
        padding: '1rem',
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
