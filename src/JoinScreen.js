/* eslint-env browser */
/* eslint-disable no-multi-assign */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View } from 'react-native'
import Button from 'Button'
import CommonStyle from 'CommonStyle'
import Text from 'Text'
import TextInput from 'TextInput'
import Link from 'Link'
const pick = require('lodash/fp/pick')
const isAndroid = /Android/i.test(navigator && navigator.userAgent)

const cstyle = CommonStyle()

class JoinScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      invalidEmail: false,
      loginRef: { input: { focus: () => {} } },
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
    const { history } = this.props

    const inputStyle = {
      backgroundColor: '#fff',
      borderRadius: 3,
      borderWidth: 1,
      fontSize: 18,
      fontWeight: 300,
      height: 42,
      width: 350,
    }

    if (this.state.invalidEmail) {
      inputStyle.borderBottomColor =
      inputStyle.borderLeftColor =
      inputStyle.borderRightColor =
      inputStyle.borderTopColor = cstyle.errorColor
    }

    return (
      <View style={{
        alignSelf: 'center',
        width: 450,
      }}
      >
        <Text style={{ fontWeight: 300, textAlign: 'center' }}>
          Enter your e-mail to receive updates on our progress and when united.vote is released:
        </Text>
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 32, width: 450 }}>
          <TextInput
            aria-label="E-mail"
            autoCorrect={false}
            placeholder="E-Mail Address"
            selection={this.handleAndroid()}
            style={inputStyle}
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
          <Button
            primary
            text="Submit"
            onPress={() => {
              const email = this.state.email
              const valid = email.replace(/[^@]/g, '').length === 1 && email.length > 3
              this.setState({ invalidEmail: !valid })
              if (valid) {
                this.setState({ invalidEmail: false })
                fetch(`${API_URL_V1}/subscribe`, {
                  body: JSON.stringify({
                    email,
                  }),
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  method: 'POST',
                }).then(() => history.replace('join/thank-you'))
              }
            }}
          />
        </View>
        {this.state.invalidEmail && <Text style={{ color: cstyle.errorColor, fontSize: 13, textAlign: 'left' }}>The e-mail you entered was not valid. Please correct it and try again.</Text>}
        <Text style={{ fontSize: 11, marginTop: 16, textAlign: 'center' }}>
          <Text style={{ fontWeight: '600' }}>We will never share your e-mail.&nbsp;</Text>
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
    )
  }
}

JoinScreen.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
}

JoinScreen.title = 'Join us to take back our democracy'

export default connect(pick([
  'knownNumbers',
]))(JoinScreen)
