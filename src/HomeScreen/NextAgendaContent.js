import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  ScrollView,
} from 'react-native'
import { connect } from 'react-redux'
import { convertDateToLongFormat } from '../Legislation/convert-dates'
import PastAgendas from '../Legislation/PastAgendas'
import BillsList from '../Legislation/BillsList'
import Text from '../Text'
import BetweenWeeks from './BetweenWeeks'
const pick = require('lodash/fp/pick')

class NextAgendaContent extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    const path = location.pathname

    // location parameter added for scalability, should be location.pathname
    function getNextAgenda(pathname) {
      if (pathname === '/sf') {
        fetch(`${API_URL_V1}/next-agenda`)
          .then(response => response.json())
          .then((nextAgenda) => {
            props.dispatch({ nextAgenda, type: 'SYNC_NEXT_AGENDA' })

            // Did nextAgenda not include bills?
            // (Upcoming break, or agenda hasn't been published yet)
            if (!nextAgenda.bills) {
              return
            }

            const { bills, date } = nextAgenda
            props.dispatch({ bills, date, type: 'SYNC_BILLS' })
          })
      } else if (pathname === '/nyc') {
        fetch('https://infinite-brushlands-18740.herokuapp.com/bills')
          .then(response => response.json())
          .then(() => {
            // hard coded for the moment as we don't have a /next-agenda endpoint
            const nextAgenda = { date: '2017-09-17', message: 'Holiday - Offices Closed' }
            props.dispatch({ nextAgenda, type: 'SYNC_NEXT_AGENDA' })
            if (!nextAgenda.bills) {
              console.log('no bill')
            }
          })
      }
    }

    // Refresh every 5 minutes
    this.refreshId = setInterval(() => getNextAgenda(path), 5 * 60 * 1000)
    getNextAgenda(path)
  }

  componentWillUnmount() {
    clearInterval(this.refreshId)
  }

  render() {
    const { history, nextAgenda } = this.props

    if (!nextAgenda) {
      return (
        <Text style={{
          fontSize: 18,
          fontWeight: '300',
          margin: 30,
        }}
        >Loading...</Text>
      )
    }

    const { date, message } = nextAgenda

    if (!date) {
      return (<BetweenWeeks
        history={history}
        message={message}
      />)
    }

    const { bills } = nextAgenda

    if (!bills) {
      return (
        <ScrollView>
          <Text style={{ marginTop: 15, textAlign: 'center', textTransform: 'uppercase' }}>
            No agenda for {convertDateToLongFormat(date)}
          </Text>
          <Text style={{
            fontSize: 16,
            fontWeight: '300',
            margin: 30,
          }}
          >{message}</Text>
          <PastAgendas history={history} />
        </ScrollView>
      )
    }

    return (
      <BillsList {...this.props} homescreen match={{ params: { date } }} />
    )
  }
}

NextAgendaContent.disableHeader = true

NextAgendaContent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  nextAgenda: PropTypes.shape(),
}

const mapStateToProps = pick([
  'nextAgenda',
])

export default connect(mapStateToProps)(NextAgendaContent)
