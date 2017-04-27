import React from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import LogoutIcon from 'react-icons/lib/io/power'
import HoverableOpacity from './HoverableOpacity'

function AuthErrorScreen({ dispatch, history }) {
  return (
    <View style={{ alignSelf: 'center', marginHorizontal: 30, marginTop: 20 }}>

      <Text style={{ color: '#fff', fontSize: 16, marginBottom: 20 }}>It looks like your login session is invalid.</Text>
      <Text style={{ color: '#fff', fontSize: 16, marginBottom: 20 }}>This can happen if you try to sign in multiple places.</Text>
      <Text style={{ color: '#fff', fontSize: 16, marginBottom: 20 }}>Logging out and back in should fix it.</Text>

      <HoverableOpacity
        activeOpacity={0.5}
        hoverStyle={{ backgroundColor: 'rgba(251, 82, 82, 0.1)' }}
        style={{
          alignItems: 'center',
          borderColor: 'darkred',
          borderRadius: 5,
          borderWidth: 2,
          height: 38,
          justifyContent: 'center',
        }}
        onPress={() => {
          dispatch({ type: 'LOGOUT' })
          history.replace('/')
        }}
      >
        <Text style={{ color: '#fff', fontSize: 13 }}>
          <LogoutIcon color="darkred" size={16} style={{ paddingBottom: 5 }} />
          &nbsp; &nbsp;LOG OUT
        </Text>
      </HoverableOpacity>

    </View>
  )
}

AuthErrorScreen.title = 'AUTH ERROR'
AuthErrorScreen.disableMenu = true

AuthErrorScreen.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  history: React.PropTypes.shape({
    goBackToTop: React.PropTypes.func.isRequired,
  }),
}

export default connect()(AuthErrorScreen)
