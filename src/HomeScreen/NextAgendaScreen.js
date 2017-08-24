import PropTypes from 'prop-types'
import React from 'react'
import {
  View,
} from 'react-native'
import { connect } from 'react-redux'
import legislatureIcon from './legislature-icon.png'
import NextAgendaContent from './NextAgendaContent'
const pick = require('lodash/fp/pick')

function NextAgendaScreen({ history }) {
  return (
    <View style={{ flex: 1, height: '100%' }}>
      <NextAgendaContent history={history} />
    </View>
  )
}

NextAgendaScreen.titleIcon = legislatureIcon
NextAgendaScreen.title = 'San Francisco Legislature'

NextAgendaScreen.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}

const mapStateToProps = pick([
])

export default connect(mapStateToProps)(NextAgendaScreen)
