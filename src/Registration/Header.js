import PropTypes from 'prop-types'
import React from 'react'
import {
  Image,
  Text,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import logo from '../logo.png'
import ProgressBar from './ProgressBar'

function Header({ step, title }) {
  return (
    <View>
      <View style={{ alignItems: 'center' }}>

        <View>
          <Image
            source={logo}
            style={{
              alignSelf: 'center',
              height: 52,
              marginBottom: 5,
              marginTop: 32,
              width: 60,
            }}
          />
          <Text style={{
            alignSelf: 'center',
            fontSize: 19,
            fontWeight: '700',
            textTransform: 'uppercase',
          }}
          >{title}</Text>
        </View>
      </View>

      <ProgressBar step={step} style={{ marginVertical: 15 }} />

    </View>
  )
}

Header.propTypes = {
  step: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
}

export default connect()(Header)
