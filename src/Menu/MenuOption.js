import PropTypes from 'prop-types'
import React, { Component } from 'react'
import CommonStyle from '../CommonStyle'
import Link from '../Link'

const cstyle = CommonStyle()

class MenuOption extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const { history, onPress, style = {}, underlineWidth = 2, text, to } = this.props
    let { activeColor } = this.props
    // todo add back notifications marker

    let active = history.location.pathname.substr(0, (to ? to.length : 0)) === to
    if (history.location.pathname === '/') {
      active = to === '/legislation'
    }
    let borderColor = 'transparent'
    let color = cstyle.bodyColorLowlight

    activeColor = activeColor || cstyle.menuHoverColor

    if (active) {
      borderColor = cstyle.btnPrimaryHoverBgColor
      color = activeColor
    }

    return (
      <Link
        history={history}
        hoverStyle={{
          borderBottomColor: cstyle.btnPrimaryHoverBgColor,
          borderBottomStyle: 'solid',
          borderBottomWidth: underlineWidth,
          color: activeColor,
        }}
        href={to}
        pressedStyle={{
          borderBottomColor: cstyle.btnPrimaryHoverBgColor,
          borderBottomStyle: 'solid',
          borderBottomWidth: underlineWidth,
          color: activeColor,
          paddingTop: 1,
        }}
        style={{
          alignItems: 'center',
          borderBottomColor: borderColor,
          borderBottomStyle: 'solid',
          borderBottomWidth: underlineWidth,
          color,
          cursor: 'pointer',
          display: 'flex',
          fontSize: 13,
          fontWeight: '500',
          marginLeft: '1rem',
          marginRight: '1rem',
          textDecoration: 'none',
          textTransform: 'uppercase',
          ...style,
        }}
        text={text}
        onPress={onPress}
      />
    )
  }
}

MenuOption.propTypes = {
  activeColor: PropTypes.string,
  history: PropTypes.shape({}).isRequired,
  onPress: PropTypes.func,
  style: PropTypes.shape({}),
  text: PropTypes.string.isRequired,
  to: PropTypes.string,
  underlineWidth: PropTypes.number,
}

export default MenuOption
