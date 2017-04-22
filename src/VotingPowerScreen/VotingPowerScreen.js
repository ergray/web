import React from 'react'
import { Image, Text, View } from 'react-native'
import { connect } from 'react-redux'
import graphic from './voting_power_graphic.png'

function VotingPowerScreen({ user, votingPower = 'Loading...' }) {
  return (
    <View style={{ alignSelf: 'center', marginHorizontal: 20 }}>
      <Text style={{ color: 'white', fontSize: 22, marginTop: 15 }}>
        { user.first_name } { user.last_name }
      </Text>
      <Text style={{ color: 'white', fontSize: 16, fontWeight: '700', marginTop: 10 }}>
        Voting power: &nbsp;{ votingPower }
      </Text>
      <Text style={{ color: 'white', marginTop: 10 }}>
        This represents all of the people delegating to you, and all the people delegating to them, and so on.
      </Text>

      <Image
        source={graphic}
        style={{
          alignSelf: 'center',
          height: 170,
          marginVertical: 30,
          width: 252,
        }}
      />

      <Text style={{ color: 'white' }}>
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
