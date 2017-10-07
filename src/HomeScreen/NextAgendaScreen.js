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

NextAgendaScreen.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}


NextAgendaScreen.titleIcon = legislatureIcon

// nyc conditional addition -- possibly add a file similar to date conversion
// to take pathname and adjust accorindgly?

if (location.pathname === '/sf') {
  NextAgendaScreen.title = 'San Francisco Legislature'
} else if (location.pathname === '/nyc') {
  NextAgendaScreen.title = 'New York City Legislature'
}


const mapStateToProps = pick([
])

export default connect(mapStateToProps)(NextAgendaScreen)
