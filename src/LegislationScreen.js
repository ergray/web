import PropTypes from 'prop-types'
import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import BillsList from './Legislation/BillsList'
import usaFlag from './usa.png'

function LegislationScreen(props) {
  return (
    <View>
      <BillsList style={{ paddingLeft: '1rem', paddingRight: '1rem' }} {...props} />
    </View>
  )
}

LegislationScreen.propTypes = {
  history: PropTypes.shape({}),
  user: PropTypes.shape({}),
}

LegislationScreen.titleIcon = usaFlag
LegislationScreen.disableHeader = true

export default connect(x => x)(LegislationScreen)
