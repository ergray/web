import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Image,
  View,
} from 'react-native'
import usaFlag from 'usa.png'
import Text from 'Text'
import TextInput from 'TextInput'

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
        width: 350,
      }}
      >
        <TextInput
          autoFocus
          aria-label="Mobile Phone Number"
          autoCorrect={false}
          placeholder="Enter their mobile number"
          style={{
            fontSize: 18,
            fontWeight: '300',
            height: 42,
            marginBottom: '2rem',
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
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            height: 42,
            left: '.5rem',
            position: 'absolute',
            top: 0,
          }}
        >
          <Image
            source={usaFlag}
            style={{
              height: 24,
              width: 30,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: '300',
              marginLeft: '.5rem',
              marginTop: 1,
            }}
          >+1</Text>
        </View>

      </View>
    )
  }
}

AddByPhoneNumber.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
}

export default AddByPhoneNumber
