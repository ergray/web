import React, { Component } from 'react'
import { Image } from 'react-native'
import logo from './logo.png'

class MenuLogo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: false,
    }
  }

  render() {
    const href = '/about'
    return (
      <a
        href={href}
        style={{
          animationDuration: '2s',
          animationIterationCount: 'infinite',
          animationName: this.state.hover ? 'App-logo-fade' : '',
          animationTimingFunction: 'linear',
          cursor: 'pointer',
          paddingRight: '1rem',
        }}
        onClick={(e) => {
          e.preventDefault()
          this.props.history.push(href)
        }}
        onMouseEnter={() => { this.setState({ hover: true }) }}
        onMouseLeave={() => { this.setState({ hover: false }) }}
      >
        <Image
          source={logo}
          style={{
            height: 32,
            resizeMode: 'contain',
            width: 40,
          }}
        />
      </a>
    )
  }
}

MenuLogo.propTypes = {
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
}

export default MenuLogo
