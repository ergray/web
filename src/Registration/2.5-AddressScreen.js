import React, { Component } from 'react'
import {
  Dimensions,
  Text,
  TextInput,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import Header from './Header'

class AddressScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
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
          width,
        }}
        >What is your address?</Text>

        <TextInput
          autoFocus
          autoCorrect={false}
          placeholder="742 Evergreen Terrace"
          returnKeyType="next"
          style={{
            alignSelf: 'center',
            backgroundColor: '#fff',
            borderColor: '#979797',
            borderRadius: 3,
            borderWidth: 1,
            height: 60,
            paddingLeft: 15,
            width,
          }}
          value={this.state.address}
          onChangeText={address => this.setState({ address })}
          onSubmitEditing={() => {
            fetch('https://api.liquid.vote/my-registration-info', {
              body: JSON.stringify({
                address: this.state.address,
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
                this.props.navigator.push({ name: 'LegalIdScreen', transition: null })
              }
            })
          }}
        />

      </View>
    )
  }
}

AddressScreen.disableHeader = true

AddressScreen.propTypes = {
  navigator: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
  sessionId: React.PropTypes.string.isRequired,
}

const mapStateToProps = state => ({ sessionId: state.sessionId })

export default connect(mapStateToProps)(AddressScreen)
