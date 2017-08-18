import React from 'react'
import {
  Image,
  Text,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import logo from '../logo.png'
import HoverableOpacity from '../HoverableOpacity'
import ProgressBar from './ProgressBar'
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

      <Text style={{
        fontSize: 18,
        fontWeight: '200',
        marginTop: 40,
      }}
      >Please use the <Text style={{ fontWeight: '700' }}>SEND FEEDBACK</Text> button in the left menu</Text>
      <Text style={{
        fontSize: 18,
        fontWeight: '200',
        marginBottom: 70,
        marginTop: 5,
      }}
      >to reach out with any questions or comments.</Text>

      <HoverableOpacity
        activeOpacity={0.5}
        hoverStyle={{ backgroundColor: 'rgba(52, 65, 132, 0.2)' }}
        outerStyle={{
          borderColor: 'rgb(52, 65, 132)',
          borderRadius: 30,
          borderWidth: 3,
        }}
        style={{
          alignItems: 'center',
          height: 58,
          justifyContent: 'center',
          width: 500,
        }}
        onPress={() => history.push('/sf')}
      >
        <Text style={{ fontSize: 16, fontWeight: '600', textTransform: 'uppercase' }}>
          Go to Legislation &nbsp;→
        </Text>
      </HoverableOpacity>

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
