import PropTypes from 'prop-types'
import React from 'react'
import {
  View,
} from 'react-native'
import { connect } from 'react-redux'
import LiquidMark from 'images/liquid_mark.svg'
import Button from 'Button'
import Image from 'Image'
import ProgressBar from 'Registration/ProgressBar'
import Text from 'Text'
const pick = require('lodash/fp/pick')

function ThankYouScreen({ history }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Image
        source={LiquidMark}
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
        marginTop: 50,
      }}
      >
        The <Text style={{ fontWeight: '700' }}>Liquid Network</Text> is in beta but you're welcome to try it out.
      </Text>

      <Button
        primary
        history={history}
        style={{ alignSelf: 'center', marginTop: '1rem' }}
        text="Go to Legislation →"
        to="/legislation"
      />

    </View>
  )
}

ThankYouScreen.disableHeader = true

ThankYouScreen.propTypes = {
  history: PropTypes.shape({}).isRequired,
}

export default connect(pick([
  'user',
]))(ThankYouScreen)
