import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import LoginHeader from './LoginHeader'
import IntroDescription from './IntroDescription'
import PhoneLoginBox from './PhoneLoginBox'

class LoginScreen extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.sessionId) {
      this.props.navigator.replace({ name: 'HomeScreen' })
    }
  }

  render() {
    const loginField = { el: { focus: () => {} } } // overwritten in PhoneLoginBox

    return (
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <LoginHeader />

        <View style={{ flex: 1, flexDirection: 'row' }}>
          <IntroDescription />
          <PhoneLoginBox loginField={loginField} navigator={this.props.navigator} />
        </View>

        <View>
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
              marginHorizontal: 30,
            }}
            onPress={() => {
              loginField.el.focus()
            }}
          >
            <Text style={{ color: '#fff', fontFamily: 'HelveticaNeue', fontSize: 16, fontWeight: '600' }}>
              GET STARTED
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

LoginScreen.disableHeader = true

LoginScreen.propTypes = {
  navigator: React.PropTypes.shape({
    replace: React.PropTypes.func.isRequired,
  }),
  sessionId: React.PropTypes.string, // eslint-disable-line
}

const mapStateToProps = state => ({ sessionId: state.sessionId })

export default connect(mapStateToProps)(LoginScreen)
