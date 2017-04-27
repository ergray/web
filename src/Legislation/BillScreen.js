import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import BackIcon from 'react-icons/lib/md/chevron-left'
import HoverableOpacity from '../HoverableOpacity'
import BillContents from './BillContents'
import BillArguments from './BillArguments'

class BillScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      billVotes: this.props.route.bill.votes,
    }

    // Refresh vote count
    const activeBill = props.route.bill.uid
    fetch(`https://api.liquid.vote/bill/${activeBill}/votes`)
    .then(response => response.json())
    .then((votes) => {
      props.dispatch({ activeBill, type: 'UPDATE_BILL_VOTE_COUNTS', votes })
      this.setState({ billVotes: votes })
    })
  }

  render() {
    const { delegates, dispatch, isVerified, route, navigator, user, votes, showDistrictVotes } = this.props
    const bill = route.bill

    let vote
    let position
    let delegate
    if (isVerified && votes[bill.date]) {
      vote = votes[bill.date][bill.uid]

      if (vote) {
        position = vote.position

        if (vote.delegate_id) {
          delegate = (delegates || []).filter(d => d.user_id === vote.delegate_id)[0]
        }
      }
    }

    // Calculate vote counts
    let voteCount = { nay: '..', yea: '..' }
    const { billVotes } = this.state
    if (billVotes && billVotes.total) {
      if (!showDistrictVotes) {
        voteCount = billVotes.total
      } else {
        voteCount = billVotes[user.sf_district] || { nay: 0, yea: 0 }
      }
    }

    // Highlight vote outcome
    const outcomeStyle = {
      borderColor: '#272727',
      borderRadius: 3,
      borderWidth: 1,
      paddingHorizontal: 8,
      paddingVertical: 5,
    }
    const yeaOutcome = { ...outcomeStyle }
    const nayOutcome = { ...outcomeStyle }
    if (voteCount.yea > voteCount.nay) {
      yeaOutcome.borderColor = '#2ca02c'
    } else if (voteCount.nay > voteCount.yea) {
      nayOutcome.borderColor = '#d62728'
    }

    function tapPosition(tappedPosition) {
      // Don't let them vote if they're not verified
      if (!isVerified) {
        window.alert('Your registration must be verified before you can vote on legislation.') // eslint-disable-line
        return
      }

      if (tappedPosition === position) {
        return
      }

      // Go to ConfirmVoteScreen
      navigator.push({ backable: true, bill, name: 'ConfirmVoteScreen', position: tappedPosition })
    }

    const highlightColor = '#444'

    const selected = { abstain: {}, nay: {}, yea: {} }
    if (vote) {
      selected[position].backgroundColor = highlightColor
    }

    return (
      <View style={{ flex: 1 }}>

        { /* Header */ }
        <View style={{ alignItems: 'center', backgroundColor: '#000', flexDirection: 'row', paddingRight: 40 }}>
          <HoverableOpacity
            hoverStyle={{ backgroundColor: 'hsla(0,0%,100%,0.1)' }}
            style={{ paddingHorizontal: 15, paddingVertical: 10 }}
            onPress={() => navigator.pop()}
          >
            <BackIcon color="white" size={30} />
          </HoverableOpacity>
          <Text style={{ color: 'white', fontSize: 16, marginLeft: 5, marginVertical: 10 }}>
            {bill.id}: {bill.title}
          </Text>
        </View>

        { /* Vote buttons */ }
        <View
          style={{
            backgroundColor: '#0D0D0D',
            borderColor: highlightColor,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <HoverableOpacity hoverStyle={{ backgroundColor: 'hsla(0,0%,100%,0.1)' }} outerStyle={{ flex: 1 }} onPress={() => tapPosition('yea')}>
            <Text style={[{
              color: '#2ca02c',
              fontSize: 16,
              fontWeight: '800',
              paddingVertical: 15,
              textAlign: 'center',
            }, selected.yea]}
            >✓ YEA</Text>
          </HoverableOpacity>
          <View style={{ backgroundColor: highlightColor, width: 1 }} />
          <HoverableOpacity hoverStyle={{ backgroundColor: 'hsla(0,0%,100%,0.1)' }} outerStyle={{ flex: 1 }} onPress={() => tapPosition('nay')}>
            <Text style={[{
              color: '#d62728',
              fontSize: 16,
              fontWeight: '800',
              paddingVertical: 15,
              textAlign: 'center',
            }, selected.nay]}
            >✗ NAY</Text>
          </HoverableOpacity>
        </View>
        <View style={{
          backgroundColor: '#0D0D0D',
          borderBottomWidth: 1,
          borderColor: highlightColor,
        }}
        >
          <HoverableOpacity
            hoverStyle={{ backgroundColor: 'hsla(0,0%,100%,0.1)' }}
            onPress={() => tapPosition('abstain')}
          >
            <Text style={[{
              color: '#fff',
              fontSize: 13,
              paddingVertical: 8,
              textAlign: 'center',
            }, selected.abstain]}
            >ABSTAIN</Text>
          </HoverableOpacity>
        </View>

        { /* Delegate info */ }
        { delegate && (
          <View style={{ borderBottomWidth: 1, borderColor: highlightColor }}>
            <Text style={{ color: '#fff', paddingVertical: 10, textAlign: 'center' }}>
              Vote delegated from {delegate.name}
            </Text>
          </View>
        )}


        { /* Main content area */ }
        <ScrollView contentContainerStyle={{ flex: 1 }} style={{ flex: 1 }}>
          <BillContents bill={bill} />

          <Text style={{ color: '#fff', fontSize: 15, fontWeight: '700', marginBottom: 20, textAlign: 'center' }}>ARGUMENTS</Text>
          <BillArguments activeBill={bill.uid} />
        </ScrollView>

        { /* Vote Counts */ }
        <View style={{
          alignItems: 'center',
          borderColor: 'grey',
          borderTopWidth: 1,
          borderWidth: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        >
          <HoverableOpacity
            hoverStyle={{ backgroundColor: 'hsla(0,0%,100%,0.03)' }}
            outerStyle={{ flex: 3, paddingLeft: 20 }}
            style={{ alignItems: 'center', flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 13 }}
            onPress={() => {
              if (user.sf_district) {
                dispatch({ type: 'TOGGLE_VOTE_COUNTS_MODE' })
              }
            }}
          >
            <Text style={{ color: 'white', fontSize: 12, fontWeight: '600' }}>
              { showDistrictVotes ? `DISTRICT ${user.sf_district}` : 'ALL VOTES' }
            </Text>
            <Text style={[{ color: 'white' }, yeaOutcome]}>Yea: {voteCount.yea}</Text>
            <Text style={[{ color: 'white' }, nayOutcome]}>Nay: {voteCount.nay}</Text>
          </HoverableOpacity>
          <View style={{ flex: 1 }}>
            <HoverableOpacity
              hoverStyle={{ backgroundColor: 'hsla(0,0%,100%,0.1)' }}
              outerStyle={{ alignSelf: 'flex-end' }}
              onPress={() => navigator.push({ backable: true, bill, name: 'AuditScreen' })}
            >
              <Text style={{ color: '#5DA0FF', fontSize: 12, paddingHorizontal: 35, paddingVertical: 19 }}>AUDIT</Text>
            </HoverableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

BillScreen.disableHeader = true

BillScreen.propTypes = {
  delegates: React.PropTypes.arrayOf(React.PropTypes.shape({})),
  dispatch: React.PropTypes.func.isRequired,
  isVerified: React.PropTypes.bool.isRequired,
  navigator: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
  route: React.PropTypes.shape({
    bill: React.PropTypes.shape({
      uid: React.PropTypes.string.isRequired,
      votes: React.PropTypes.shape({}),
    }),
  }),
  showDistrictVotes: React.PropTypes.bool,
  user: React.PropTypes.shape({
    sf_district: React.PropTypes.number,
  }),
  votes: React.PropTypes.shape({}),
}

const mapStateToProps = state => ({
  delegates: state.delegates,
  isVerified: state.isVerified,
  showDistrictVotes: state.showDistrictVotes,
  user: state.user,
  votes: state.votes,
})

export default connect(mapStateToProps)(BillScreen)
