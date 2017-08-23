import React from 'react'
import {
  Image,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import logo from 'logo.png'
import Button from 'Button'
import ProgressBar from 'Registration/ProgressBar'
import Text from 'Text'
const pick = require('lodash/fp/pick')

function ThankYouScreen({ history, user }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Image
        source={logo}
        style={{
          alignSelf: 'center',
          height: 53,
          marginBottom: 5,
          marginTop: 32,
          width: 60,
        }}
      />
      <Text style={{
        alignSelf: 'center',
        fontSize: 19,
        fontWeight: '700',
        textTransform: 'uppercase',
      }}
      >Thank you</Text>

      <ProgressBar step={5} style={{ marginVertical: 15 }} />

      <Text style={{
        fontSize: 18,
        fontWeight: '200',
        marginTop: 70,
      }}
      >The <Text style={{ fontWeight: '700' }}>Liquid Network</Text> is
      { user && user.zip && user.zip.slice(0, 2) === '94'
        ? ' in beta '
        : ' only available for San Francisco right now '
      }
      but you're welcome to try it out.
      </Text>

      <Button
        primary
        history={history}
        style={{ alignSelf: 'center' }}
        text="Go to Legislation →"
        to="/legislation"
      />

    </View>
  )
}

ThankYouScreen.disableHeader = true

ThankYouScreen.propTypes = {
  history: React.PropTypes.shape({}).isRequired,
  user: React.PropTypes.shape({
    zip: React.PropTypes.string,
  }),
}

export default connect(pick([
  'user',
]))(ThankYouScreen)
