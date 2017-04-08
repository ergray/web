import React from 'react'
import {
  Text,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

function ProgressBar({ step, style }) {
  function color(stepIndex) {
    return step < stepIndex ? 'grey' : 'white'
  }

  function shape(stepIndex) {
    if (step < stepIndex) {
      return 'circle-o'
    } else if (step === stepIndex) {
      return 'dot-circle-o'
    }

    return 'circle'
  }

  return (
    <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', ...style }}>
      <FontAwesomeIcon color={color(1)} name={shape(1)} size={15} />
      <Text style={{ color: color(2), fontSize: 30, paddingBottom: 5 }}>—</Text>
      <FontAwesomeIcon color={color(2)} name={shape(2)} size={15} />
      <Text style={{ color: color(3), fontSize: 30, paddingBottom: 5 }}>—</Text>
      <FontAwesomeIcon color={color(3)} name={shape(3)} size={15} />
      <Text style={{ color: color(4), fontSize: 30, paddingBottom: 5 }}>—</Text>
      <FontAwesomeIcon color={color(4)} name={shape(4)} size={15} />
    </View>
  )
}

ProgressBar.propTypes = {
  step: React.PropTypes.number.isRequired,
  style: React.PropTypes.shape({}),
}

export default connect()(ProgressBar)
