import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

class MenuOption extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const { navigator, notifications, style, text, to } = this.props
    let { onPress } = this.props

    if (!onPress) {
      onPress = () => { // eslint-disable-line no-param-reassign
        navigator.push({ name: to })
      }
    }

    return (
      <TouchableOpacity
        delayPressIn={60}
        style={{ backgroundColor: this.state.hover ? 'hsl(0,0%,10%)' : null, flexDirection: 'row', ...style }}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        onPress={onPress}
      >
        <Text style={{
          color: '#fff',
          fontSize: 14,
          fontWeight: '400',
          marginLeft: 30,
          marginVertical: 10,
        }}
        >{text}</Text>
        { !!notifications &&
          <View style={{
            alignSelf: 'center',
            borderColor: '#d62728',
            borderRadius: 15,
            borderWidth: 2,
            height: 28,
            justifyContent: 'center',
            marginLeft: 5,
            width: 28,
          }}
          >
            <Text style={{ color: '#fff', textAlign: 'center' }}>{notifications}</Text>
          </View>
        }
      </TouchableOpacity>
    )
  }
}

MenuOption.propTypes = {
  navigator: React.PropTypes.shape({
    push: React.PropTypes.func,
  }),
  notifications: React.PropTypes.number,
  onPress: React.PropTypes.func,
  style: React.PropTypes.shape({}),
  text: React.PropTypes.string.isRequired,
  to: React.PropTypes.string,
}

export default MenuOption
