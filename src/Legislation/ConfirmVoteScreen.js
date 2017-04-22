import React, { Component } from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import SaveIcon from 'react-icons/lib/fa/floppy-o'

class ConfirmVoteScreen extends Component {
  constructor() {
    super()
    this.state = {
      argument: '',
    }
  }

  componentWillMount() {
    fetch(`https://api.liquid.vote/bill/${this.props.route.bill.uid}/voting-power`, { headers: { Session_ID: this.props.sessionId } })
      .then(response => response.json())
      .then(({ voting_power }) => this.setState({ voting_power }))
  }

  render() {
    const {
      route,
      dispatch,
      navigator,
      sessionId,
    } = this.props
    const { bill, position } = route

    const Position = (
      <Text style={{
        color: {
          abstain: '#ccc',
          nay: '#d62728',
          yea: '#2ca02c',
        }[position],
        fontWeight: '800',
      }}
      >
        {position.toUpperCase()}
      </Text>
    )

    return (
      <View style={{ alignSelf: 'center', flex: 1, marginTop: 10 }}>

        <Text style={{ color: 'white', marginHorizontal: 20, width: 850 }}>
          {bill.id}: <Text style={{ fontWeight: '700' }}>{bill.title}</Text>
        </Text>

        <Text style={{
          color: 'white',
          marginBottom: 5,
          marginHorizontal: 20,
          marginTop: 20,
        }}
        >
          Why are you voting {Position}?
        </Text>

        <TextInput
          multiline
          numberOfLines={7}
          placeholder="Because..."
          style={{
            alignSelf: 'stretch',
            backgroundColor: '#bbb',
            borderRadius: 3,
            fontSize: 16,
            height: 665,
            marginHorizontal: 20,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
          value={this.state.argument}
          onChangeText={argument => this.setState({ argument })}
        />

        <View
          style={{
            borderColor: 'lightgrey',
            borderTopWidth: 1,
            marginHorizontal: 20,
            marginTop: 30,
            paddingTop: 25,
          }}
        >
          <Text style={{ color: 'white', fontWeight: '700' }}>
            Your voting power for this bill is: &nbsp;{ this.state.voting_power || '...Loading...' }
          </Text>
          { this.state.voting_power < this.props.votingPower &&
            <Text style={{ color: 'white', marginTop: 10 }}>
              This is less than your max voting power because some of your constituents have directly voted.
            </Text>
          }
          <TouchableOpacity onPress={() => navigator.push({ name: 'VotingPowerScreen' })}>
            <Text style={{ color: '#5DA0FF', marginTop: 10, textDecorationLine: 'underline' }}>
              Invite more people to increase your voting power.
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            alignItems: 'center',
            borderColor: '#5DA0FF',
            borderRadius: 5,
            borderWidth: 1,
            height: 38,
            justifyContent: 'center',
            marginBottom: 20,
            marginHorizontal: 20,
          }}
          onPress={() => {
            // Save the position to redux store
            dispatch({ bill, position, type: 'VOTE_ON_BILL' })

            // Save the position to the server
            fetch(`https://api.liquid.vote/bill/${bill.uid}/vote`, {
              body: JSON.stringify({
                argument: this.state.argument,
                position,
              }),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Session_ID: sessionId,
              },
              method: 'POST',
            })
            .then(() => navigator.pop({ bill, name: 'BillScreen' }))
          }}
        >
          <Text style={{ color: '#fff', fontSize: 14 }}>
            <SaveIcon size={15} style={{ paddingBottom: 3 }} />
            &nbsp;&nbsp;SAVE
          </Text>
        </TouchableOpacity>

      </View>
    )
  }
}

ConfirmVoteScreen.title = 'CONFIRM VOTE'

ConfirmVoteScreen.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  navigator: React.PropTypes.shape({
    pop: React.PropTypes.func.isRequired,
  }).isRequired,
  route: React.PropTypes.shape({
    bill: React.PropTypes.shape({
      uid: React.PropTypes.string.isRequired,
    }),
    position: React.PropTypes.string.isRequired,
  }),
  sessionId: React.PropTypes.string.isRequired,
  votingPower: React.PropTypes.number,
}

const mapStateToProps = state => ({
  sessionId: state.sessionId,
  votingPower: state.votingPower,
})

export default connect(mapStateToProps)(ConfirmVoteScreen)
