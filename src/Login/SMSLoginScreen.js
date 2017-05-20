import React, { Component } from 'react'
import {
  Image,
  Text,
  TextInput,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import logo from '../logo.png'
import HoverableOpacity from '../HoverableOpacity'

class SMSLoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editable: true,
      error: false,
      loading: false,
      session_code: props.match.params.session_code,
      status: '',
    }

    // Automatically send the initial status code value from url
    setTimeout(
      () => { this.sendSessionCodeToServer(this.state.session_code) },
      100,
    )
  }

  sendSessionCodeToServer(session_code) {
    if (!this.props.match.params.phoneNumber) {
      this.setState({ error: true, loading: false, status: 'Missing phone number, start over.' })
      return
    }

    this.setState({ loading: true, status: 'Confirming...' })


    fetch('https://api.liquid.vote/enter-session-code', {
      body: JSON.stringify({
        phone: this.props.match.params.phoneNumber,
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
            this.props.history.replace('/sf')
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
            height: 63,
            marginBottom: 5,
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
              this.setState({ error: false, status: 'Look for a new text message.' })
            }
          }}
        />

        { !this.state.loading &&
          <HoverableOpacity
            activeOpacity={0.5}
            hoverStyle={{ backgroundColor: 'rgba(90, 6, 7, 0.15)' }}
            outerStyle={{
              borderColor: 'rgb(90, 6, 7)',
              borderRadius: 30,
              borderWidth: 3,
              marginBottom: 30,
              marginTop: 30,
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 16,
            }}
            onPress={() => {
              this.props.history.replace('/')
            }}
          >
            <Text style={{ color: '#fff', fontFamily: 'HelveticaNeue, Helvetica', fontSize: 16, fontWeight: '600' }}>
              BACK
            </Text>
          </HoverableOpacity>
        }

      </View>
    )
  }
}

SMSLoginScreen.disableHeader = true
SMSLoginScreen.disableMenu = true

SMSLoginScreen.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  history: React.PropTypes.shape({
    replace: React.PropTypes.func.isRequired,
  }),
  match: React.PropTypes.shape({
    params: React.PropTypes.shape({
      phoneNumber: React.PropTypes.string,
      session_code: React.PropTypes.string,
    }).isRequired,
  }).isRequired,
}

const mapStateToProps = () => ({})

export default connect(mapStateToProps)(SMSLoginScreen)
