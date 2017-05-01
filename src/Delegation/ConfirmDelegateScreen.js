import React from 'react'
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { connect } from 'react-redux'
const pick = require('lodash/fp/pick')

function ConfirmDelegateScreen({ delegates, dispatch, history, route }) {
  return (
    <View style={{ marginHorizontal: 30, marginTop: 10 }}>
      <Text style={{
        color: '#fff',
        fontSize: 16,
        marginBottom: 20,
      }}
      >Delegating lets someone else vote on your behalf, increasing their voting power.
      This way you can be represented even when you are too busy to
      look into individual legislation.</Text>

      <Text style={{
        color: '#fff',
        fontSize: 16,
        marginBottom: 20,
      }}
      >If there is no vote to inherit from your 1st delegate, it will go to your 2nd choice,
      then 3rd, and so on. Each acts as another backup to represent you.</Text>

      <Text style={{
        color: '#fff',
        fontSize: 16,
        marginBottom: 20,
      }}
      >Your choice of delegates is kept private.</Text>

      <Text style={{
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 20,
        marginTop: 60,
      }}
      >Are you sure you want to delegate to {route.newDelegate.name}?</Text>

      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          alignItems: 'center',
          borderColor: '#05A5D1',
          borderRadius: 5,
          borderWidth: 1,
          height: 38,
          justifyContent: 'center',
          marginBottom: 25,
        }}
        onPress={() => {
          dispatch({ delegates: [...delegates, route.newDelegate], type: 'SYNC_DELEGATES' })
          history.replace(`/delegates/${route.newDelegate.phone}`)
        }}
      >
        <Text style={{ color: '#fff', fontSize: 13 }}>
          YES, CONTINUE
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          alignItems: 'center',
          borderColor: 'darkred',
          borderRadius: 5,
          borderWidth: 1,
          height: 38,
          justifyContent: 'center',
          marginBottom: 15,
        }}
        onPress={() => history.goBack()}
      >
        <Text style={{ color: '#fff', fontSize: 13 }}>
          NO, NEVERMIND
        </Text>
      </TouchableOpacity>
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
  route: React.PropTypes.shape({
    newDelegate: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}


export default connect(pick([
  'delegates',
]))(ConfirmDelegateScreen)
