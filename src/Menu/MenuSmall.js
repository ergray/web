import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import Menu from 'react-burger-menu/lib/menus/slide'
import CommonStyle from '../CommonStyle'
import Logo from '../Logo'
import MenuOption from './MenuOption'

const cstyle = CommonStyle()

function MenuSmall({ numRequests, dispatch, history, isLoggedOut, message, style = {} }) {
  const MenuOptionWithNav = props => <MenuOption history={history} {...props} activeColor="#EEE" style={{ display: 'block', fontSize: 17, marginBottom: 20 }} underlineWidth={0} /> // eslint-disable-line

  return (
    <View
      style={{
        backgroundColor: cstyle.panelColor,
        borderBottomColor: cstyle.panelBorderColor,
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        height: '4rem',
        ...style,
      }}
    >
      <Logo style={{
        height: 21,
        position: 'absolute',
        right: 35,
        top: 20,
      }}
      />
      <Menu styles={{
        bmBurgerBars: {
          background: '#373a47',
        },
        bmBurgerButton: {
          height: 25,
          left: 20,
          position: 'relative',
          top: 20,
          width: 30,
        },
        bmCross: {
          background: '#bdc3c7',
          height: 30,
          right: 15,
          top: 5,
        },
        bmCrossButton: {
          height: 50,
          right: 0,
          top: 0,
          width: 50,
        },
        bmItemList: {
          color: '#b8b7ad',
          padding: '0.8em',
        },
        bmMenu: {
          background: '#373a47',
          fontSize: '1.15em',
          padding: '2em 0',
        },
        bmMorphShape: {
          fill: '#373a47',
        },
        bmOverlay: {
          background: 'rgba(0, 0, 0, 0.3)',
        },
      }}
      >

        {isLoggedOut &&
          <MenuOptionWithNav
            text="Sign in"
            to="/sign-in"
          />
        }

        {!isLoggedOut &&
          <MenuOptionWithNav
            style={{ color: cstyle.menuHoverColor }}
            text={message}
            to="/voting-power"
          />
        }

        <MenuOptionWithNav text="Legislature" to="/legislation" />
        <MenuOptionWithNav notifications={numRequests} text="Your Delegates" to="/delegates" />
        <MenuOptionWithNav text="About" to="/about" />

        { !isLoggedOut &&
          <MenuOptionWithNav
            text="Log out"
            onPress={() => {
              dispatch({ type: 'LOGOUT' })
              history.replace('/')
            }}
          />
        }
      </Menu>
    </View>
  )
}

MenuSmall.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  history: React.PropTypes.shape({}).isRequired,
  isLoggedOut: React.PropTypes.bool.isRequired,
  message: React.PropTypes.string.isRequired,
  numRequests: React.PropTypes.number,
  style: React.PropTypes.shape({}),
}

const mapStateToProps = state => ({
  constituents: state.constituents,
  user: state.user,
  votingPower: state.votingPower,
})

export default connect(mapStateToProps)(MenuSmall)
