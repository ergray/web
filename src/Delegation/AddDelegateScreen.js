import PropTypes from 'prop-types'
import React from 'react'
import {
  View,
} from 'react-native'
import { connect } from 'react-redux'
import Text from '../Text'
import Link from '../Link'
import AddByPhoneNumber from './AddByPhoneNumber'
const pick = require('lodash/fp/pick')

function AddDelegateScreen({ history }) {
  return (
    <View style={{ alignSelf: 'center', margin: 30, maxWidth: 650 }}>
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
      >Your choice of delegates is&nbsp;
        <Link
          href="https://blog.liquid.vote/2017/04/08/liquid-privacy/"
          rel="noopener noreferrer"
          target="_blank"
          text="kept private"
        />.</Text>

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
  history: PropTypes.shape({}).isRequired,
}

export default connect(pick([
]))(AddDelegateScreen)
