/* eslint-env browser */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Image, View } from 'react-native'
import Text from './Text'
import TextInput from './TextInput'
import Link from './Link'
import usaFlag from './Login/LandingPage/usa-flag.png'
const pick = require('lodash/fp/pick')
const isAndroid = /Android/i.test(navigator && navigator.userAgent)

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loginRef: { input: { focus: () => {} } },
      phone: '',
    }
  }

  handleAndroid() {
    const textInputRef = this.state.loginRef.input
    const inputLength = textInputRef.props ? textInputRef.props.value.length : 0
    let offSet

    // for area code parens ex. (415)
    if (inputLength < 3) {
      offSet = inputLength + 3
    }

    // for digits after area code ex (415) 123
    if (inputLength >= 3 && inputLength < 8) {
      offSet = inputLength + 4
    }

    // for final 4 digits ex (415) 123 4567
    if (inputLength >= 8) {
      offSet = inputLength + 5
    }

    // only move cursor on android mobile
    // and don't bother moving it when the default is correct
    if (isAndroid && inputLength < 9) {
      const selection = {
        end: textInputRef.props ? offSet : 0,
        start: textInputRef.props ? offSet : 0,
      }
      return selection
    }
    return null
  }

  render() {
    const { dispatch, history, large, verySmall } = this.props

    let placeholderText = `Enter your mobile ${large ? 'number' : '#'}`
    if (verySmall) {
      placeholderText = 'Mobile #'
    }

    return (
      <View style={{
        alignSelf: 'center',
        width: 350,
      }}
      >
        <TextInput
          autoCorrect={false}
          placeholder={placeholderText}
          ref={(input) => {
            // Enable autofocus on all but the smallest screens
            if (!verySmall) {
              this.state.loginRef.input = input
            }
          }}
          selection={this.handleAndroid()}
          style={{
            fontSize: 18,
            fontWeight: '300',
            height: 42,
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
                dispatch({ type: 'START_REGISTRATION_DEMO' })
                return history.replace('registration')
              }

              // Special code to demo login
              if (phoneNumber === '0000001776') {
                this.setState({ phone: newText })
                return fetch(`${API_URL_V1}/login/demo`, {
                  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                  method: 'POST',
                })
                  .then(response => response.json())
                  .then(({ sessionId, user }) => {
                    dispatch({ sessionId, type: 'START_LOGIN_DEMO', user })
                    return history.replace('sf')
                  })
              }

              // Check if this is a new number
              if (!this.props.knownNumbers[phoneNumber]) {
                this.setState({ phone: newText })
                return history.push(`confirm-new-number/${phoneNumber}`)
              }

              fetch(`${API_URL_V1}/login`, {
                body: JSON.stringify({
                  phone: phoneNumber,
                }),
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                method: 'POST',
              })

              dispatch({ phoneNumber, type: 'SET_PHONE_NUMBER' })
              history.replace('enter-sms')
            }

            // Otherwise, update backing state normally
            return this.setState({ phone: newText })
          }}
        />
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            height: 42,
            left: '.5rem',
            position: 'absolute',
            top: 0,
          }}
        >
          <Image
            source={usaFlag}
            style={{
              height: 24,
              width: 30,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: '300',
              marginLeft: '.5rem',
              marginTop: 1,
            }}
          >+1</Text>
        </View>
        <View style={{ alignItems: 'center', marginTop: '2rem' }}>
          <Text
            style={{
              fontSize: '13px',
              fontWeight: '600',
            }}
          >
           We will never share your phone number.
          </Text>
          <Text style={{ fontSize: '11px', marginTop: '1rem', textAlign: 'center' }}>
            Your personal information is safeguarded using the same encryption that banks use.
            Read about our strong&nbsp;
            <Link
              hoverStyle={{ textDecoration: 'underline' }}
              href="https://blog.liquid.vote/2017/04/08/liquid-privacy/"
              rel="noopener noreferrer"
              style={{
                cursor: 'pointer',
              }}
              target="_blank"
              text="privacy protections"
            />
            .
          </Text>
        </View>
      </View>
    )
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
  knownNumbers: PropTypes.shape({}).isRequired,
  large: PropTypes.bool,
  verySmall: PropTypes.bool,
}

Login.title = 'Sign in using your phone'

export default connect(pick([
  'knownNumbers',
]))(Login)
