import React, { Component } from 'react'
import {
  Dimensions,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import Button from '../Button'
import Text from '../Text'
import TextInput from '../TextInput'
import Header from './Header'

class ZipScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      zip: props.user.zip,
    }
  }

  componentWillReceiveProps(nextProps) {
    // Update default value if page was hit directly,
    // before redux-persist had rehydrated
    if (this.props.user.zip !== nextProps.user.zip) {
      this.setState({ zip: nextProps.user.zip })
    }
  }

  render() {
    const history = this.props.history
    const width = Math.min(315, Dimensions.get('window').width - 60)

    return (
      <View>
        <Header history={this.props.history} step={2} title="YOUR JURISDICTION" />

        <Text style={{
          alignSelf: 'center',
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

            // Automatically stop when they hit 5 characters
            if (newText.length === 5) {
              // Save the new value locally
              this.props.dispatch({
                type: 'SET_USER',
                user: { ...this.props.user,
                  zip: newText,
                },
              })

              // Send the new value to the server
              fetch(`${API_URL_V1}/my-registration-info`, {
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
                  this.props.history.push('/registration/address')
                }
              })
            }
          }}
        />

        <Button
          primary
          history={history}
          style={{ alignSelf: 'center', paddingLeft: 0, paddingRight: 0, width }}
          text="Next"
          to="/registration/address"
        />

      </View>
    )
  }
}

ZipScreen.disableHeader = true

ZipScreen.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
  sessionId: React.PropTypes.string.isRequired,
  user: React.PropTypes.shape({
    zip: React.PropTypes.string,
  }),
}

ZipScreen.defaultProps = {
  user: {
    zip: '',
  },
}

const mapStateToProps = state => ({
  sessionId: state.sessionId,
  user: state.user,
})

export default connect(mapStateToProps)(ZipScreen)
