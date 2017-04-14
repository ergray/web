import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

function Link({ navigator, onPress, notifications, style, text, to }) {
  if (!onPress) {
    onPress = () => { // eslint-disable-line no-param-reassign
      navigator.push({ name: to })
    }
  }

  return (
    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={onPress}>
      <Text style={{
        color: '#fff',
        fontSize: 14,
        fontWeight: '400',
        marginLeft: 30,
        marginVertical: 10,
        ...style,
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

Link.propTypes = {
  navigator: React.PropTypes.shape({
    push: React.PropTypes.func,
  }),
  notifications: React.PropTypes.number,
  onPress: React.PropTypes.func,
  style: React.PropTypes.shape({}),
  text: React.PropTypes.string.isRequired,
  to: React.PropTypes.string,
}

export default Link
