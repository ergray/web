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
            {large => (
              <View style={{ alignSelf: large ? 'flex-end' : 'center', marginTop: large ? 185 : 50, paddingRight: large ? 43 : 0 }}>
                <IntroDescription large={large} />
                { !this.state.pressedGetStarted && (
                  <GetStartedButton
                    pressGetStarted={() => this.setState({ pressedGetStarted: true })}
                  />
                )}
                <Collapse isOpened={this.state.pressedGetStarted} springConfig={{ damping: 20, stiffness: 300 }}>
                  <PhoneLoginBox large={large} navigator={this.props.navigator} />
                </Collapse>
              </View>
            )}
          </MediaQuery>

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
