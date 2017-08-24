import React, { Component } from 'react'
import {
  ScrollView,
  View,
} from 'react-native'
import _ from 'lodash'
import { connect } from 'react-redux'
import { oldBill } from '../_util'
import Header from '../Header'
import Text from '../Text'
import { convertDateToLongFormat } from './convert-dates'
import BillsListItem from './BillsListItem'
import PastAgendas from './PastAgendas'
const pick = require('lodash/fp/pick')

class BillsList extends Component {
  componentDidMount() {
    const { dispatch, isVerified, match, sessionId } = this.props
    const { date } = match.params
    if (!this.props.bills[date]) {
      if (date) {
        fetch(`${API_URL_V1}/bills/${date}`)
          .then(response => response.json())
          .then(bills => dispatch({ bills, date, type: 'SYNC_BILLS' }))
      } else {
        fetch(`${API_URL_V2}/legislation/?legislature=us`)
          .then(response => response.json())
          .then(bills => bills.map(oldBill))
          .then(bills => dispatch({ bills, legislature: 'us', type: 'SYNC_BILLS' }))
      }
    }

    // If the user is verified, get their votes
    if (isVerified) {
      fetch(`${API_URL_V1}/my-votes/${date}`, { headers: { Session_ID: sessionId } })
        .then(response => response.json())
        .then(votes => dispatch({ date, type: 'SYNC_VOTES', votes }))
    }
  }

  render() {
    const { bills, homescreen, history, location, match, votes } = this.props
    const { date } = match.params
    const key = date || 'us'
    let agenda = bills[key]

    if (!agenda) {
      return (
        <Text style={{
          fontSize: 18,
          fontWeight: '300',
          marginHorizontal: 30,
          marginTop: 20,
        }}
        >Loading...</Text>
      )
    }

    if (date) {
      agenda = _.sortBy(agenda, 'itemNumber', 'number')
    }

    const agendaVotes = votes[date] || {}
    const title = date ? convertDateToLongFormat(date) : 'US Congress'

    return (
      <View>
        <Header history={history} location={location} title={title} />
        <ScrollView style={{ padding: '2rem' }}>
          { agenda.map(bill => (
            <BillsListItem agendaVotes={agendaVotes} bill={bill} history={history} key={bill.uid} />
          ))}

          { !!homescreen &&
            <PastAgendas history={history} />
          }
        </ScrollView>
      </View>
    )
  }
}

BillsList.propTypes = {
  bills: React.PropTypes.shape(),
  dispatch: React.PropTypes.func.isRequired,
  history: React.PropTypes.shape({}).isRequired,
  homescreen: React.PropTypes.bool,
  isVerified: React.PropTypes.bool.isRequired,
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string.isRequired,
  }),
  match: React.PropTypes.shape({
    params: React.PropTypes.shape({
      date: React.PropTypes.string,
    }).isRequired,
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
