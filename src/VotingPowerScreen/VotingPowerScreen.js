import React from 'react'
import { Image, View } from 'react-native'
import { connect } from 'react-redux'
import Button from '../Button'
import Text from '../Text'
import graphic from './voting_power_graphic_dark.png'

function VotingPowerScreen({ history, user, votingPower = 'Loading...' }) {
  return (
    <View style={{ alignSelf: 'center', margin: '2rem', maxWidth: 650 }}>

      <Button
        backable
        primary
        history={history}
        style={{ marginBottom: 30 }}
        text="View registration"
        to="/your-registration"
      />

      <Text style={{ fontSize: 50 }}>
        { user.first_name } { user.last_name }
      </Text>

      <Text style={{ fontSize: 40, fontWeight: '700', marginTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: '400', marginRight: 10 }}>Your max voting power:</Text>
        { votingPower }
      </Text>
      <Text style={{ marginTop: 30 }}>
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

      <Text style={{ fontStyle: 'italic', textAlign: 'center' }}>
        Invite more people to increase your voting power.
      </Text>

    </View>
  )
}

VotingPowerScreen.title = 'Voting Power'

VotingPowerScreen.propTypes = {
  history: React.PropTypes.shape({}).isRequired,
  user: React.PropTypes.shape({}),
  votingPower: React.PropTypes.number,
}

const mapStateToProps = state => ({
  user: state.user,
  votingPower: state.votingPower,
})

export default connect(mapStateToProps)(VotingPowerScreen)
