import PropTypes from 'prop-types'
import React from 'react'
import { View } from 'react-native'
import Button from 'Button'
import Text from 'Text'
import Header from './Header'

export default function RegistrationIntroScreen({ history }) {
  return (
    <View style={{ alignItems: 'center', paddingHorizontal: 30 }}>
      <Header history={history} step={0} title="Voter Registration" />

      <View style={{ marginVertical: 50 }}>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>The <Text style={{ fontWeight: '700' }}>Liquid Network</Text> is built on strong guarantees of one-person-one-vote.</Text>
        <Text style={{ fontSize: 20, marginVertical: 10 }}>
          To join, you must be legally registered to vote.</Text>
        <Text style={{ fontSize: 20, marginVertical: 10 }}>
          You will be asked a few questions to confirm your legal voter registration.</Text>
        <Text style={{ fontSize: 20, marginTop: 10 }}>All information is strictly confidential.</Text>
      </View>

      <Button
        primary
        history={history}
        style={{
          flexGrow: 1,
        }}
        text="OK"
        to="/registration/first-name"
      />
    </View>
  )
}

RegistrationIntroScreen.disableHeader = true

RegistrationIntroScreen.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}
