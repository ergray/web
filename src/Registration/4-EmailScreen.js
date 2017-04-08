import React, { Component } from 'react'
import {
  Dimensions,
  Text,
  TextInput,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import Header from './Header'

class EmailScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
    }
  }

  render() {
    const width = Math.min(315, Dimensions.get('window').width - 60)

    return (
      <View>
        <Header navigator={this.props.navigator} step={4} title="CONTACT INFO" />

        <Text style={{
          alignSelf: 'center',
          color: '#fff',
          fontSize: 18,
          fontWeight: '200',
          marginBottom: 15,
          marginTop: 50,
          width,
        }}
        >What is your email address?</Text>

        <TextInput
          autoFocus
          clearTextOnFocus
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          placeholder="you@email.com"
          returnKeyType="next"
          style={{
            alignSelf: 'center',
            backgroundColor: '#fff',
            borderColor: '#979797',
            borderRadius: 3,
            borderWidth: 1,
            fontSize: 20,
            fontWeight: '300',
            height: 60,
            marginBottom: 30,
            paddingLeft: 15,
            width,
          }}
          value={this.state.email}
          onChangeText={(newText) => { this.setState({ email: newText }) }}
          onSubmitEditing={() => {
            fetch('https://api.liquid.vote/my-registration-info', {
              body: JSON.stringify({
                complete: true,
                email: this.state.email,
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
                this.props.navigator.push({ name: 'ThankYouScreen', transition: null })
              }
            })
          }}
        />

      </View>
    )
  }
}

EmailScreen.disableHeader = true

EmailScreen.propTypes = {
  navigator: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
  sessionId: React.PropTypes.string.isRequired,
}

const mapStateToProps = state => ({ sessionId: state.sessionId })

export default connect(mapStateToProps)(EmailScreen)
