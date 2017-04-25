import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'
import { Collapse } from 'react-collapse'
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
    const loginRef = { input: null }

    return (
      <View style={{
        alignItems: 'center',
        backgroundColor: '#b4d4d5',
        backgroundImage: 'url(/city-on-a-hill.jpg)',
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        flex: 1,
      }}
      >
        <View style={{
          flex: 1,
          maxWidth: 1250,
          width: '100%',
        }}
        >
          <Text style={{
            color: '#000',
            fontSize: 22,
            fontWeight: 'bold',
            marginTop: 30,
            paddingLeft: 43,
          }}
          >LIQUID DEMOCRACY</Text>

          <MediaQuery minWidth={750}>
            {matchesMinWidth => (<MediaQuery maxDeviceWidth={667}>
              {(matchesMaxDeviceWidth) => {
                const large = matchesMinWidth && !matchesMaxDeviceWidth
                return (
                  <View style={{ alignSelf: large ? 'flex-end' : 'center', marginTop: large ? 185 : 50, paddingRight: matchesMinWidth ? 43 : 0 }}>
                    <IntroDescription large={matchesMinWidth} />
                    { !this.state.pressedGetStarted && (
                      <GetStartedButton
                        pressGetStarted={() => {
                          this.setState({ pressedGetStarted: true })
                          loginRef.input.focus()
                        }}
                      />
                    )}
                    <Collapse isOpened={this.state.pressedGetStarted} springConfig={{ damping: 20, stiffness: 300 }}>
                      <PhoneLoginBox large={matchesMinWidth} loginRef={loginRef} navigator={this.props.navigator} />
                    </Collapse>
                  </View>
                )
              }}
            </MediaQuery>)}
          </MediaQuery>

        </View>

      </View>
    )
  }
}

LoginScreen.disableHeader = true
LoginScreen.disableMenu = true

LoginScreen.propTypes = {
  navigator: React.PropTypes.shape({
    replace: React.PropTypes.func.isRequired,
  }),
  sessionId: React.PropTypes.string, // eslint-disable-line
}

const mapStateToProps = state => ({ sessionId: state.sessionId })

export default connect(mapStateToProps)(LoginScreen)