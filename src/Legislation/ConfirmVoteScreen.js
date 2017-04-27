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
  constructor(props) {
    super(props)
    this.state = {
      argument: '',
    }

    if (!props.location.state || !props.location.state.bill) {
      return props.history.replace(props.location.pathname.slice(0, 21))
    }

    if (props.sessionId) {
      this.getVotingPower(props.sessionId)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.sessionId && nextProps.sessionId) {
      this.getVotingPower(nextProps.sessionId)
    }
  }

  getVotingPower(sessionId) {
    fetch(`https://api.liquid.vote/bill/${this.props.location.state.bill.uid}/voting-power`, { headers: { Session_ID: sessionId } })
      .then(response => response.json())
      .then(({ voting_power }) => this.setState({ voting_power }))
  }

  render() {
    const {
      dispatch,
      history,
      location,
      match,
      sessionId,
    } = this.props
    const { position } = match.params
    const { bill } = location.state

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
          <TouchableOpacity onPress={() => history.push({ name: 'VotingPowerScreen' })}>
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
            .then(() => history.goBack())
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
  history: React.PropTypes.shape({
    goBack: React.PropTypes.func.isRequired,
    replace: React.PropTypes.func.isRequired,
  }).isRequired,
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string.isRequired,
    state: React.PropTypes.shape(),
  }).isRequired,
  match: React.PropTypes.shape({
    params: React.PropTypes.shape({
      bill_id: React.PropTypes.string.isRequired,
      date: React.PropTypes.string.isRequired,
      position: React.PropTypes.string.isRequired,
    }),
  }),
  sessionId: React.PropTypes.string.isRequired,
  votingPower: React.PropTypes.number,
}

const mapStateToProps = state => ({
  sessionId: state.sessionId,
  votingPower: state.votingPower,
})

export default connect(mapStateToProps)(ConfirmVoteScreen)
