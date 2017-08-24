import PropTypes from 'prop-types'
import React, { Component } from 'react'
import HoverableOpacity from './HoverableOpacity'
import CommonStyle from './CommonStyle'

const cstyle = CommonStyle()

export default class HoverableListItemPanel extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { outerStyle, style, ...remainingProps } = this.props

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
        {...remainingProps}
      />
    )
  }
}

HoverableListItemPanel.propTypes = {
  outerStyle: PropTypes.shape({}),
  style: PropTypes.shape({}),
}
