import React from 'react'
import {
  View,
} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from '../LinearGradient'
import HomeScreenHeader from './HomeScreenHeader'
import NextAgendaContent from './NextAgendaContent'
const pick = require('lodash/fp/pick')

function NextAgendaScreen({ history }) {
  return (
    <View style={{ flex: 1, height: '100%' }}>
      <HomeScreenHeader />
      <LinearGradient
        colors={['#000', '#292929']}
        style={{ flex: 1, justifyContent: 'flex-start' }}
      >
        <NextAgendaContent history={history} />
      </LinearGradient>
    </View>
  )
}

NextAgendaScreen.disableHeader = true

NextAgendaScreen.propTypes = {
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
}

const mapStateToProps = pick([
])

export default connect(mapStateToProps)(NextAgendaScreen)
