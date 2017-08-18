import React, { Component } from 'react'
import CommonStyle from './CommonStyle'
import Link from './Link'

const cstyle = CommonStyle()

class MenuOption extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const { history, onPress, text, style = {}, to } = this.props
    // todo add back notifications marker

    let active = history.location.pathname.substr(0, (to ? to.length : 0)) === to
    if (history.location.pathname === '/') {
      active = to === '/legislation'
    }
    let borderColor = 'transparent'
    let color = cstyle.bodyColorLowlight

    if (active) {
      borderColor = cstyle.btnPrimaryHoverBgColor
      color = cstyle.menuHoverColor
    }

    return (
      <Link
        history={history}
        hoverStyle={{
          borderBottomColor: cstyle.btnPrimaryHoverBgColor,
          borderBottomStyle: 'solid',
          borderBottomWidth: 2,
          color: cstyle.menuHoverColor,
        }}
        href={to}
        pressedStyle={{
          borderBottomColor: cstyle.btnPrimaryHoverBgColor,
          borderBottomStyle: 'solid',
          borderBottomWidth: 2,
          color: cstyle.menuHoverColor,
          paddingTop: 1,
        }}
        style={{
          alignItems: 'center',
          borderBottomColor: borderColor,
          borderBottomStyle: 'solid',
          borderBottomWidth: 2,
          color,
          cursor: 'pointer',
          display: 'flex',
          fontSize: 13,
          fontWeight: '500',
          height: '100%',
          marginLeft: '1rem',
          marginRight: '1rem',
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
  history: React.PropTypes.shape({}).isRequired,
  onPress: React.PropTypes.func,
  style: React.PropTypes.shape({}),
  text: React.PropTypes.string.isRequired,
  to: React.PropTypes.string,
}

export default MenuOption
