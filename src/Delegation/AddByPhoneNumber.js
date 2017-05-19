import React, { Component } from 'react'
import {
  Image,
  Text,
  TextInput,
  View,
} from 'react-native'
import usaFlag from '../Login/usa-flag.png'

class AddByPhoneNumber extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phone: '',
    }
  }

  render() {
    return (
      <View style={{
        alignSelf: 'center',
        backgroundColor: 'hsla(0, 0%, 17%, 0.9)',
        borderRadius: 10,
        paddingVertical: 30,
        width: 370,
      }}
      >
        <Text
          style={{
            color: '#fff',
            fontSize: 28,
            marginLeft: 40,
          }}
        >Add by phone number</Text>
        <TextInput
          autoCorrect={false}
          placeholder="Enter their mobile number"
          style={{
            backgroundColor: '#fff',
            borderColor: '#979797',
            borderRadius: 3,
            borderWidth: 1,
            fontSize: 18,
            fontWeight: '300',
            height: 42,
            marginHorizontal: 38,
            marginTop: 20,
            paddingLeft: 75,
          }}
          value={this.state.phone}
          onChangeText={(newText) => {
            // Add area code opening parenthese
            if (this.state.phone === '') {
              return this.setState({ phone: `(${newText}` })
            }

            // Add area code closing parenthese
            if (this.state.phone.length === 3 && newText.length === 4) {
              return this.setState({ phone: `${newText}) ` })
            }

            // Split final four digits
            if (this.state.phone.length === 8 && newText.length === 9) {
              return this.setState({ phone: `${newText} - ` })
            }

            // Backspace final four digits separator
            if (this.state.phone.length === 12 && newText.length === 11) {
              return this.setState({ phone: this.state.phone.slice(0, 8) })
            }

            // Backspace area code closing parenthese
            if (this.state.phone.length === 6 && newText.length === 5) {
              return this.setState({ phone: this.state.phone.slice(0, 3) })
            }

            // Backspace area code opening parenthese
            if (this.state.phone.length === 2 && newText.length === 1) {
              return this.setState({ phone: '' })
            }

            // When done
            if (newText.length === 16) {
              // Remove all but digits
              const phoneNumber = newText.split('')
                .filter(character => '0123456789'.indexOf(character) > -1)
                .join('')

              this.props.history.push(`/delegates/add/${phoneNumber}`)
            }

            // Otherwise, update backing state normally
            return this.setState({ phone: newText })
          }}
        />
        <Image
          source={usaFlag}
          style={{
            height: 24,
            left: 50,
            position: 'absolute',
            top: 91,
            width: 30,
          }}
        />
        <Text
          style={{
            fontSize: 18,
            fontWeight: '300',
            left: 87,
            position: 'absolute',
            top: 93,
          }}
        >+1</Text>

      </View>
    )
  }
}

AddByPhoneNumber.propTypes = {
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
    replace: React.PropTypes.func.isRequired,
  }).isRequired,
}

export default AddByPhoneNumber
