import React from 'react'
import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { connect } from 'react-redux'

function HomeScreenFooter({ navigator, user, votingPower = '..' }) {
  return (
    <View style={{
      backgroundColor: '#1B1B1B',
      borderColor: '#333',
      borderTopWidth: 1,
      bottom: 0,
      flexDirection: 'row',
      paddingHorizontal: 11,
      position: 'absolute',
      width: Dimensions.get('window').width,
    }}
    >

      <TouchableOpacity style={{ flex: 1, paddingHorizontal: 15, paddingVertical: 12 }} onPress={() => navigator.push({ name: 'VotingPowerScreen', transition: 'FloatFromBottom' })}>
        <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>VOTING POWER: {votingPower}</Text>
      </TouchableOpacity>

      { user.sf_district
        ? <TouchableOpacity style={{ borderColor: '#333', borderLeftWidth: 1, flex: 1, paddingHorizontal: 15, paddingVertical: 12 }} onPress={() => navigator.push({ name: 'ElectedRepScreen', transition: 'FloatFromBottom' })}>
          <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>ELECTED REP: A+</Text>
        </TouchableOpacity>

        : <TouchableOpacity style={{ borderColor: '#333', borderLeftWidth: 1, flex: 1, paddingHorizontal: 15, paddingVertical: 12 }} onPress={() => navigator.push({ name: 'AllElectedRepsScreen', transition: 'FloatFromBottom' })}>
          <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>ELECTED REPS</Text>
        </TouchableOpacity>
      }

    </View>
  )
}

HomeScreenFooter.propTypes = {
  navigator: React.PropTypes.shape({}).isRequired,
  user: React.PropTypes.shape({}),
  votingPower: React.PropTypes.number,
}

const mapStateToProps = state => ({
  user: state.user,
  votingPower: state.votingPower,
})

export default connect(mapStateToProps)(HomeScreenFooter)
