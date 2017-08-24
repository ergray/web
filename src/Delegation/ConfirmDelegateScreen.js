import React from 'react'
import {
  View,
} from 'react-native'
import { connect } from 'react-redux'
import HoverableOpacity from '../HoverableOpacity'
import Text from '../Text'
const pick = require('lodash/fp/pick')


function ConfirmDelegateScreen({ delegates, dispatch, history, match, sessionId }) {
  const { phoneNumber } = match.params

  const newDelegate = {
    name: phoneNumber,
    phone: phoneNumber,
  }

  return (
    <View style={{ margin: 30 }}>
      <Text style={{
        fontSize: 16,
        marginBottom: 20,
      }}
      >Delegating lets someone else vote on your behalf, increasing their voting power.
      This way you can be represented even when you are too busy to
      look into individual legislation.</Text>

      <Text style={{
        fontSize: 16,
        marginBottom: 20,
      }}
      >If there is no vote to inherit from your 1st delegate, it will go to your 2nd choice,
      then 3rd, and so on. Each acts as another backup to represent you.</Text>

      <Text style={{
        fontSize: 16,
        marginBottom: 20,
      }}
      >Your choice of delegates is kept private.</Text>

      <Text style={{
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 20,
        marginTop: 60,
      }}
      >Are you sure you want to delegate to {newDelegate.name.toUpperCase()}?</Text>

      <HoverableOpacity
        activeOpacity={0.5}
        hoverStyle={{ backgroundColor: 'rgba(5, 165, 290, 0.1)' }}
        outerStyle={{
          borderColor: 'rgb(5, 165, 290)',
          borderRadius: 5,
          borderWidth: 1,
          marginBottom: 25,
        }}
        style={{
          alignItems: 'center',
          height: 38,
          justifyContent: 'center',
        }}
        onPress={() => {
          dispatch({ delegates: [...delegates, newDelegate], type: 'SYNC_DELEGATES' })
          fetch(`${API_URL_V1}/my-delegates`, {
            body: JSON.stringify({
              delegates: [...delegates, newDelegate],
            }),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Session_ID: sessionId,
            },
            method: 'PUT',
          })
            .then(() => {
              history.replace(`/delegates/${phoneNumber}`)
            })
        }}
      >
        <Text style={{ fontSize: 13 }}>
          YES, CONTINUE
        </Text>
      </HoverableOpacity>
      <HoverableOpacity
        activeOpacity={0.5}
        hoverStyle={{ backgroundColor: 'rgba(251, 82, 82, 0.1)' }}
        outerStyle={{
          borderColor: 'darkred',
          borderRadius: 5,
          borderWidth: 1,
          marginBottom: 15,
        }}
        style={{
          alignItems: 'center',
          height: 38,
          justifyContent: 'center',
        }}
        onPress={() => history.goBack()}
      >
        <Text style={{ fontSize: 13 }}>
          NO, NEVERMIND
        </Text>
      </HoverableOpacity>
    </View>
  )
}

ConfirmDelegateScreen.title = 'CONFIRM DELEGATE'

ConfirmDelegateScreen.propTypes = {
  delegates: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string,
  })).isRequired,
  dispatch: React.PropTypes.func.isRequired,
  history: React.PropTypes.shape({}).isRequired,
  match: React.PropTypes.shape({
    params: React.PropTypes.shape({
      phoneNumber: React.PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  sessionId: React.PropTypes.string,
}


export default connect(pick([
  'delegates',
  'sessionId',
]))(ConfirmDelegateScreen)
