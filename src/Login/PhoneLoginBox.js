import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Image,
  Text,
  TextInput,
  View,
} from 'react-native'
import usaFlag from './usa-flag.png'
const pick = require('lodash/fp/pick')

class PhoneLoginBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phone: '',
    }
  }

  render() {
    let placeholderText = `Enter your mobile ${this.props.large ? 'number' : '#'}`
    if (this.props.verySmall) {
      placeholderText = 'Mobile #'
    }

    return (
      <View style={{
        alignSelf: 'flex-start',
        backgroundColor: 'hsla(0, 0%, 13%, 0.9)',
        borderRadius: 10,
        paddingVertical: 40,
        width: this.props.large ? 450 : undefined,
      }}
      >
        <Text
          style={{
            color: '#fff',
            fontSize: 48,
            fontWeight: '100',
            lineHeight: 55,
            marginLeft: 40,
          }}
        >Reclaim</Text>
        <Text
          style={{
            color: '#fff',
            fontSize: 48,
            fontWeight: '100',
            lineHeight: 55,
            marginLeft: 40,
          }}
        >your voice:</Text>
        <TextInput
          autoCorrect={false}
          placeholder={placeholderText}
          ref={(input) => { this.props.loginRef.input = input }}
          style={{
            backgroundColor: '#fff',
            borderColor: '#979797',
            borderRadius: 3,
            borderWidth: 1,
            fontSize: 18,
            fontWeight: '300',
            height: 42,
            marginHorizontal: 38,
            marginTop: 41,
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

            // Backspace final four digits separator
            if (this.state.phone.length === 12 && newText.length === 11) {
              return this.setState({ phone: this.state.phone.slice(0, 8) })
            }

            // Backspace area code closing parenthese
            if (this.state.phone.length === 6 && newText.length === 5) {
              return this.setState({ phone: this.state.phone.slice(0, 3) })
            }

            // Backspace area code opening parenthese
            if (this.state.phone.length === 2 && newText.length === 1) {
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
                return this.props.history.replace('registration')
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
                  return this.props.history.replace('sf')
                })
              }

              // Check if this is a new number
              if (!this.props.knownNumbers[phoneNumber]) {
                this.setState({ phone: newText })
                return this.props.history.push(`confirm-new-number/${phoneNumber}`)
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
              this.props.history.replace('enter-sms')
            }

            // Otherwise, update backing state normally
            return this.setState({ phone: newText })
          }}
        />
        <Image
          source={usaFlag}
          style={{
            bottom: 94,
            height: 24,
            left: 50,
            position: 'absolute',
            width: 30,
          }}
        />
        <Text
          style={{
            bottom: 96,
            fontSize: 18,
            fontWeight: '300',
            left: 87,
            position: 'absolute',
          }}
        >+1</Text>
        <Text
          style={{
            color: '#fff',
            fontSize: 14,
            fontWeight: '100',
            marginLeft: 40,
            marginTop: 30,
          }}
        >
         * Read about our&nbsp;
               <a
                 href="https://blog.liquid.vote/2017/04/08/liquid-privacy/"
                 rel="noopener noreferrer"
                 style={{
                   color: '#fff',
                   cursor: 'pointer',
                 }}
                 target="_blank"
               >strong privacy</a>
        </Text>
      </View>
    )
  }
}

PhoneLoginBox.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
    replace: React.PropTypes.func.isRequired,
  }).isRequired,
  knownNumbers: React.PropTypes.shape({}).isRequired,
  large: React.PropTypes.bool,
  loginRef: React.PropTypes.shape({
    input: React.PropTypes.any,
  }).isRequired,
  verySmall: React.PropTypes.bool,
}

export default connect(pick([
  'knownNumbers',
]))(PhoneLoginBox)
