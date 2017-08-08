import React, { Component } from 'react'

export default class HoverableLink extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { href, text } = this.props

    return (
      <a
        href={href}
        style={{ textDecoration: this.state.hover ? 'underline' : 'none' }}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        {text}
      </a>
    )
  }
}

HoverableLink.propTypes = {
  href: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
}
