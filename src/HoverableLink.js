import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class HoverableLink extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { href, text, ...restProps } = this.props
    return (
      <a
        href={href}
        style={{ textDecoration: this.state.hover ? 'underline' : 'none' }}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        {...restProps}
      >
        {text}
      </a>
    )
  }
}

HoverableLink.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}
