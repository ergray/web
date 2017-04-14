import React, { Component } from 'react'
import {
  Alert,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import Tabs from 'react-native-tabs'
import BackIcon from 'react-icons/lib/md/chevron-left'
import BillContents from './BillContents'
import BillArguments from './BillArguments'
import { hasDatePassed } from './convert-dates'

class BillScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      billVotes: this.props.route.bill.votes,
      page: 'description',
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
      // Don't let them vote if the bill is no longer active
      if (hasDatePassed(bill.date)) {
        Alert.alert(
          'Voting Period Expired',
          'This bill has already been voted upon in the legislature.',
          [
            {
              text: 'OK',
            },
          ],
        )
        return
      }

      // Don't let them vote if they're not verified
      if (!isVerified) {
        Alert.alert(
          'Unverified',
          'Your registration must be verified before you can vote on legislation.',
          [
            { onPress: () => navigator.push({ name: 'YourRegistrationScreen' }), text: 'More Info' },
            { text: 'OK' },
          ],
        )
        return
      }

      if (tappedPosition === position) {
        return
      }

      // Go to ConfirmVoteScreen
      navigator.push({ bill, name: 'ConfirmVoteScreen', position: tappedPosition })
    }

    const highlightColor = '#444'

    const selected = { abstain: {}, nay: {}, yea: {} }
    if (vote) {
      selected[position].backgroundColor = highlightColor
    }

    return (
      <View style={{ flex: 1, marginTop: 25, width: 850 }}>

        { /* Header */ }
        <View style={{ alignItems: 'center', flexDirection: 'row', marginBottom: 20, paddingRight: 40 }}>
          <TouchableOpacity onPress={() => navigator.pop()}>
            <BackIcon
              color="white" size={30}
              style={{ paddingHorizontal: 15 }}
            />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 16, width: 800 }}>
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
          <TouchableHighlight style={{ flex: 1 }} onPress={() => tapPosition('yea')}>
            <Text style={[{
              color: '#2ca02c',
              fontSize: 16,
              fontWeight: '800',
              paddingVertical: 15,
              textAlign: 'center',
            }, selected.yea]}
            >✓ YEA</Text>
          </TouchableHighlight>
          <View style={{ backgroundColor: highlightColor, width: 1 }} />
          <TouchableHighlight style={{ flex: 1 }} onPress={() => tapPosition('nay')}>
            <Text style={[{
              color: '#d62728',
              fontSize: 16,
              fontWeight: '800',
              paddingVertical: 15,
              textAlign: 'center',
            }, selected.nay]}
            >✗ NAY</Text>
          </TouchableHighlight>
        </View>
        <View style={{
          backgroundColor: '#0D0D0D',
          borderBottomWidth: 1,
          borderColor: highlightColor,
        }}
        >
          <TouchableHighlight
            onPress={() => tapPosition('abstain')}
          >
            <Text style={[{
              color: '#fff',
              fontSize: 13,
              paddingVertical: 8,
              textAlign: 'center',
            }, selected.abstain]}
            >ABSTAIN</Text>
          </TouchableHighlight>
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
        {
          this.state.page === 'description'
          ? <BillContents bill={bill} />
          : <BillArguments activeBill={bill.uid} />
        }

        <Tabs
          selected={this.state.page}
          selectedIconStyle={{ backgroundColor: '#222', borderColor: '#444', borderTopWidth: 1 }}
          selectedStyle={{ color: '#fff', fontWeight: 'bold' }} style={{ position: 'relative' }}
          onSelect={el => this.setState({ page: el.props.name })}
        >
          <Text name="description" style={{ color: '#ccc' }}>Description</Text>
          <Text name="arguments" style={{ color: '#ccc' }}>Arguments</Text>
        </Tabs>

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
          <TouchableWithoutFeedback onPress={() => {
            if (user.sf_district) { dispatch({ type: 'TOGGLE_VOTE_COUNTS_MODE' }) }
          }}
          ><View style={{ alignItems: 'center', flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: 'white', fontSize: 12, fontWeight: '600', marginLeft: 20, width: 77 }}>
              { showDistrictVotes ? `DISTRICT ${user.sf_district}` : 'ALL VOTES' }
            </Text>
            <Text style={[{ color: 'white' }, yeaOutcome]}>Yea: {voteCount.yea}</Text>
            <Text style={[{ color: 'white' }, nayOutcome]}>Nay: {voteCount.nay}</Text>
          </View></TouchableWithoutFeedback>
          <TouchableOpacity onPress={() => navigator.push({ bill, name: 'AuditScreen' })}>
            <Text style={{ color: '#5DA0FF', fontSize: 12, marginLeft: 63, marginRight: 20, marginVertical: 15 }}>AUDIT</Text>
          </TouchableOpacity>
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
