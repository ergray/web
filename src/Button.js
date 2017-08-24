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
    if (primary) bgHoverColor = cstyle.btnPrimaryHoverBgColor
    if (outline) bgHoverColor = cstyle.btnOutlineHoverBgColor

    let color = cstyle.btnSecondaryColor
    if (primary) color = cstyle.btnPrimaryColor
    if (outline) color = cstyle.btnOutlineColor

    return (
      <Link
        backable={backable}
        history={history}
        hoverStyle={{
          backgroundColor: bgHoverColor,
          color: outline ? cstyle.btnOutlineHoverColor : color,
        }}
        href={to}
        icon={icon}
        pressedStyle={{
          backgroundColor: borderColor,
          borderBottomWidth: 1,
          paddingTop: 1,
        }}
        style={{
          alignItems: 'center',
          backgroundColor: bgColor,
          borderBottomStyle: 'solid',
          borderBottomWidth: 2,
          borderColor,
          borderLeftStyle: 'solid',
          borderLeftWidth: outline ? 2 : 0,
          borderRadius: 3,
          borderRightStyle: 'solid',
          borderRightWidth: outline ? 2 : 1,
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
