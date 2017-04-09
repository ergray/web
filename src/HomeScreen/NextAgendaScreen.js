import React from 'react'
import {
  ScrollView,
  Text,
} from 'react-native'
import { connect } from 'react-redux'
import { convertDateToLongFormat } from '../Legislation/convert-dates'
import PastAgendas from '../Legislation/PastAgendas'
import BillsList from '../Legislation/BillsList' // eslint-disable-line import/newline-after-import
const pick = require('lodash/fp/pick')

function NextAgendaScreen(props) {
  const { navigator, nextAgenda } = props

  if (!nextAgenda) {
    return (
      <Text style={{
        color: '#fff',
        fontSize: 18,
        fontWeight: '300',
        marginHorizontal: 30,
        marginTop: 20,
      }}
      >Loading...</Text>
    )
  }

  const { date, message } = nextAgenda

  if (!date) {
    return (
      <ScrollView style={{ marginBottom: 37 }}>
        <Text style={{
          color: '#fff',
          fontSize: 18,
          fontWeight: '300',
          marginHorizontal: 30,
          marginTop: 20,
        }}
        >{message}</Text>
        <PastAgendas navigator={navigator} />
      </ScrollView>
    )
  }

  const { bills } = nextAgenda

  if (!bills) {
    return (
      <ScrollView style={{ marginBottom: 37 }}>
        <Text style={{ color: '#fff', marginTop: 15, textAlign: 'center' }}>
          NO AGENDA FOR {convertDateToLongFormat(date).toUpperCase()}
        </Text>
        <Text style={{
          color: '#fff',
          fontSize: 16,
          fontWeight: '300',
          marginHorizontal: 30,
          marginTop: 30,
        }}
        >{message}</Text>
        <PastAgendas navigator={navigator} />
      </ScrollView>
    )
  }

  return (
    <BillsList {...props} homescreen route={{ date }} />
  )
}

NextAgendaScreen.propTypes = {
  navigator: React.PropTypes.shape({}).isRequired,
  nextAgenda: React.PropTypes.shape(),
}

export default connect(pick([
  'nextAgenda',
]))(NextAgendaScreen)
