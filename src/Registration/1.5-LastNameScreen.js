import React, { Component } from 'react'
import {
  Dimensions,
  TextInput,
  Text,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import Header from './Header'

class LastNameScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lastName: '',
    }
  }

  render() {
    const width = Math.min(315, Dimensions.get('window').width - 60)

    return (
      <View>
        <Header history={this.props.history} step={1} title="THE BASICS" />

        <Text style={{
          alignSelf: 'center',
          color: '#fff',
          fontSize: 18,
          fontWeight: '200',
          marginBottom: 15,
          marginTop: 50,
          width,
        }}
        >What is your last name?</Text>

        <TextInput
          autoFocus
          clearTextOnFocus
          autoCorrect={false}
          placeholder="last name"
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
            width,
          }}
          value={this.state.lastName}
          onChangeText={(newText) => { this.setState({ lastName: newText }) }}
          onSubmitEditing={() => {
            fetch('https://api.liquid.vote/my-registration-info', {
              body: JSON.stringify({
                last_name: this.state.lastName,
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
                this.props.history.push({ name: 'ZipScreen', transition: null })
              }
            })
          }}
        />

      </View>
    )
  }
}

LastNameScreen.disableHeader = true

LastNameScreen.propTypes = {
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
  sessionId: React.PropTypes.string.isRequired,
}

const mapStateToProps = state => ({ sessionId: state.sessionId })

export default connect(mapStateToProps)(LastNameScreen)
