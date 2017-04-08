import React from 'react'
import BillsList from './BillsList'

function AgendaScreen(props) {
  return <BillsList {...props} />
}

AgendaScreen.title = 'PAST AGENDA'

AgendaScreen.propTypes = {}

export default AgendaScreen
