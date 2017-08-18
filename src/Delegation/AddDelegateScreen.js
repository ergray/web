import React from 'react'
import {
  View,
} from 'react-native'
import { connect } from 'react-redux'
import Text from '../Text'
import AddByPhoneNumber from './AddByPhoneNumber'
const pick = require('lodash/fp/pick')

function AddDelegateScreen({ history }) {
  return (
    <View style={{ margin: 30 }}>
      <Text style={{
        fontSize: 16,
        marginBottom: 20,
      }}
      >Delegating lets someone else vote on your behalf, increasing their voting power.</Text>

      <Text style={{
        fontSize: 16,
        marginBottom: 20,
      }}
      >This way you can be represented even when you are too busy to
      look into individual legislation.</Text>

      <Text style={{
        fontSize: 16,
        marginBottom: 20,
      }}
      >Your choice of delegates is <a
        href="https://blog.liquid.vote/2017/04/08/liquid-privacy/"
        rel="noopener noreferrer"
        style={{
          cursor: 'pointer',
        }}
        target="_blank"
      >kept private</a>.</Text>

      <Text style={{
        fontSize: 16,
        marginBottom: 50,
      }}
      >You can override or remove a delegate at any time.</Text>

      <AddByPhoneNumber history={history} />
    </View>
  )
}

AddDelegateScreen.title = 'Add Delegate'

AddDelegateScreen.propTypes = {
  history: React.PropTypes.shape({}).isRequired,
}

export default connect(pick([
]))(AddDelegateScreen)
