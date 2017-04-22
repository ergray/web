import React, { Component } from 'react'
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import logo from '../logo.png'

class EnterSMSCodeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editable: true,
      error: false,
      loading: false,
      session_code: '',
      status: 'Look for text message.',
    }
  }

  sendSessionCodeToServer(session_code) {
    if (!this.props.phoneNumber) {
      this.setState({ error: true, loading: false, status: 'Missing phone number, start over.' })
      return
    }

    this.setState({ loading: true, status: 'Confirming...' })


    fetch('https://api.liquid.vote/enter-session-code', {
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
          this.props.navigator.replace({ name: 'HomeScreen' })
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
    const inputErrorStyle = {}

    if (this.state.error) {
      inputErrorStyle.borderColor = 'red'
      inputErrorStyle.borderWidth = 3
    }

    return (
      <View style={{ alignSelf: 'center', maxWidth: 385, width: '100%' }}>
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
        >LIQUID DEMOCRACY</Text>

        <Text style={{
          color: '#fff',
          fontSize: 18,
          fontWeight: '200',
          marginHorizontal: 30,
          marginVertical: 30,
          textAlign: 'center',
        }}
        >{this.state.status}</Text>

        <Text style={{
          alignSelf: 'center',
          color: '#fff',
          fontSize: 15,
          fontWeight: '100',
          marginBottom: 5,
          width: 170,
        }}
        >Enter 3-digit code:</Text>

        <TextInput
          autoFocus
          clearTextOnFocus
          autoCorrect={false}
          editable={this.state.editable}
          keyboardType="number-pad"
          maxLength={3}
          style={[{
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
          }, inputErrorStyle]}
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
              this.setState({ error: false, status: 'Look for text message.' })
            }
          }}
        />

        { !this.state.loading &&
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              alignItems: 'center',
              borderColor: '#344184',
              borderRadius: 30,
              borderWidth: 4,
              height: 58,
              justifyContent: 'center',
              marginHorizontal: 30,
            }}
            onPress={() => this.props.navigator.replace({ name: 'LoginScreen' })}
          >
            <Text style={{ color: '#fff', fontFamily: 'HelveticaNeue, Helvetica', fontSize: 16, fontWeight: '600' }}>
              BACK
            </Text>
          </TouchableOpacity>
        }

      </View>
    )
  }
}

EnterSMSCodeScreen.disableHeader = true

EnterSMSCodeScreen.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  navigator: React.PropTypes.shape({
    replace: React.PropTypes.func.isRequired,
  }),
  phoneNumber: React.PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  phoneNumber: state.phoneNumber,
})

export default connect(mapStateToProps)(EnterSMSCodeScreen)
