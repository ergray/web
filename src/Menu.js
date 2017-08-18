import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import CommonStyle from './CommonStyle'
import MenuLogo from './MenuLogo'
import MenuOption from './MenuOption'
import HoverableOpacity from './HoverableOpacity'

const cstyle = CommonStyle()

function Menu({ constituents, dispatch, history, style = {}, user, votingPower = '..' }) {
  const MenuOptionWithNav = props => <MenuOption history={history} {...props} /> // eslint-disable-line

  let numRequests
  if (constituents && constituents.requests) {
    numRequests = constituents.requests.length
  }

  let first_name = user.first_name
  if (!first_name) {
    first_name = 'UNREGISTERED'
  }

  let message = `Hi, ${first_name} (${votingPower})`

  const isLoggedOut = Object.keys(user).length === 0

  if (isLoggedOut) {
    message = 'JOIN'
  }

  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: cstyle.panelColor,
        borderBottomColor: cstyle.panelBorderColor,
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        flexDirection: 'row',
        height: '4rem',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        ...style,
      }}
    >

      <HoverableOpacity
        outerStyle={{
          alignItems: 'center',
          cursor: 'pointer',
          flexDirection: 'row',
          height: '100%',
          paddingRight: '1rem',
        }}
        onPress={() => history.push('/about')}
      ><MenuLogo /></HoverableOpacity>

      <MenuOptionWithNav text="Legislature" to="/legislation" />
      <MenuOptionWithNav notifications={numRequests} text="Your Delegates" to="/delegates" />
      <MenuOptionWithNav text="About" to="/about" />

      <View style={{ alignItems: 'center', flexDirection: 'row', flexGrow: 1, height: '100%', justifyContent: 'flex-end' }}>
        { isLoggedOut &&
          <MenuOptionWithNav
            text="Sign in"
            to="/sign-in"
          />
        }

        { !isLoggedOut &&
          <MenuOptionWithNav
            style={{ color: cstyle.menuHoverColor }}
            text={message}
            to="/voting-power"
          />
        }

        { !isLoggedOut &&
          <MenuOptionWithNav
            text="Log out"
            onPress={() => {
              dispatch({ type: 'LOGOUT' })
              history.replace('/')
            }}
          />
        }
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
