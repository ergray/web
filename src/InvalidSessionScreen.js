import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'

function InvalidSessionScreen({ dispatch, navigator }) {
  return (
    <View style={{ marginHorizontal: 30, marginTop: 10 }}>

      <Text style={{ color: '#fff', fontSize: 16, marginBottom: 20 }}>It looks like your login session is invalid.</Text>
      <Text style={{ color: '#fff', fontSize: 16, marginBottom: 20 }}>This can happen if you try to sign in multiple places.</Text>
      <Text style={{ color: '#fff', fontSize: 16, marginBottom: 20 }}>Logging out and back in should fix it.</Text>

      <TouchableOpacity
        activeOpacity={0.5}
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
          navigator.resetTo({ name: 'LoginScreen' })
        }}
      >
        <Text style={{ color: '#fff', fontSize: 13 }}>
          <Ionicons color="darkred" name="md-power" size={16} />
          &nbsp; &nbsp;LOG OUT
        </Text>
      </TouchableOpacity>

    </View>
  )
}

InvalidSessionScreen.title = 'AUTH ERROR'

InvalidSessionScreen.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  navigator: React.PropTypes.shape({
    popToTop: React.PropTypes.func.isRequired,
  }),
}

export default connect()(InvalidSessionScreen)
