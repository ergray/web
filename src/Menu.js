import React from 'react'
import { Dimensions, Linking, Text, View } from 'react-native'
import { connect } from 'react-redux'
import TwitterIcon from 'react-icons/lib/fa/twitter'
import FacebookIcon from 'react-icons/lib/fa/facebook'
import MenuLogo from './MenuLogo'
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

  let message = `Hello, ${first_name} (${votingPower})`

  const isLoggedOut = Object.keys(user).length === 0

  if (isLoggedOut) {
    message = 'JOIN'
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', ...style }}>
      <MenuLogo />

      <HoverableOpacity
        hoverStyle={{ backgroundColor: 'hsla(0,0%,100%,0.04)' }}
        outerStyle={{
          borderColor: 'rgb(5, 165, 209)',
          borderRadius: 3,
          borderStyle: 'solid',
          borderWidth: isLoggedOut ? 1 : 0,
          marginLeft: 20,
        }}
        onPress={() => history.push(isLoggedOut ? '/' : '/voting-power')}
      >
        <Text
          style={{
            color: '#fff',
            fontSize: isLoggedOut ? 16 : 21,
            fontWeight: '200',
          }}
        >{message}</Text>
      </HoverableOpacity>

      <View style={{ flexDirection: 'row', flexGrow: 1, justifyContent: 'flex-end' }}>
        <MenuOptionWithNav text="Legislature" to="/sf" />
        <MenuOptionWithNav notifications={numRequests} text="Your Delegates" to="/delegates" />
        { user.sf_district
          ? <MenuOptionWithNav text="Your Legislator: A+" to="/sf/elected-rep" />
          : <MenuOptionWithNav text="Your Legislators" to="/sf/board" />
        }
        <MenuOptionWithNav text="About" to="/about" />
        <MenuOptionWithNav text="Feedback" to="/feedback" />

        { !isLoggedOut &&
          <MenuOptionWithNav
            hoverColor="rgba(251, 82, 82, 0.1)"
            text="Log out" onPress={() => {
              dispatch({ type: 'LOGOUT' })
              history.replace('/')
            }}
          />
        }

        <View style={{ flexDirection: 'row' }}>
          <HoverableOpacity
            style={{ padding: 10, marginLeft: 20 }}
            onPress={() => {
              Linking.openURL('https://twitter.com/liquid_vote')
              .catch(() => {})
            }}
          >
            <TwitterIcon color="white" size={18} />
          </HoverableOpacity>
          <HoverableOpacity
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
