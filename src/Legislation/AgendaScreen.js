import React from 'react'
import {
  View,
} from 'react-native'
import BillsList from './BillsList'

function AgendaScreen(props) {
  return (
    <View style={{ alignSelf: 'center' }}>
      <BillsList {...props} />
    </View>
  )
}

AgendaScreen.title = 'PAST AGENDA'

AgendaScreen.propTypes = {}

export default AgendaScreen
