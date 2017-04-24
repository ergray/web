import React from 'react'
import {
  Text,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import CircleIcon from 'react-icons/lib/fa/circle'
import CircleOIcon from 'react-icons/lib/fa/circle-o'
import DotCicleOIcon from 'react-icons/lib/fa/dot-circle-o'

function ProgressBar({ step, style }) {
  function color(stepIndex) {
    return step < stepIndex ? 'grey' : 'white'
  }

  function shape(stepIndex) {
    if (step < stepIndex) {
      return <CircleOIcon color={color(stepIndex)} size={15} />
    } else if (step === stepIndex) {
      return <DotCicleOIcon color={color(stepIndex)} size={15} />
    }

    return <CircleIcon color={color(stepIndex)} size={15} />
  }

  return (
    <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', ...style }}>
      {shape(1)}
      <Text style={{ color: color(2), fontSize: 30, paddingBottom: 5 }}>—</Text>
      {shape(2)}
      <Text style={{ color: color(3), fontSize: 30, paddingBottom: 5 }}>—</Text>
      {shape(3)}
      <Text style={{ color: color(4), fontSize: 30, paddingBottom: 5 }}>—</Text>
      {shape(4)}
    </View>
  )
}

ProgressBar.propTypes = {
  step: React.PropTypes.number.isRequired,
  style: React.PropTypes.shape({}),
}

export default connect()(ProgressBar)
