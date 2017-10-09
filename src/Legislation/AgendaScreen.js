import React from 'react'
import {
} from 'react-native'
import BillsList from './BillsList'

export default function AgendaScreen(props) {
  return (
    <BillsList {...props} />
  )
}

AgendaScreen.disableHeader = true
