import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import SortIcon from 'react-icons/lib/md/sort-by-alpha'
import _ from 'lodash'
import { connect } from 'react-redux'
import { convertDateToLongFormat } from './convert-dates'
import BillsListItem from './BillsListItem'
import PastAgendas from './PastAgendas'
const pick = require('lodash/fp/pick')

class BillsList extends Component {
  constructor(props) {
    super(props)

    const { date } = props.route
    if (!props.bills[date]) {
      fetch(`https://api.liquid.vote/bills/${date}`)
      .then(response => response.json())
      .then(bills => props.dispatch({ bills, date, type: 'SYNC_BILLS' }))
    }

    // If the user is verified, get their votes
    if (props.isVerified) {
      fetch(`https://api.liquid.vote/my-votes/${date}`, { headers: { Session_ID: props.sessionId } })
      .then(response => response.json())
      .then(votes => props.dispatch({ date, type: 'SYNC_VOTES', votes }))
    }
  }

  render() {
    const { bills, billSort, homescreen, navigator, route, votes } = this.props
    const { date } = route
    let agenda = bills[date]

    if (!agenda) {
      return (
        <Text style={{
          color: '#fff',
          fontSize: 28,
          fontWeight: '300',
          margin: 60,
        }}
        >Loading...</Text>
      )
    }

    agenda = _.sortBy(agenda, 'itemNumber')

    const agendaVotes = votes[date] || {}

    if (billSort === 'mostVotes') {
      agenda = _.sortBy(agenda.reverse(), bill => bill.votes.yea + bill.votes.nay).reverse()
    }

    return (
      <ScrollView>
        <View style={{
          alignItems: 'center',
          backgroundColor: '#111',
          borderColor: '#555',
          borderTopWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 30,
        }}
        >
          <Text style={{ color: '#ddd', fontWeight: 'bold' }}>
            {convertDateToLongFormat(date).toUpperCase()}
          </Text>
          <TouchableOpacity
            style={{ padding: 15 }}
            onPress={() => this.props.dispatch({ type: 'TOGGLE_BILL_SORT' })}
          >
            <SortIcon color="#ddd" size={30} />
          </TouchableOpacity>
        </View>

        { agenda.map(bill => (
          <BillsListItem agendaVotes={agendaVotes} bill={bill} key={bill.uid} navigator={navigator} />
        ))}

        { /* Bottom border for final item */ }
        <View style={{ backgroundColor: 'grey', height: 1 }} />

        { !!homescreen &&
          <PastAgendas navigator={navigator} />
        }
      </ScrollView>
    )
  }
}

BillsList.propTypes = {
  bills: React.PropTypes.shape(),
  billSort: React.PropTypes.string.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  homescreen: React.PropTypes.bool,
  isVerified: React.PropTypes.bool.isRequired,
  navigator: React.PropTypes.shape({}).isRequired,
  route: React.PropTypes.shape({
    date: React.PropTypes.string.isRequired,
  }).isRequired,
  sessionId: React.PropTypes.string.isRequired,
  votes: React.PropTypes.shape(),
}

export default connect(pick([
  'bills',
  'billSort',
  'isVerified',
  'sessionId',
  'votes',
]))(BillsList)
