import React from 'react'
import {
  Image,
  Text,
  View,
} from 'react-native'
import logo from '../logo.png'
import HoverableOpacity from '../HoverableOpacity'
import ProgressBar from './ProgressBar'

function ThankYouScreen({ history }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Image
        source={logo}
        style={{
          alignSelf: 'center',
          height: 56,
          marginBottom: 12,
          marginTop: 32,
          width: 59,
        }}
      />
      <Text style={{
        alignSelf: 'center',
        color: '#fff',
        fontSize: 19,
        fontWeight: '700',
      }}
      >THANK YOU</Text>

      <ProgressBar step={5} style={{ marginVertical: 15 }} />

      <Text style={{
        color: '#fff',
        fontSize: 18,
        fontWeight: '200',
        marginVertical: 70,
      }}
      >The <Text style={{ fontWeight: '700' }}>Liquid Network</Text> is still in beta but you're welcome to try it out.</Text>

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
        <Text style={{ color: '#fff', fontFamily: 'HelveticaNeue, Helvetica', fontSize: 16, fontWeight: '600' }}>
          GO TO LEGISLATION &nbsp;→
        </Text>
      </HoverableOpacity>

    </View>
  )
}

ThankYouScreen.disableHeader = true

ThankYouScreen.propTypes = {
  history: React.PropTypes.shape({}).isRequired,
}

export default ThankYouScreen
