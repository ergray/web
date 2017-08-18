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
          height: 32,
          resizeMode: 'contain',
          width: 40,
        }}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      />
    )
  }
}

export default MenuLogo
