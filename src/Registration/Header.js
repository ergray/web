import React from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import BackIcon from 'react-icons/lib/md/chevron-left'
import logo from '../logo.png'
import ProgressBar from './ProgressBar'

function Header({ history, step, title }) {
  return (
    <View>
      <View style={{ flexDirection: 'row' }}>

        <TouchableOpacity
          style={{ flex: 1, height: 123, minWidth: 50, paddingTop: 30 }}
          onPress={() => history.goBack()}
        >
          <BackIcon color="grey" size={40} style={{ paddingLeft: 30 }} />
        </TouchableOpacity>

        <View>
          <Image
            source={logo}
            style={{
              alignSelf: 'center',
              height: 56,
              marginBottom: 12,
              marginTop: 32,
              width: 59,
            }}
          />
          <Text style={{
            alignSelf: 'center',
            color: '#fff',
            fontSize: 19,
            fontWeight: '700',
          }}
          >{title}</Text>
        </View>

        <View style={{ flex: 1, minWidth: 70 }} />
      </View>

      <ProgressBar step={step} style={{ marginVertical: 15 }} />

    </View>
  )
}

Header.propTypes = {
  history: React.PropTypes.shape({
    goBack: React.PropTypes.func.isRequired,
  }).isRequired,
  step: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
}

export default connect()(Header)
