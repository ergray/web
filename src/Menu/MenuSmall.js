import PropTypes from 'prop-types'
import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import Menu from 'react-burger-menu/lib/menus/slide'
import CommonStyle from 'CommonStyle'
import LiquidMark from 'images/liquid_mark.svg'
import LiquidText from 'images/liquid_text_dark.svg'
import Image from 'Image'
import MenuOption from 'Menu/MenuOption'

const cstyle = CommonStyle()

function MenuSmall({ numRequests, dispatch, history, isLoggedOut, message, style = {} }) {
  const MenuOptionWithNav = props => <MenuOption history={history} {...props} activeColor="#EEE" style={{ display: 'block', fontSize: 17, marginBottom: 20 }} underlineWidth={0} /> // eslint-disable-line

  return (
    <View
      accessible
      accessibilityRole="navigation"
      style={{
        backgroundColor: cstyle.panelColor,
        borderBottomColor: cstyle.panelBorderColor,
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        height: '4rem',
        ...style,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          height: 21,
          position: 'absolute',
          right: 35,
          top: 20,
        }}
      >
        <Image alt="United.Vote" source={LiquidText} style={{ height: '100%', marginRight: 10 }} />
        <Image alt="" source={LiquidMark} style={{ height: '100%' }} />
      </View>
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
            text="Join us"
            to="/join"
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
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  isLoggedOut: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  numRequests: PropTypes.number,
  style: PropTypes.shape({}),
}

const mapStateToProps = state => ({
  constituents: state.constituents,
  user: state.user,
  votingPower: state.votingPower,
})

export default connect(mapStateToProps)(MenuSmall)
