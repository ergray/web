import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import {
  View,
} from 'react-native'
import Button from '../Button'
import Text from '../Text'

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
          fontSize: 26,
          fontWeight: '700',
          marginTop: 40,
        }}
        >
          {prettifyPhone(phoneNumber)}
        </Text>
        <Text style={{
          fontSize: 26,
          fontWeight: '500',
          marginTop: '1rem',
        }}
        >
          Are you sure this is you?
        </Text>
        <Text style={{
          fontSize: 20,
          fontWeight: '500',
          lineHeight: 28,
          marginTop: '1rem',
        }}
        >
          This will send a text message.
        </Text>
      </View>

      <View style={{}}>
        <Button
          primary
          style={{ marginTop: '1rem' }}
          text="Confirm"
          onPress={() => {
            fetch(`${API_URL_V1}/login`, {
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
        />

        <Button
          style={{ marginTop: '.5rem' }}
          text="Cancel"
          onPress={() => {
            history.goBack()
          }}
        />
      </View>
    </View>
  )
}

ConfirmNewNumberScreen.title = 'CONFIRM NEW NUMBER'
ConfirmNewNumberScreen.disableMenu = true

ConfirmNewNumberScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }),
  match: PropTypes.shape({}).isRequired,
}

export default connect()(ConfirmNewNumberScreen)
