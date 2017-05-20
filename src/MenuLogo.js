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
    return (
      <Image
        source={logo}
        style={{
          alignSelf: 'center',
          animation: this.state.hover ? 'App-logo-spin infinite 3s linear' : undefined,
          height: 84,
          marginBottom: 10,
          marginTop: 12,
          width: 79,
        }}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      />
    )
  }
}

export default MenuLogo
