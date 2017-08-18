import React, { Component } from 'react'
import {
  Dimensions,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import { api_url } from '../Config'
import Button from '../Button'
import Text from '../Text'
import TextInput from '../TextInput'
import Header from './Header'

class AddressScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: props.user.address,
    }
  }

  componentWillReceiveProps(nextProps) {
    // Update default value if page was hit directly,
    // before redux-persist had rehydrated
    if (this.props.user.address !== nextProps.user.address) {
      this.setState({ address: nextProps.user.address })
    }
  }

  render() {
    const width = Math.min(315, Dimensions.get('window').width - 60)

    const submit = () => {
      // Save the new value locally
      this.props.dispatch({
        type: 'SET_USER',
        user: { ...this.props.user,
          address: this.state.address,
        },
      })

      // Send the new value to the server
      fetch(`${api_url}/my-registration-info`, {
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
          this.props.history.push('/registration/email')
        }
      })
    }

    return (
      <View>
        <Header history={this.props.history} step={3} title="YOUR JURISDICTION" />

        <Text style={{
          alignSelf: 'center',
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
          onSubmitEditing={() => submit()}
        />

        <Button
          primary
          style={{ alignSelf: 'center', marginTop: '1rem', paddingLeft: 0, paddingRight: 0, width }}
          text="Next"
          onPress={() => submit()}
        />
      </View>
    )
  }
}

AddressScreen.disableHeader = true

AddressScreen.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
  sessionId: React.PropTypes.string.isRequired,
  user: React.PropTypes.shape({
    address: React.PropTypes.string,
  }),
}

AddressScreen.defaultProps = {
  user: {
    address: '',
  },
}

const mapStateToProps = state => ({
  sessionId: state.sessionId,
  user: state.user,
})

export default connect(mapStateToProps)(AddressScreen)
