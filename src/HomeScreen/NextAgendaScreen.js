import React from 'react'
import {
  View,
} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from '../LinearGradient'
import HomeScreenHeader from './HomeScreenHeader'
import HomeScreenFooter from './HomeScreenFooter'
import NextAgendaContent from './NextAgendaContent'
const pick = require('lodash/fp/pick')

function NextAgendaScreen({ navigator }) {
  return (
    <View style={{ flex: 1, height: '100%' }}>
      <HomeScreenHeader />
      <LinearGradient
        colors={['#000', '#292929']}
        style={{ flex: 1, justifyContent: 'flex-start' }}
      >
        <NextAgendaContent navigator={navigator} />
        <HomeScreenFooter navigator={navigator} />
      </LinearGradient>
    </View>
  )
}

NextAgendaScreen.disableHeader = true

NextAgendaScreen.propTypes = {
  navigator: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
}

const mapStateToProps = pick([
])

export default connect(mapStateToProps)(NextAgendaScreen)
