import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Header from './Header'

export default function RegistrationIntroScreen({ history }) {
  return (
    <View style={{ flex: 1 }}>
      <Header history={history} step={0} title="VOTER REGISTRATION" />

      <View style={{ flex: 1, justifyContent: 'space-between', marginHorizontal: 30, marginTop: 50 }}>
        <View>
          <Text style={{ color: 'white', fontSize: 17, marginBottom: 10 }}>The <Text style={{ fontWeight: '700' }}>Liquid Network</Text> is built on strong guarantees of one-person-one-vote.</Text>
          <Text style={{ color: 'white', fontSize: 17, marginVertical: 10 }}>
            To join, you must already be legally registered to vote.</Text>
          <Text style={{ color: 'white', fontSize: 17, marginVertical: 10 }}>
            You will be asked a few questions to confirm your legal voter registration.</Text>
          <Text style={{ color: 'white', fontSize: 17, marginVertical: 10 }}>All information is strictly confidential.</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            alignItems: 'center',
            borderColor: '#344184',
            borderRadius: 30,
            borderWidth: 3,
            height: 58,
            justifyContent: 'center',
            marginBottom: 20,
          }}
          onPress={() => history.push('/registration/first-name')}
        >
          <Text style={{ color: '#fff', fontFamily: 'HelveticaNeue, Helvetica', fontSize: 16, fontWeight: '600' }}>
            OK
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

RegistrationIntroScreen.disableHeader = true

RegistrationIntroScreen.propTypes = {
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
}
