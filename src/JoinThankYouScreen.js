/* eslint-env browser */
/* eslint-disable no-multi-assign */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View } from 'react-native'
import Button from 'Button'
import CommonStyle from 'CommonStyle'
const pick = require('lodash/fp/pick')
const isAndroid = /Android/i.test(navigator && navigator.userAgent)

const cstyle = CommonStyle()

class JoinThankYouScreen extends Component {
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
        <Button
          primary
          history={history}
          style={{ alignSelf: 'center', marginTop: '1rem' }}
          text="Go to Legislation →"
          to="/legislation"
        />
      </View>
    )
  }
}

JoinThankYouScreen.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
}

JoinThankYouScreen.title = 'You\'ve subscribed to United.Vote updates. Welcome.'

export default connect(pick([
  'knownNumbers',
]))(JoinThankYouScreen)
