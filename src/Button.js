import PropTypes from 'prop-types'
import React, { Component } from 'react'
import CommonStyle from './CommonStyle'
import Link from './Link'

const cstyle = CommonStyle()

/**
 * A button must only contain string children and takes the following parameters:
 *
 * primary    primary button style
 * secondary  secondary button style (default)
 * outline    outline button style
 * icon=      optional icon image to use
 * onPress=   handler for button press
 */

export default class Button extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { backable, history, icon, onPress, outline, primary, style = {}, text, to } = this.props

    let borderColor = cstyle.btnSecondaryBorderColor
    if (primary) borderColor = cstyle.btnPrimaryBorderColor
    if (outline) borderColor = cstyle.btnOutlineBorderColor

    let bgColor = cstyle.btnSecondaryBgColor
    if (primary) bgColor = cstyle.btnPrimaryBgColor
    if (outline) bgColor = cstyle.btnOutlineBgColor

    let bgHoverColor = cstyle.btnSecondaryHoverBgColor
    if (primary) bgHoverColor = cstyle.btnPrimaryBgColor
    if (outline) bgHoverColor = cstyle.btnOutlineHoverBgColor

    let color = cstyle.menuColor
    if (primary) color = cstyle.btnPrimaryColor
    if (outline) color = cstyle.btnOutlineColor

    let hoverColor = cstyle.bodyColor
    if (primary) hoverColor = cstyle.btnPrimaryHoverColor
    if (outline) hoverColor = cstyle.btnOutlineHoverColor

    return (
      <Link
        backable={backable}
        history={history}
        hoverStyle={{
          backgroundColor: bgHoverColor,
          color: hoverColor,
        }}
        href={to}
        icon={icon}
        pressedStyle={{
          backgroundColor: bgHoverColor,
          borderBottomWidth: 1,
          borderTopColor: bgColor,
          borderTopWidth: 1,
          color: hoverColor,
        }}
        style={{
          alignItems: 'center',
          backgroundColor: bgColor,
          borderBottomStyle: 'solid',
          borderBottomWidth: outline ? 2 : 2,
          borderColor,
          borderLeftStyle: 'solid',
          borderLeftWidth: outline ? 2 : 0,
          borderRadius: 2,
          borderRightStyle: 'solid',
          borderRightWidth: outline ? 2 : 0,
          borderTopStyle: 'solid',
          borderTopWidth: outline ? 2 : 0,
          color,
          cursor: 'pointer',
          display: 'flex',
          fontSize: 14,
          fontWeight: '500',
          height: 38,
          justifyContent: 'center',
          paddingLeft: '1rem',
          paddingRight: '1rem',
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

Button.propTypes = {
  backable: PropTypes.bool,
  history: PropTypes.shape({}),
  icon: PropTypes.func,
  onPress: PropTypes.func,
  outline: PropTypes.bool,
  primary: PropTypes.bool,
  style: PropTypes.shape({}),
  text: PropTypes.string.isRequired,
  to: PropTypes.string,
}
