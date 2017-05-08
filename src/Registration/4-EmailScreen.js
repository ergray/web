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
      email: props.user.email,
    }
  }

  componentWillReceiveProps(nextProps) {
    // Update default value if page was hit directly,
    // before redux-persist had rehydrated
    if (this.props.user.email !== nextProps.user.email) {
      this.setState({ email: nextProps.user.email })
    }
  }

  render() {
    const width = Math.min(315, Dimensions.get('window').width - 60)

    return (
      <View>
        <Header history={this.props.history} step={4} title="CONTACT INFO" />

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
          onChangeText={email => this.setState({ email })}
          onSubmitEditing={() => {
            // Save the new value locally
            this.props.dispatch({
              type: 'SET_USER',
              user: { ...this.props.user,
                email: this.state.email,
              },
            })

            // Send the new value to the server
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
                this.props.history.push('/registration/thank-you')
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
  dispatch: React.PropTypes.func.isRequired,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
  sessionId: React.PropTypes.string.isRequired,
  user: React.PropTypes.shape({
    email: React.PropTypes.string,
  }),
}

EmailScreen.defaultProps = {
  user: {
    email: '',
  },
}

const mapStateToProps = state => ({
  sessionId: state.sessionId,
  user: state.user,
})

export default connect(mapStateToProps)(EmailScreen)
