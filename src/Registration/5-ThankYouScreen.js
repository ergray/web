import React from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import logo from '../logo.png'
import ProgressBar from './ProgressBar'

function ThankYouScreen({ history }) {
  return (
    <View>
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
      >COMPLETE</Text>

      <ProgressBar step={5} style={{ marginVertical: 15 }} />

      <Text style={{
        color: '#fff',
        fontSize: 18,
        fontWeight: '200',
        marginHorizontal: 30,
        marginTop: 70,
      }}
      >The <Text style={{ fontWeight: '700' }}>Liquid Network</Text> is in private beta.</Text>

      <Text style={{
        color: '#fff',
        fontSize: 18,
        fontWeight: '200',
        marginHorizontal: 30,
        marginTop: 10,
      }}
      >We'll notify you when we're ready for more voters.</Text>

      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          alignItems: 'center',
          borderColor: '#5DA0FF',
          borderRadius: 5,
          borderWidth: 1,
          height: 38,
          justifyContent: 'center',
          marginHorizontal: 30,
          marginTop: 50,
        }}
        onPress={() => history.replace('/sf')}
      >
        <Text style={{ color: '#fff', fontSize: 13 }}>
          GO TO LEGISLATION &nbsp;→
        </Text>
      </TouchableOpacity>

    </View>
  )
}

ThankYouScreen.disableHeader = true

ThankYouScreen.propTypes = {
  history: React.PropTypes.shape({}).isRequired,
}

export default ThankYouScreen
