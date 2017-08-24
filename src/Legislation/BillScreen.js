import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  ScrollView,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import CommonStyle from '../CommonStyle'
import Header from '../Header'
import HoverableOpacity from '../HoverableOpacity'
import Text from '../Text'
import BillContents from './BillContents'
import BillArguments from './BillArguments'

const cstyle = CommonStyle()

class BillScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      billVotes: props.bill.votes,
    }

    // Refresh vote count
    const activeBill = props.bill.uid
    fetch(`${API_URL_V1}/bill/${activeBill}/votes`)
      .then(response => response.json())
      .then((votes) => {
        props.dispatch({ activeBill, legislature: 'us', type: 'UPDATE_BILL_VOTE_COUNTS', votes })
        this.setState({ billVotes: votes })
      })
  }

  render() {
    const { bill, delegates, dispatch, history, isVerified, location, user, votes, showDistrictVotes } = this.props

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
        voteCount = billVotes[user.us_district] || { nay: 0, yea: 0 }
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
      // Don't let them vote if they're not logged in
      if (Object.keys(user).length === 0) {
        window.alert('You are not logged in. Press JOIN above to sign in.') // eslint-disable-line
        return
      }

      if (tappedPosition === position) {
        return
      }

      // Go to ConfirmVoteScreen
      if (bill.introduced) {
        history.push(`/legislation/${bill.bill_uid}/vote/${tappedPosition}`, { backable: true, bill })
      } else {
        history.push(`/sf/${bill.date}/${bill.id}/vote/${tappedPosition}`, { backable: true, bill })
      }
    }

    const highlightColor = cstyle.panelBorderColor

    const selected = { abstain: {}, nay: {}, yea: {} }
    if (vote) {
      selected[position].backgroundColor = highlightColor
    }

    return (
      <View style={{ flex: 1 }}>

        { /* Header */ }
        <Header left backUrl="/legislation" history={history} location={location} title={bill.title} />

        { /* Vote buttons */ }
        <View
          style={{
            borderColor: highlightColor,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <HoverableOpacity hoverStyle={{ backgroundColor: cstyle.panelHoverColor }} outerStyle={{ flex: 1 }} onPress={() => tapPosition('yea')}>
            <Text
              style={{
                color: '#2ca02c',
                fontSize: 16,
                fontWeight: '800',
                paddingVertical: 15,
                textAlign: 'center',
                textTransform: 'uppercase',
                ...selected.yea,
              }}
            >✓ Yea</Text>
          </HoverableOpacity>
          <View style={{ backgroundColor: highlightColor, width: 1 }} />
          <HoverableOpacity hoverStyle={{ backgroundColor: cstyle.panelHoverColor }} outerStyle={{ flex: 1 }} onPress={() => tapPosition('nay')}>
            <Text
              style={{
                color: '#d62728',
                fontSize: 16,
                fontWeight: '800',
                paddingVertical: 15,
                textAlign: 'center',
                textTransform: 'uppercase',
                ...selected.nay,
              }}
            >✗ Nay</Text>
          </HoverableOpacity>
        </View>
        <View style={{
          borderBottomWidth: 1,
          borderColor: highlightColor,
        }}
        >
          <HoverableOpacity
            hoverStyle={{ backgroundColor: cstyle.panelHoverColor }}
            onPress={() => tapPosition('abstain')}
          >
            <Text
              style={{
                fontSize: 13,
                paddingVertical: 8,
                textAlign: 'center',
                ...selected.abstain,
              }}
            >ABSTAIN</Text>
          </HoverableOpacity>
        </View>

        { /* Delegate info */ }
        { delegate && (
          <View style={{ borderBottomWidth: 1, borderColor: highlightColor }}>
            <Text style={{ paddingVertical: 10, textAlign: 'center' }}>
              Vote delegated from {delegate.name}
            </Text>
          </View>
        )}


        { /* Main content area */ }
        <ScrollView contentContainerStyle={{ flex: 1 }} style={{ flex: 1 }}>
          <BillContents bill={bill} />

          <Text style={{ borderBottomColor: cstyle.panelBorderColor, borderBottomWidth: 1, borderTopColor: cstyle.panelBorderColor, borderTopWidth: 1, fontSize: 15, fontWeight: '700', paddingVertical: 8, textAlign: 'center', textTransform: 'uppercase' }}>
            Arguments
          </Text>
          <BillArguments activeBill={bill.uid} />
        </ScrollView>

        { /* Vote Counts */ }
        <View style={{
          alignItems: 'center',
          borderColor: cstyle.panelBorderColor,
          borderTopWidth: 1,
          borderWidth: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        >
          <HoverableOpacity
            activeOpacity={1}
            hoverStyle={{
              backgroundColor: user.us_district ? 'hsla(0,0%,0%,0.03)' : null,
              cursor: user.us_district ? 'pointer' : 'default',
            }}
            outerStyle={{ flex: 3, paddingLeft: 20 }}
            onPress={() => {
              if (user.us_district) {
                dispatch({ type: 'TOGGLE_VOTE_COUNTS_MODE' })
              }
            }}
          >
            <View style={{ alignItems: 'center', cursor: 'default', flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 13 }}>
              <Text style={{ fontSize: 12, fontWeight: '600', textTransform: 'uppercase' }}>
                { showDistrictVotes ? `District ${user.us_district}` : 'All Votes' }
              </Text>
              <Text style={yeaOutcome}>Yea: {voteCount.yea}</Text>
              <Text style={nayOutcome}>Nay: {voteCount.nay}</Text>
            </View>
          </HoverableOpacity>
          <View style={{ flex: 1 }}>
            <HoverableOpacity
              hoverStyle={{ backgroundColor: 'hsla(0,0%,0%,0.1)' }}
              outerStyle={{ alignSelf: 'flex-end' }}
              onPress={() => history.push(`${location.pathname}/audit`, { backable: true })}
            >
              <Text style={{ color: '#5DA0FF', fontSize: 12, paddingHorizontal: 35, paddingVertical: 19, textTransform: 'uppercase' }}>Audit</Text>
            </HoverableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

BillScreen.disableHeader = true

BillScreen.propTypes = {
  bill: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    votes: PropTypes.shape({}),
  }),
  delegates: PropTypes.arrayOf(PropTypes.shape({})),
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  isVerified: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  showDistrictVotes: PropTypes.bool,
  user: PropTypes.shape({
    us_district: PropTypes.number,
  }),
  votes: PropTypes.shape({}),
}

const mapStateToProps = state => ({
  delegates: state.delegates,
  isVerified: state.isVerified,
  showDistrictVotes: state.showDistrictVotes,
  user: state.user,
  votes: state.votes,
})

export default connect(mapStateToProps)(BillScreen)
