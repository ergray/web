import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Dimensions,
  Image,
  Text,
  TextInput,
  View,
} from 'react-native'
import logo from '../logo.png'
import usaFlag from './usa-flag.png'

class PhoneLoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phone: '',
    }
  }

  render() {
    const isSmallScreen = Dimensions.get('window').height < 600

    return (
      <View style={{ width: 450 }}>
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
        <Text
          style={{
            alignSelf: 'center',
            color: '#fff',
            fontSize: 19,
            fontWeight: '700',
            marginBottom: isSmallScreen ? 20 : 90,
          }}
        >LIQUID DEMOCRACY</Text>
        <Text
          style={{
            color: '#fff',
            fontSize: 48,
            fontWeight: '100',
            marginBottom: 15,
            marginLeft: 40,
          }}
        >
          { // eslint-disable-next-line no-multi-spaces
          }<Text style={{ width: 600 }}>Reclaim               </Text>
          <Text>your voice:</Text>
        </Text>
        <TextInput
          autoCorrect={false}
          clearButtonMode="always"
          keyboardType="number-pad"
          placeholder={`Enter your mobile ${isSmallScreen ? '#' : 'number'}`}
          ref={(el) => { this.props.loginField.el = el }}
          style={{
            backgroundColor: '#fff',
            borderColor: '#979797',
            borderRadius: 3,
            borderWidth: 1,
            fontSize: 18,
            fontWeight: '300',
            height: 42,
            marginHorizontal: 38,
            paddingLeft: 75,
          }}
          value={this.state.phone}
          onChangeText={(newText) => {
            // Add area code opening parenthese
            if (this.state.phone === '') {
              return this.setState({ phone: `(${newText}` })
            }

            // Add area code closing parenthese
            if (this.state.phone.length === 3 && newText.length === 4) {
              return this.setState({ phone: `${newText}) ` })
            }

            // Split final four digits
            if (this.state.phone.length === 8 && newText.length === 9) {
              return this.setState({ phone: `${newText} - ` })
            }

            // Clear on backspace
            if (this.state.phone.length > newText.length) {
              return this.setState({ phone: '' })
            }

            // When done
            if (newText.length === 16) {
              // Remove all but digits
              const phoneNumber = newText.split('')
                .filter(character => '0123456789'.indexOf(character) > -1)
                .join('')

              // Special code to demo registration
              if (phoneNumber === '5555551776') {
                this.props.dispatch({ type: 'START_REGISTRATION_DEMO' })
                return this.props.navigator.replace({ name: 'RegistrationIntroScreen' })
              }

              // Special code to demo login
              if (phoneNumber === '0000001776') {
                this.setState({ phone: newText })
                return fetch('https://api.liquid.vote/login/demo', {
                  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                  method: 'POST',
                })
                .then(response => response.json())
                .then(({ sessionId, user }) => {
                  this.props.dispatch({ sessionId, type: 'START_LOGIN_DEMO', user })
                  return this.props.navigator.replace({ name: 'HomeScreen' })
                })
              }

              fetch('https://api.liquid.vote/login', {
                body: JSON.stringify({
                  phone: phoneNumber,
                }),
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                method: 'POST',
              })

              this.props.dispatch({ phoneNumber, type: 'SET_PHONE_NUMBER' })
              this.props.navigator.replace({ name: 'EnterSMSCodeScreen' })
            }

            // Otherwise, update backing state normally
            return this.setState({ phone: newText })
          }}
        />
        <Image
          source={usaFlag}
          style={{
            height: 24,
            left: 50,
            position: 'absolute',
            top: isSmallScreen ? 351 - 70 : 351,
            width: 30,
          }}
        />
        <Text
          style={{
            fontSize: 18,
            fontWeight: '300',
            left: 89,
            position: 'absolute',
            top: isSmallScreen ? 352 - 70 : 352,
          }}
        >+1</Text>
      </View>
    )
  }
}

PhoneLoginScreen.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  loginField: React.PropTypes.shape({
    el: React.PropTypes.shape({
      focus: React.PropTypes.func.isRequired,
    }),
  }),
  navigator: React.PropTypes.shape({
    replace: React.PropTypes.func.isRequired,
  }),
}

export default connect()(PhoneLoginScreen)
