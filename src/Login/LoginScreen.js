import React, { Component } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import GetStartedScreen from './1-GetStartedScreen'
import IntroScreen from './1.3-IntroScreen'
import PhoneLoginScreen from './1.7-PhoneLoginScreen'

class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { page: 0 }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sessionId) {
      this.props.navigator.replace({ name: 'HomeScreen' })
    }
  }

  render() {
    const { page } = this.state
    const loginField = { el: { focus: () => {} } } // overwritten in PhoneLoginScreen

    return (
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <ScrollView
          horizontal pagingEnabled
          keyboardDismissMode="on-drag"
          ref={(el) => { this.scrollView = el }}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            const x = event.nativeEvent.contentOffset.x
            const screenWidth = 450
            const halfWidth = screenWidth / 2

            let newPage = 0

            if (x > halfWidth) {
              newPage = 1
            }
            if (x > halfWidth + screenWidth) {
              newPage = 2
            }

            this.setState({ page: newPage })
          }}
        >
          <GetStartedScreen />
          <IntroScreen navigator={this.props.navigator} />
          <PhoneLoginScreen loginField={loginField} navigator={this.props.navigator} />
        </ScrollView>

        <View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              alignItems: 'center',
              borderColor: '#344184',
              borderRadius: 30,
              borderWidth: 3,
              height: 58,
              justifyContent: 'center',
              marginHorizontal: 30,
            }}
            onPress={() => {
              this.scrollView.scrollToEnd({ animated: true })
              loginField.el.focus()
            }}
          >
            <Text style={{ color: '#fff', fontFamily: 'HelveticaNeue', fontSize: 16, fontWeight: '600' }}>
              GET STARTED
            </Text>
          </TouchableOpacity>
          <View style={{
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 15,
            width: 50,
          }}
          >
            <FontAwesomeIcon color={page === 0 ? '#ccc' : '#444'} name="circle" size={10} />
            <FontAwesomeIcon color={page === 1 ? '#ccc' : '#444'} name="circle" size={10} />
            <FontAwesomeIcon color={page === 2 ? '#ccc' : '#444'} name="circle" size={10} />
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
