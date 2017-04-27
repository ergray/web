import React from 'react'
import {
  Image,
  ScrollView,
  Text,
  View,
} from 'react-native'
import HoverableOpacity from '../HoverableOpacity'
import reps from './current-reps'

function BoardScreen({ history }) {
  const repsArray = Object.keys(reps).reduce((memo, district) => (
    [...memo, { ...reps[district], district }]
  ), [])

  return (
    <ScrollView>
      <HoverableOpacity
        activeOpacity={0.5}
        hoverStyle={{ backgroundColor: 'hsla(215, 100%, 68%, 0.1)' }}
        outerStyle={{ margin: 30 }}
        style={{
          alignItems: 'center',
          borderColor: 'hsl(215, 100%, 68%)',
          borderRadius: 5,
          borderWidth: 1,
          height: 40,
          justifyContent: 'center',
        }}
        onPress={() => history.push('/sf/districts-map', { backable: true })}
      >
        <Text style={{ color: '#fff', fontSize: 13 }}>
          VIEW DISTRICTS MAP
        </Text>
      </HoverableOpacity>

      {repsArray.map(rep => (
        <View
          key={rep.name}
          style={{
            alignSelf: 'center',
            borderColor: '#fff',
            borderWidth: 1,
            flexDirection: 'row',
            marginBottom: 20,
          }}
        >
          <Text style={{
            alignSelf: 'center',
            color: '#fff',
            fontSize: 15,
            fontStyle: 'italic',
            fontWeight: '300',
            textAlign: 'center',
            width: 58,
          }}
          >District {rep.district}</Text>
          <Image
            source={rep.photo}
            style={{ height: 80, width: 70 }}
          />
          <Text
            style={{
              alignSelf: 'center',
              color: '#fff',
              fontSize: 17,
              marginBottom: 3,
              textAlign: 'center',
              width: 90,
            }}
          >{rep.name.toUpperCase()}</Text>
        </View>

      ))}
    </ScrollView>
  )
}

BoardScreen.title = 'BOARD OF SUPERVISORS'

BoardScreen.propTypes = {
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
}

export default BoardScreen
