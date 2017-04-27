import React from 'react'
import { Image, Text, View } from 'react-native'
import { connect } from 'react-redux'
import graphic from './voting_power_graphic.png'

function VotingPowerScreen({ user, votingPower = 'Loading...' }) {
  return (
    <View style={{ alignSelf: 'center', marginHorizontal: 20 }}>
      <Text style={{ color: 'white', fontSize: 50, marginTop: 30 }}>
        { user.first_name } { user.last_name }
      </Text>
      <Text style={{ color: 'white', fontSize: 40, fontWeight: '700', marginTop: 30 }}>
        <Text style={{ fontSize: 18, fontWeight: '400', marginRight: 10 }}>Your max voting power:</Text>
        { votingPower }
      </Text>
      <Text style={{ color: 'white', marginTop: 30 }}>
        This is all the people delegating to you, all the people delegating to them, and to them, and so on.
      </Text>

      <Image
        source={graphic}
        style={{
          alignSelf: 'center',
          height: 170,
          marginVertical: 50,
          width: 252,
        }}
      />

      <Text style={{ color: 'white', fontStyle: 'italic', textAlign: 'center' }}>
        Invite more people to increase your voting power.
      </Text>

    </View>
  )
}

VotingPowerScreen.title = 'VOTING POWER'

VotingPowerScreen.propTypes = {
  user: React.PropTypes.shape({}),
  votingPower: React.PropTypes.number,
}

const mapStateToProps = state => ({
  user: state.user,
  votingPower: state.votingPower,
})

export default connect(mapStateToProps)(VotingPowerScreen)
