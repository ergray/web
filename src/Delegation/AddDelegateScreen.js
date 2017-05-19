import React from 'react'
import {
  Text,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import AddByPhoneNumber from './AddByPhoneNumber'
const pick = require('lodash/fp/pick')

function AddDelegateScreen({ history }) {
  return (
    <View style={{ margin: 30 }}>
      <Text style={{
        color: '#fff',
        fontSize: 16,
        marginBottom: 20,
      }}
      >Delegating lets someone else vote on your behalf, increasing their voting power.</Text>

      <Text style={{
        color: '#fff',
        fontSize: 16,
        marginBottom: 20,
      }}
      >This way you can be represented even when you are too busy to
      look into individual legislation.</Text>

      <Text style={{
        color: '#fff',
        fontSize: 16,
        marginBottom: 20,
      }}
      >Your choice of delegates is kept private.</Text>

      <Text style={{
        color: '#fff',
        fontSize: 16,
        marginBottom: 50,
      }}
      >You can override or remove a delegate at any time.</Text>

      <AddByPhoneNumber history={history} />
    </View>
  )
}

AddDelegateScreen.title = 'ADD DELEGATE'

AddDelegateScreen.propTypes = {
  history: React.PropTypes.shape({}).isRequired,
}

export default connect(pick([
]))(AddDelegateScreen)
