import React from 'react'
import {
  Image,
  ScrollView,
  View,
} from 'react-native'
import Button from '../Button'
import Text from '../Text'
import reps from './current-reps'

function BoardScreen({ history }) {
  const repsArray = Object.keys(reps).reduce((memo, district) => (
    [...memo, { ...reps[district], district }]
  ), [])

  return (
    <ScrollView style={{ padding: '2rem' }}>
      <Button
        backable
        primary
        history={history}
        style={{ marginBottom: '2rem' }}
        text="View districts map"
        to="/sf/districts-map"
      />

      {repsArray.map(rep => (
        <View
          key={rep.name}
          style={{
            alignSelf: 'center',
            borderColor: '#ebebeb',
            borderWidth: 1,
            flexDirection: 'row',
            marginBottom: 20,
          }}
        >
          <Text style={{
            alignSelf: 'center',
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
              fontSize: 17,
              marginBottom: 3,
              textAlign: 'center',
              textTransform: 'uppercase',
              width: 90,
            }}
          >{rep.name}</Text>
        </View>

      ))}
    </ScrollView>
  )
}

BoardScreen.title = 'Board of Supervisors'

BoardScreen.propTypes = {
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
}

export default BoardScreen
