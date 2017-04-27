import React from 'react'
import { Dimensions, Image, Linking, Text, View } from 'react-native'
import { connect } from 'react-redux'
import TwitterIcon from 'react-icons/lib/fa/twitter'
import FacebookIcon from 'react-icons/lib/fa/facebook'
import logo from './logo.png'
import MenuOption from './MenuOption'
import HoverableOpacity from './HoverableOpacity'

function Menu({ constituents, dispatch, history, style = {}, user, votingPower = '..' }) {
  const MenuOptionWithNav = props => <MenuOption history={history} {...props} /> // eslint-disable-line

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

      <HoverableOpacity
        hoverStyle={{ backgroundColor: 'hsla(0,0%,100%,0.04)' }}
        outerStyle={{ marginVertical: 20 }}
        onPress={() => history.push('your-registration')}
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
      </HoverableOpacity>

      <View>
        <MenuOptionWithNav text="LEGISLATURE" to="/sf" />
        <MenuOptionWithNav text={`VOTING POWER: ${votingPower}`} to="/voting-power" />
        <MenuOptionWithNav text="YOUR DELEGATES" to="/delegates" />
        { user.sf_district
          ? <MenuOptionWithNav text="ELECTED REP: A+" to="/sf/elected-rep" />
          : <MenuOptionWithNav text="ELECTED REPS" to="/sf/board" />
        }
        <MenuOptionWithNav notifications={numRequests} text="REQUESTS" to="/delegates/requests" />
        <MenuOptionWithNav
          text="ABOUT" onPress={() => {
            Linking.openURL('https://blog.liquid.vote/2016/09/21/what-is-liquid-democracy/')
            .catch(() => {})
          }}
        />
        <MenuOptionWithNav style={{ marginTop: 30 }} text="SEND FEEDBACK" to="/feedback" />
        <MenuOptionWithNav
          hoverColor="rgba(251, 82, 82, 0.1)"
          style={{ marginTop: 30 }}
          text="LOG OUT" onPress={() => {
            dispatch({ type: 'LOGOUT' })
            history.replace('/')
          }}
        />

        <View style={{ flexDirection: 'row', marginTop: smallScreen ? 0 : 20 }}>
          <HoverableOpacity
            hoverStyle={{ backgroundColor: 'rgba(0,132,180,0.5)' }}
            outerStyle={{ marginLeft: 20 }}
            style={{ padding: 10 }}
            onPress={() => {
              Linking.openURL('https://twitter.com/liquid_vote')
              .catch(() => {})
            }}
          >
            <TwitterIcon color="white" size={18} />
          </HoverableOpacity>
          <HoverableOpacity
            hoverStyle={{ backgroundColor: 'rgba(59,89,152,0.5)' }}
            outerStyle={{ marginLeft: 10 }}
            style={{ padding: 10 }}
            onPress={() => {
              Linking.openURL('https://facebook.com/liquidvote')
              .catch(() => {})
            }}
          >
            <FacebookIcon color="white" size={18} />
          </HoverableOpacity>
        </View>

      </View>

    </View>
  )
}

Menu.propTypes = {
  constituents: React.PropTypes.shape({}),
  dispatch: React.PropTypes.func.isRequired,
  history: React.PropTypes.shape({}).isRequired,
  style: React.PropTypes.shape({}),
  user: React.PropTypes.shape({}),
  votingPower: React.PropTypes.number,
}

const mapStateToProps = state => ({
  constituents: state.constituents,
  user: state.user,
  votingPower: state.votingPower,
})

export default connect(mapStateToProps)(Menu)
