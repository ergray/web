import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Platform, TouchableWithoutFeedback } from 'react-native'
import CommonStyle from 'CommonStyle'
import Text from 'Text'

const cstyle = CommonStyle()

export default class Link extends Component {
  constructor(props) {
    super(props)
    this.state = { pressed: false }
  }

  render() {
    const { backable, hoverStyle = {}, history, href, icon, onPress, pressedStyle = {}, rel, target, text } = this.props
    const Icon = icon
    let style = { color: cstyle.aColor, ...this.props.style }

    if (this.state.hover) {
      style = { ...style, color: cstyle.aHoverColor, ...hoverStyle }
    }

    if (this.state.pressed) {
      style = { ...style, color: cstyle.aHoverColor, ...pressedStyle }
    }

    if (Platform.OS === 'web') {
      return (
        <a
          href={href}
          rel={rel}
          style={style}
          target={target}
          onClick={(e) => {
            if (history) {
              e.preventDefault()
              if (onPress) {
                onPress(e)
              } else {
                history.push(href, { backable })
              }
            }
          }}
          onMouseDown={() => {
            this.setState({ pressed: true })
          }}
          onMouseEnter={() => {
            this.setState({ hover: true })
          }}
          onMouseLeave={() => {
            this.setState({ hover: false })
          }}
          onMouseUp={() => {
            this.setState({ pressed: false })
          }}
        >
          {!!icon && <Icon size="1.5em" style={{ marginRight: '.25rem' }} />}
          {text}
        </a>
      )
    }

    return (
      <TouchableWithoutFeedback
        delayPressIn={60}
        onMouseEnter={() => {
          this.setState({ hover: true })
        }}
        onMouseLeave={() => {
          this.setState({ hover: true })
        }}
        onPress={(e) => {
          if (onPress) {
            onPress(e)
          } else {
            this.setState({ pressed: true })
            history.push(href, { backable })
          }
        }}
      >
        {!!icon && <icon />}
        <Text style={style}>{text}</Text>
      </TouchableWithoutFeedback>
    )
  }
}

Link.propTypes = {
  backable: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  hoverStyle: PropTypes.shape({}),
  href: PropTypes.string,
  icon: PropTypes.func,
  onPress: PropTypes.func,
  pressedStyle: PropTypes.shape({}),
  rel: PropTypes.string,
  style: PropTypes.shape({}),
  target: PropTypes.string,
  text: PropTypes.string.isRequired,
}
