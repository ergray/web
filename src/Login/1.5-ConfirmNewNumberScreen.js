import React from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
} from 'react-native'
import HoverableOpacity from '../HoverableOpacity'

function prettifyPhone(tenDigits) {
  const areaCode = tenDigits.slice(0, 3)
  const middle3 = tenDigits.slice(3, 6)
  const final4 = tenDigits.slice(6)

  return `(${areaCode}) ${middle3}-${final4}`
}

function ConfirmNewNumberScreen({ dispatch, history, match }) {
  const phoneNumber = match.params.phoneNumber

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
          {prettifyPhone(phoneNumber)}
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
        <HoverableOpacity
          activeOpacity={0.5}
          hoverStyle={{ backgroundColor: 'rgba(52, 65, 132, 0.15)' }}
          outerStyle={{
            borderColor: 'rgb(52, 65, 132)',
            borderRadius: 30,
            borderWidth: 3,
            marginTop: 60,
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 16,
          }}
          onPress={() => {
            fetch('https://api.liquid.vote/login', {
              body: JSON.stringify({
                phone: phoneNumber,
              }),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              method: 'POST',
            })

            dispatch({ phoneNumber, type: 'ADD_KNOWN_NUMBER' })
            dispatch({ phoneNumber, type: 'SET_PHONE_NUMBER' })
            history.replace('/enter-sms')
          }}
        >
          <Text style={{ color: '#fff', fontFamily: 'HelveticaNeue, Helvetica', fontSize: 16, fontWeight: '600' }}>
            CONFIRM
          </Text>
        </HoverableOpacity>

        <HoverableOpacity
          activeOpacity={0.5}
          hoverStyle={{ backgroundColor: 'rgba(90, 6, 7, 0.15)' }}
          outerStyle={{
            borderColor: 'rgb(90, 6, 7)',
            borderRadius: 30,
            borderWidth: 3,
            marginBottom: 30,
            marginTop: 30,
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 16,
          }}
          onPress={() => {
            history.goBack()
          }}
        >
          <Text style={{ color: '#fff', fontFamily: 'HelveticaNeue, Helvetica', fontSize: 16, fontWeight: '600' }}>
            CANCEL
          </Text>
        </HoverableOpacity>
      </View>
    </View>
  )
}

ConfirmNewNumberScreen.title = 'CONFIRM NEW NUMBER'
ConfirmNewNumberScreen.disableMenu = true

ConfirmNewNumberScreen.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  history: React.PropTypes.shape({
    goBack: React.PropTypes.func.isRequired,
    replace: React.PropTypes.func.isRequired,
  }),
  match: React.PropTypes.shape({}).isRequired,
}

export default connect()(ConfirmNewNumberScreen)
