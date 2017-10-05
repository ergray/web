import React from 'react'
import {
} from 'react-native'
import BillsList from './BillsList'

export default function AgendaScreen(props) {
    console.log('called billslist')
    console.log('props from agendascreen: ', props)
  return (
    <BillsList {...props} />
  )
}

AgendaScreen.disableHeader = true
