import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import { connect } from 'react-redux'
import Button from 'Button'
import LiquidMark from 'images/liquid_mark.svg'
import Image from 'Image'
import Text from 'Text'
import TextInput from 'TextInput'

class EnterSMSCodeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editable: true,
      error: false,
      loading: false,
      session_code: '',
      status: 'Look for a new text message.',
    }
  }

  sendSessionCodeToServer(session_code) {
    if (!this.props.phoneNumber) {
      this.setState({ error: true, loading: false, status: 'Missing phone number, start over.' })
      return
    }

    this.setState({ loading: true, status: 'Confirming...' })


    fetch(`${API_URL_V1}/enter-session-code`, {
      body: JSON.stringify({
        phone: this.props.phoneNumber,
        session_code,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then((response) => {
        if (response.status === 200) {
          response.json()
            .then((json) => {
              this.props.dispatch({
                isVerified: json.is_verified,
                sessionId: json.session_id,
                type: 'LOGIN_USER',
                user: json.user,
              })
              if (json.user.complete) {
                this.props.history.replace('/legislation')
              } else {
                this.props.history.replace('/registration')
              }
            })
        }

        if (response.status === 400) {
          this.setState({ error: true, loading: false, status: 'Bad request.' })
        }

        if (response.status === 401) {
          this.setState({ error: true, loading: false, status: 'Invalid.' })
        }

        if (response.status === 429) {
          this.setState({ editable: false, error: true, loading: false, status: 'Too many failed attempts. Go back.' })
        }
      })
  }

  render() {
    const { history } = this.props

    return (
      <View style={{ alignSelf: 'center', maxWidth: 385, width: '100%' }}>
        <Image
          source={LiquidMark}
          style={{
            alignSelf: 'center',
            height: 52,
            marginBottom: 5,
            marginTop: 32,
            width: 60,
          }}
        />
        <Text style={{
          alignSelf: 'center',
          fontSize: 19,
          fontWeight: '700',
          textTransform: 'uppercase',
        }}
        >Liquid Democracy</Text>

        <Text style={{
          fontSize: 18,
          fontWeight: '200',
          marginHorizontal: 30,
          marginVertical: 30,
          textAlign: 'center',
        }}
        >{this.state.status}</Text>

        <Text style={{
          alignSelf: 'center',
          fontSize: 15,
          fontWeight: '100',
          marginBottom: 5,
          width: 170,
        }}
        >Enter 3-digit code:</Text>

        <TextInput
          autoFocus
          clearTextOnFocus
          aria-label="Code received from text message"
          autoCorrect={false}
          editable={this.state.editable}
          error={this.state.error && this.state.status}
          keyboardType="number-pad"
          maxLength={3}
          style={{
            alignSelf: 'center',
            backgroundColor: '#fff',
            borderColor: '#979797',
            borderRadius: 3,
            borderWidth: 1,
            fontSize: 60,
            fontWeight: '300',
            height: 100,
            marginBottom: 30,
            textAlign: 'center',
            width: 170,
          }}
          value={this.state.session_code}
          onChangeText={(newText) => {
            // When done
            if (newText.length === 3) {
              this.sendSessionCodeToServer(newText)
            }

            // Otherwise, update backing state normally
            return this.setState({ session_code: newText })
          }}
          onFocus={() => {
            // Clear out error state
            if (this.state.error) {
              this.setState({ error: false, status: 'Look for a new text message.' })
            }
          }}
        />

        { !this.state.loading &&
          <Button
            history={history}
            text="Back"
            onPress={() => {
              this.props.history.replace('/')
            }}
          />
        }

      </View>
    )
  }
}

EnterSMSCodeScreen.disableHeader = true
EnterSMSCodeScreen.disableMenu = true

EnterSMSCodeScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }),
  phoneNumber: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  phoneNumber: state.phoneNumber,
})

export default connect(mapStateToProps)(EnterSMSCodeScreen)
