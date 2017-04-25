import React from 'react'
import { connect } from 'react-redux'
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

function prettifyPhone(tenDigits) {
  const areaCode = tenDigits.slice(0, 3)
  const middle3 = tenDigits.slice(3, 6)
  const final4 = tenDigits.slice(6)

  return `(${areaCode}) ${middle3}-${final4}`
}

function ConfirmNewNumberScreen({ dispatch, navigator, route }) {
  return (
    <View style={{ alignSelf: 'center', justifyContent: 'space-between', marginHorizontal: 30, width: 500 }}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{
          color: '#fff',
          fontSize: 26,
          fontWeight: '700',
          marginTop: 40,
        }}
        >
          {prettifyPhone(route.phoneNumber)}
        </Text>
        <Text style={{
          color: '#ccc',
          fontSize: 26,
          fontWeight: '500',
          marginTop: 40,
        }}
        >
          Are you sure this is you?
        </Text>
        <Text style={{
          color: '#ccc',
          fontSize: 20,
          fontWeight: '500',
          lineHeight: 28,
          marginTop: 20,
        }}
        >
          This will send a text message.
        </Text>
      </View>

      <View style={{}}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            alignItems: 'center',
            borderColor: '#344184',
            borderRadius: 30,
            borderWidth: 3,
            height: 58,
            justifyContent: 'center',
            marginTop: 60,
          }}
          onPress={() => {
            fetch('https://api.liquid.vote/login', {
              body: JSON.stringify({
                phone: route.phoneNumber,
              }),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              method: 'POST',
            })

            dispatch({ phoneNumber: route.phoneNumber, type: 'ADD_KNOWN_NUMBER' })
            dispatch({ phoneNumber: route.phoneNumber, type: 'SET_PHONE_NUMBER' })
            navigator.replace({ name: 'EnterSMSCodeScreen' })
          }}
        >
          <Text style={{ color: '#fff', fontFamily: 'HelveticaNeue, Helvetica', fontSize: 16, fontWeight: '600' }}>
            CONFIRM
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            alignItems: 'center',
            borderColor: '#5a0607',
            borderRadius: 30,
            borderWidth: 3,
            height: 58,
            justifyContent: 'center',
            marginBottom: 30,
            marginTop: 30,
          }}
          onPress={() => {
            navigator.pop()
          }}
        >
          <Text style={{ color: '#fff', fontFamily: 'HelveticaNeue, Helvetica', fontSize: 16, fontWeight: '600' }}>
            CANCEL
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

ConfirmNewNumberScreen.title = 'CONFIRM NEW NUMBER'
ConfirmNewNumberScreen.disableMenu = true

ConfirmNewNumberScreen.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  navigator: React.PropTypes.shape({
    pop: React.PropTypes.func.isRequired,
    replace: React.PropTypes.func.isRequired,
  }),
  route: React.PropTypes.shape({}).isRequired,
}

export default connect()(ConfirmNewNumberScreen)
