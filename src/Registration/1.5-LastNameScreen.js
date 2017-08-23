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

class LastNameScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lastName: props.user.last_name,
    }
  }

  componentWillReceiveProps(nextProps) {
    // Update default value if page was hit directly,
    // before redux-persist had rehydrated
    if (this.props.user.last_name !== nextProps.user.last_name) {
      this.setState({ lastName: nextProps.user.last_name })
    }
  }

  render() {
    const width = Math.min(315, Dimensions.get('window').width - 60)

    const submit = () => {
      // Save the new value locally
      this.props.dispatch({
        type: 'SET_USER',
        user: { ...this.props.user,
          last_name: this.state.lastName,
        },
      })

      // Send the new value to the server
      fetch(`${API_URL_V1}/my-registration-info`, {
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
          this.props.history.push('/registration/zip')
        }
      })
    }

    return (
      <View>
        <Header history={this.props.history} step={1} title="THE BASICS" />

        <Text style={{
          alignSelf: 'center',
          fontSize: 18,
          fontWeight: '200',
          marginBottom: 15,
          marginTop: 50,
          width,
        }}
        >What is your last name?</Text>

        <TextInput
          autoFocus
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
          onChangeText={lastName => this.setState({ lastName })}
          onSubmitEditing={() => submit()}
        />

        <Button
          primary
          style={{ alignSelf: 'center', paddingLeft: 0, paddingRight: 0, width }}
          text="Next"
          onPress={() => submit()}
        />
      </View>
    )
  }
}

LastNameScreen.disableHeader = true

LastNameScreen.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
  sessionId: React.PropTypes.string.isRequired,
  user: React.PropTypes.shape({
    last_name: React.PropTypes.string,
  }),
}

LastNameScreen.defaultProps = {
  user: {
    last_name: '',
  },
}

const mapStateToProps = state => ({
  sessionId: state.sessionId,
  user: state.user,
})

export default connect(mapStateToProps)(LastNameScreen)
