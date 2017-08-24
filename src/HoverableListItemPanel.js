import PropTypes from 'prop-types'
import React, { Component } from 'react'
import HoverableOpacity from './HoverableOpacity'
import CommonStyle from './CommonStyle'

const cstyle = CommonStyle()

export default class HoverableListItemPanel extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { children, onPress, outerStyle, style } = this.props

    return (
      <HoverableOpacity
        className="listItemPanel"
        delayPressIn={60}
        hoverStyle={{
          borderBottomColor: cstyle.panelBorderHoverColor,
          borderLeftColor: cstyle.btnPrimaryBgColor,
          borderTopColor: cstyle.panelBorderHoverColor,
        }}
        outerStyle={{
          backgroundColor: cstyle.panelColor,
          borderBottomColor: cstyle.panelBorderColor,
          borderBottomWidth: 1,
          borderLeftColor: cstyle.panelColor,
          borderLeftStyle: 'solid',
          borderLeftWidth: 2,
          borderRightColor: cstyle.panelBorderColor,
          borderRightWidth: 1,
          cursor: 'pointer',
          marginBottom: '.1rem',
          marginTop: '.1rem',
          ...outerStyle,
        }}
        style={style}
        onPress={onPress}
      >{children}</HoverableOpacity>
    )
  }
}

HoverableListItemPanel.propTypes = {
  children: PropTypes.element,
  onPress: PropTypes.func,
  outerStyle: PropTypes.shape({}),
  style: PropTypes.shape({}),
}
