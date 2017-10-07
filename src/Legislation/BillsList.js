import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import _ from 'lodash'
import { connect } from 'react-redux'
import VisibilitySensor from 'react-visibility-sensor'
import ActivityIndicator from 'ActivityIndicator'
import { oldBill } from '../_util'
import Header from '../Header'
import TextInput from '../TextInput'
import { convertDateToLongFormat } from './convert-dates'
import BillsListItem from './BillsListItem'
import PastAgendas from './PastAgendas'
const pick = require('lodash/fp/pick')

const searchQuery = _.debounce((terms, dispatch, setState) => {
  setState({ search: { terms } })
  if (terms) {
    fetch(`${API_URL_V1}/bills/search?q=${terms}&legislature=us`)
      .then(response => response.json())
      .then(bills => bills.map(oldBill))
      .then(bills => dispatch({ bills, legislature: 'us', replace: true, type: 'SYNC_BILLS' }))
  } else {
    fetch(`${API_URL_V2}/legislation/?json=${JSON.stringify({ legislature: 'us' })}`)
      .then(response => response.json())
      .then(bills => bills.map(oldBill))
      .then(bills => dispatch({ bills, legislature: 'us', type: 'SYNC_BILLS' }))
  }
}, 1000)

const path = location.pathname

class BillsList extends Component {
  constructor(props) {
    super(props)
    this.state = { search: { terms: '' } }
    this.search = this.search.bind(this)
    this.visibilitySensorOnChange = this.visibilitySensorOnChange.bind(this)
  }

  componentDidMount() {
    const { dispatch, isVerified, match, sessionId } = this.props
    const { date } = match.params
    if (!this.props.bills[date]) {
      if (date) {
        // conditionals to account for nyc and different api point
        if (path === `/sf/${date}`) {
          fetch(`${API_URL_V1}/bills/${date}`)
            .then(response => response.json())
            .then(bills => dispatch({ bills, date, type: 'SYNC_BILLS' }))
        } else if (path === `/nyc/${date}`) {
          fetch(`https://infinite-brushlands-18740.herokuapp.com/bills?date=${date}`)
            .then(response => response.json())
            .then((response) => {
              const bills = response.data
              dispatch({ bills, date, type: 'SYNC_BILLS' })
            })
        }
      } else {
        fetch(`${API_URL_V2}/legislation/?json=${JSON.stringify({ legislature: 'us' })}`)
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

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.date && !nextProps.match.params.date) {
      const { dispatch, isVerified, match, sessionId } = nextProps
      const { date } = match.params
      if (!nextProps.bills[date]) {
        if (date) {
          fetch(`${API_URL_V1}/bills/${date}`)
            .then(response => response.json())
            .then(bills => dispatch({ bills, date, type: 'SYNC_BILLS' }))
        } else {
          fetch(`${API_URL_V2}/legislation/?json=${JSON.stringify({ legislature: 'us' })}`)
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
  }

  visibilitySensorOnChange(isVisible) {
    const { bills, dispatch, match } = this.props

    if (!isVisible || match.params.date || (bills.us && bills.us.synced) || this.state.search.terms) return

    const { bill_uid, last_action_date } = bills.us[bills.us.length - 1]
    const since = { bill_uid, last_action_date }
    fetch(`${API_URL_V2}/legislation/?json=${JSON.stringify({ legislature: 'us', since })}`)
      .then(response => response.json())
      .then(items => items.map(oldBill))
      .then(items =>
        dispatch({ append: true, bills: items, legislature: 'us', synced: items.length === 0, type: 'SYNC_BILLS' }))
  }

  search(ev) {
    const dispatch = this.props.dispatch
    const terms = ev.target.value
    searchQuery(terms, dispatch, this.setState.bind(this))
  }

  render() {
    const { bills, homescreen, history, location, match, votes } = this.props
    const { date } = match.params
    const key = date || 'us'
    let agenda = bills[key]

    if (!agenda) {
      return <ActivityIndicator />
    }

    if (date) {
      agenda = _.sortBy(agenda, 'itemNumber', 'number')
    }

    const search = this.state.search
    const agendaVotes = votes[date] || {}
    const title = date ? convertDateToLongFormat(date) : 'US Congress'

    return (
      <View>
        <Header history={history} location={location} title={title} />
        <View style={{ paddingBottom: '2rem', paddingHorizontal: '2rem' }}>
          { !date && <TextInput placeholder="Search legislation by title" style={{ marginBottom: 20 }} onChange={this.search} />}
          { agenda.length === 0 && <p>No legislation found for "{search.terms}"</p> }
          { agenda.map(bill => (
            /* <BillsListItem agendaVotes={agendaVotes} bill={bill} history={history} key={bill.uid || bill.id} /> */
            <BillsListItem agendaVotes={agendaVotes} bill={bill} history={history} key={bill.uid} />
          )).concat([
            <VisibilitySensor key="infinite-scroll" onChange={this.visibilitySensorOnChange}>
              {() => (!search.terms && !bills[key].synced && !match.params.date ? <ActivityIndicator /> : <span />)}
            </VisibilitySensor>,
          ])}

          { !!homescreen &&
            <PastAgendas history={history} />
          }
        </View>
      </View>
    )
  }
}

BillsList.propTypes = {
  bills: PropTypes.shape(),
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  homescreen: PropTypes.bool,
  isVerified: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      date: PropTypes.string,
    }).isRequired,
  }).isRequired,
  sessionId: PropTypes.string.isRequired,
  votes: PropTypes.shape(),
}

export default connect(pick([
  'bills',
  'billSort',
  'isVerified',
  'sessionId',
  'votes',
]))(BillsList)
