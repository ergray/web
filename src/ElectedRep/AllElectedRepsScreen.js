import React from 'react'
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import reps from './current-reps'

function AllElectedRepsScreen({ navigator }) {
  const repsArray = Object.keys(reps).reduce((memo, district) => (
    [...memo, { ...reps[district], district }]
  ), [])

  return (
    <ScrollView>
      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          alignItems: 'center',
          borderColor: '#5DA0FF',
          borderRadius: 5,
          borderWidth: 1,
          height: 38,
          justifyContent: 'center',
          marginHorizontal: 30,
          marginVertical: 20,
        }}
        onPress={() => navigator.push({ name: 'DistrictsMapScreen' })}
      >
        <Text style={{ color: '#fff', fontSize: 13 }}>
          VIEW DISTRICTS MAP
        </Text>
      </TouchableOpacity>

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

AllElectedRepsScreen.title = 'BOARD OF SUPERVISORS'

AllElectedRepsScreen.propTypes = {
  navigator: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
}

export default AllElectedRepsScreen
