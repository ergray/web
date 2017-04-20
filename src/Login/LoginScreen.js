import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import IntroDescription from './IntroDescription'
import PhoneLoginBox from './PhoneLoginBox'
import GetStartedButton from './GetStartedButton'

class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pressedGetStarted: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sessionId) {
      this.props.navigator.replace({ name: 'HomeScreen' })
    }
  }

  render() {
    return (
      <View style={{
        alignItems: 'center',
        backgroundColor: '#b4d4d5',
        backgroundImage: 'url(/city-on-a-hill.jpg)',
        backgroundPositionY: 'bottom',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        flex: 1,
      }}
      >
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 1250,
        }}
        >
          <Text style={{
            color: '#000',
            fontSize: 22,
            fontWeight: 'bold',
            marginTop: 30,
          }}
          >LIQUID DEMOCRACY</Text>

          <View style={{ marginTop: 185 }}>
            <IntroDescription />
            { !this.state.pressedGetStarted ?
              (
                <GetStartedButton
                  pressGetStarted={() => this.setState({ pressedGetStarted: true })}
                />
              ) : (
                <PhoneLoginBox navigator={this.props.navigator} />
              )
            }
          </View>
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
