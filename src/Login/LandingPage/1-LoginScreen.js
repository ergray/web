/* global document, window */

import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'
import { Collapse } from 'react-collapse'
import FadeIn from './FadeIn'
import IntroDescription from './IntroDescription'
import PhoneLoginBox from './PhoneLoginBox'
import GetStartedButton from './GetStartedButton'
import ExtendedLandingPage from './ExtendedLandingPage'

class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pressedGetStarted: false,
    }

    // Set viewport tag for responsive device width
    this.viewport = document.querySelector('meta[name=viewport]')
    this.viewport.setAttribute('content', 'width=device-width, initial-scale=1.0')
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sessionId) {
      this.props.history.replace('sf')
    }
  }

  componentWillUnmount() {
    // Unset viewport tag for all other pages
    this.viewport.setAttribute('content', 'min-width=0, max-width=none, initial-scale=0.0')
  }

  render() {
    const loginRef = { input: { focus: () => {} } }

    return (
      <View style={{ }}>
        <View style={{
          alignItems: 'center',
          backgroundColor: '#b4d4d5',
          backgroundImage: 'url(/city-on-a-hill.jpg)',
          backgroundPosition: 'bottom',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: 860,
        }}
        >
          <View style={{
            flex: 1,
            maxWidth: 1250,
            paddingTop: 30,
            width: '100%',
          }}
          >
            <FadeIn>
              <Text style={{
                color: '#000',
                fontSize: 20,
                fontWeight: 'bold',
                paddingLeft: 43,
              }}
              >LIQUID DEMOCRACY</Text>
            </FadeIn>

            <MediaQuery minWidth={750}>
              {matchesMinWidth => (<MediaQuery maxDeviceWidth={667}>
                {(matchesMaxDeviceWidth) => {
                  const large = matchesMinWidth && !matchesMaxDeviceWidth
                  return (
                    <View style={{
                      alignSelf: large ? 'flex-end' : 'stretch',
                      marginHorizontal: large ? 0 : 30,
                      marginTop: large ? 185 : 50,
                      paddingRight: large ? 43 : 0,
                    }}
                    >
                      <FadeIn>
                        <View />
                        <IntroDescription large={large} />
                        { !this.state.pressedGetStarted && (
                          <GetStartedButton
                            large={large}
                            pressGetStarted={() => {
                              this.setState({ pressedGetStarted: true })
                              loginRef.input.focus()
                              setTimeout(() => window.scrollTo(0, 9999), 200)
                            }}
                          />
                        )}
                      </FadeIn>
                      <Collapse isOpened={this.state.pressedGetStarted} springConfig={{ damping: 20, stiffness: 300 }}>
                        <MediaQuery maxWidth={370}>
                          {verySmall => (
                            <PhoneLoginBox history={this.props.history} large={large} loginRef={loginRef} verySmall={verySmall} />
                          )}
                        </MediaQuery>
                      </Collapse>
                    </View>
                  )
                }}
              </MediaQuery>)}
            </MediaQuery>

          </View>

        </View>

        <ExtendedLandingPage />

      </View>
    )
  }
}

LoginScreen.disableHeader = true
LoginScreen.disableMenu = true

LoginScreen.propTypes = {
  history: React.PropTypes.shape({
    replace: React.PropTypes.func.isRequired,
  }).isRequired,
  sessionId: React.PropTypes.string, // eslint-disable-line
}

const mapStateToProps = state => ({ sessionId: state.sessionId })

export default connect(mapStateToProps)(LoginScreen)
