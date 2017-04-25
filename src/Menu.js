import React from 'react'
import { Dimensions, Image, Linking, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import TwitterIcon from 'react-icons/lib/fa/twitter'
import FacebookIcon from 'react-icons/lib/fa/facebook'
import logo from './logo.png'
import MenuOption from './MenuOption'

function Menu({ constituents, dispatch, navigator, style = {}, user }) {
  const MenuOptionWithNav = props => <MenuOption navigator={navigator} {...props} /> // eslint-disable-line

  let numRequests
  if (constituents && constituents.requests) {
    numRequests = constituents.requests.length
  }

  const smallScreen = Dimensions.get('window').height < 600

  let first_name = user.first_name
  if (!first_name) {
    first_name = 'UNREGISTERED'
  }

  return (
    <View style={style}>
      <Image
        source={logo}
        style={{ alignSelf: 'center', height: 75, marginBottom: 12, marginTop: 20, width: 79 }}
      />
      <Text
        style={{
          color: '#fff',
          fontSize: 19,
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >LIQUID DEMOCRACY</Text>

      <TouchableOpacity
        style={{ marginVertical: 20 }}
        onPress={() => navigator.push({ name: 'YourRegistrationScreen', transition: 'SwipeFromLeft' })}
      >
        <Text
          style={{
            color: '#fff',
            fontSize: 21,
            fontWeight: '200',
            marginVertical: 20,
            textAlign: 'center',
          }}
        >Hello, {first_name}</Text>
      </TouchableOpacity>

      <View>
        <MenuOptionWithNav text="LEGISLATURE" to="HomeScreen" />
        <MenuOptionWithNav text="YOUR DELEGATES" to="DelegatesScreen" />
        <MenuOptionWithNav notifications={numRequests} text="REQUESTS" to="RequestsScreen" />
        <MenuOptionWithNav
          text="ABOUT" onPress={() => {
            Linking.openURL('https://blog.liquid.vote/2016/09/21/what-is-liquid-democracy/')
            .catch(() => {})
          }}
        />
        <MenuOptionWithNav style={{ marginTop: 30 }} text="SEND FEEDBACK" to="FeedbackScreen" />
        <MenuOptionWithNav
          style={{ marginTop: 30 }}
          text="LOG OUT" onPress={() => {
            dispatch({ type: 'LOGOUT' })
            navigator.resetTo({ name: 'LoginScreen' })
          }}
        />

        <View style={{ flexDirection: 'row', marginTop: smallScreen ? 0 : 20 }}>
          <TouchableOpacity
            style={{ marginLeft: 20, padding: 10 }}
            onPress={() => {
              Linking.openURL('https://twitter.com/liquid_vote')
              .catch(() => {})
            }}
          >
            <TwitterIcon color="white" size={18} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 10, padding: 10 }}
            onPress={() => {
              Linking.openURL('https://facebook.com/liquidvote')
              .catch(() => {})
            }}
          >
            <FacebookIcon color="white" size={18} />
          </TouchableOpacity>
        </View>

      </View>

    </View>
  )
}

Menu.propTypes = {
  constituents: React.PropTypes.shape({}),
  dispatch: React.PropTypes.func.isRequired,
  navigator: React.PropTypes.shape({
    resetTo: React.PropTypes.func.isRequired,
  }).isRequired,
  style: React.PropTypes.shape({}),
  user: React.PropTypes.shape({}),
}

const mapStateToProps = state => ({
  constituents: state.constituents,
  user: state.user,
})

export default connect(mapStateToProps)(Menu)
