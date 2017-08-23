import React, { Component } from 'react'
import { Dimensions, View } from 'react-native'
import { connect } from 'react-redux'

import Button from './Button'
import Text from './Text'
import TextInput from './TextInput'

class FeedbackScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sent: false,
      text: '',
    }
  }

  render() {
    const { sessionId, user } = this.props

    if (this.state.sent) {
      return (
        <Text style={{
          alignSelf: 'center',
          color: '#fff',
          fontSize: 20,
          fontWeight: '700',
          marginTop: 150,
        }}
        >✓ Sent.</Text>
      )
    }

    return (
      <View style={{ alignSelf: 'center', flex: 1, width: 600 }}>

        <TextInput
          autoFocus
          multiline
          numberOfLines={15}
          placeholder="Hi, I wanted to let you know that..."
          style={{
            backgroundColor: '#fff',
            borderRadius: 3,
            fontSize: 16,
            marginVertical: 30,
            padding: 10,
          }}
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
        />

        <Button
          primary
          outerStyle={{
            height: '3rem',
          }}
          text="Send"
          onPress={() => {
            fetch(`${API_URL_V1}/feedback`, {
              body: JSON.stringify({
                dimensions: Dimensions.get('window'),
                sessionId,
                text: this.state.text,
                user,
                version: 'web',
              }),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              method: 'POST',
            })
            .then(() => this.setState({ sent: true }))
          }}
        />
      </View>
    )
  }
}

FeedbackScreen.title = 'Feedback'

FeedbackScreen.propTypes = {
  sessionId: React.PropTypes.string.isRequired,
  user: React.PropTypes.shape({}),
}

const mapStateToProps = state => ({ sessionId: state.sessionId, user: state.user })

export default connect(mapStateToProps)(FeedbackScreen)
