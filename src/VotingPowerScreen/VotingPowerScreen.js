import React from 'react'
import { Image, Text, View } from 'react-native'
import { connect } from 'react-redux'
import HoverableOpacity from '../HoverableOpacity'
import graphic from './voting_power_graphic.png'

function VotingPowerScreen({ history, user, votingPower = 'Loading...' }) {
  return (
    <View style={{ marginHorizontal: 20 }}>

      <HoverableOpacity
        activeOpacity={0.5}
        hoverStyle={{ backgroundColor: 'hsla(0,0%,100%,0.1)' }}
        outerStyle={{ marginVertical: 30 }}
        style={{
          alignItems: 'center',
          borderColor: 'grey',
          borderRadius: 5,
          borderWidth: 1,
          height: 38,
          justifyContent: 'center',
        }}
        onPress={() => history.push('/your-registration')}
      >
        <Text style={{ color: '#fff', fontFamily: 'HelveticaNeue, Helvetica', fontSize: 13 }}>
          VIEW REGISTRATION
        </Text>
      </HoverableOpacity>

      <Text style={{ color: 'white', fontSize: 50 }}>
        { user.first_name } { user.last_name }
      </Text>

      <Text style={{ color: 'white', fontSize: 40, fontWeight: '700', marginTop: 20 }}>
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
  history: React.PropTypes.shape({}).isRequired,
  user: React.PropTypes.shape({}),
  votingPower: React.PropTypes.number,
}

const mapStateToProps = state => ({
  user: state.user,
  votingPower: state.votingPower,
})

export default connect(mapStateToProps)(VotingPowerScreen)
