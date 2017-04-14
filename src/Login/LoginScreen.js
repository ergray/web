import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import LoginHeader from './LoginHeader'
import IntroDescription from './IntroDescription'
import PhoneLoginBox from './PhoneLoginBox'

class LoginScreen extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.sessionId) {
      this.props.navigator.replace({ name: 'HomeScreen' })
    }
  }

  render() {
    const loginField = { el: { focus: () => {} } } // overwritten in PhoneLoginBox

    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <LoginHeader />

        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          <IntroDescription />
          <View style={{ flex: 1 }} />
          <PhoneLoginBox loginField={loginField} navigator={this.props.navigator} />
        </View>

      </View>
    )
  }
}

LoginScreen.disableHeader = true

LoginScreen.propTypes = {
  navigator: React.PropTypes.shape({
    replace: React.PropTypes.func.isRequired,
  }),
  sessionId: React.PropTypes.string, // eslint-disable-line
}

const mapStateToProps = state => ({ sessionId: state.sessionId })

export default connect(mapStateToProps)(LoginScreen)
