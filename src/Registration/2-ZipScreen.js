import React, { Component } from 'react'
import {
  Dimensions,
  Keyboard,
  Text,
  TextInput,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import Header from './Header'

class ZipScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      zip: '',
    }
  }

  render() {
    const width = Math.min(315, Dimensions.get('window').width - 60)

    return (
      <View>
        <Header navigator={this.props.navigator} step={2} title="YOUR JURISDICTION" />

        <Text style={{
          alignSelf: 'center',
          color: '#fff',
          fontSize: 18,
          fontWeight: '200',
          marginBottom: 15,
          marginTop: 50,
          textAlign: 'center',
          width,
        }}
        >What is your home zip code?</Text>

        <TextInput
          autoFocus
          clearTextOnFocus
          autoCorrect={false}
          keyboardType="number-pad"
          maxLength={5}
          placeholder="94102"
          returnKeyType="next"
          style={{
            alignSelf: 'center',
            backgroundColor: '#fff',
            borderColor: '#979797',
            borderRadius: 3,
            borderWidth: 1,
            fontSize: 30,
            fontWeight: '300',
            height: 60,
            marginBottom: 30,
            paddingLeft: 15,
            width: 115,
          }}
          value={this.state.zip}
          onChangeText={(newText) => {
            this.setState({ zip: newText })

            if (newText.length === 5) {
              Keyboard.dismiss()

              this.props.dispatch({ type: 'SET_REGISTRATION_ZIP', zip: newText })

              fetch('https://api.liquid.vote/my-registration-info', {
                body: JSON.stringify({
                  zip: newText,
                }),
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Session_ID: this.props.sessionId,
                },
                method: 'PUT',
              })
              .then((response) => {
                if (response.status === 200) {
                  this.props.navigator.push({ name: 'AddressScreen', transition: null })
                }
              })
            }
          }}
        />

      </View>
    )
  }
}

ZipScreen.disableHeader = true

ZipScreen.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  navigator: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
  sessionId: React.PropTypes.string.isRequired,
}

const mapStateToProps = state => ({ sessionId: state.sessionId })

export default connect(mapStateToProps)(ZipScreen)
