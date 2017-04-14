import React, { Component } from 'react'
import { Dimensions, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'

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
      <View style={{ flex: 1, width: 600 }}>

        <TextInput
          autoFocus
          multiline
          numberOfLines={15}
          placeholder="I want you to know that..."
          style={{
            backgroundColor: '#fff',
            borderRadius: 3,
            fontSize: 16,
            marginHorizontal: 30,
            marginTop: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
        />

        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            alignItems: 'center',
            borderColor: '#5DA0FF',
            borderRadius: 5,
            borderWidth: 1,
            height: 38,
            justifyContent: 'center',
            marginHorizontal: 30,
            marginTop: 20,
          }}
          onPress={() => {
            fetch('https://api.liquid.vote/feedback', {
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
        >
          <Text style={{ color: '#fff', fontSize: 14 }}>
            SEND
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

FeedbackScreen.title = 'FEEDBACK'

FeedbackScreen.propTypes = {
  sessionId: React.PropTypes.string.isRequired,
  user: React.PropTypes.shape({}),
}

const mapStateToProps = state => ({ sessionId: state.sessionId, user: state.user })

export default connect(mapStateToProps)(FeedbackScreen)
