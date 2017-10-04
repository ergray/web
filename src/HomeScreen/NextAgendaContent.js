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

    //api goes to a single tidbit of info,
    //will need a separate api to gather
    //nyc data

    //location is pages location.pathname
    function getNextAgenda(location) {
      console.log('here is location: ', location)
      if (location === '/sf'){
      console.log('in sf')
      fetch(`${API_URL_V1}/next-agenda`)
        .then(response => response.json())
        .then((nextAgenda) => {
          console.log('this should be next agenda: ',nextAgenda)
          props.dispatch({ nextAgenda, type: 'SYNC_NEXT_AGENDA' })

          // Did nextAgenda not include bills?
          // (Upcoming break, or agenda hasn't been published yet)
          if (!nextAgenda.bills) {
            return
          }

          const { bills, date } = nextAgenda
          console.log('should be dispatching sync right now')
          props.dispatch({ bills, date, type: 'SYNC_BILLS' })
        })
      } else if (location === '/nyc'){
          fetch('https://infinite-brushlands-18740.herokuapp.com/bills')
          .then(response => response.json())
          .then((response => {
            console.log('ignoring response for the moment')
            const nextAgenda = {date: '2017-10-10', message: 'This is a hard coded message'}
            console.log(nextAgenda)
            props.dispatch({ nextAgenda, type: 'SYNC_NEXT_AGENDA'})
            if (!nextAgenda.bills){
              return
            }
          }))
      }
    }

    // Refresh every 5 minutes
    this.refreshId = setInterval(() => getNextAgenda(location.pathname), 5 * 60 * 1000)

    getNextAgenda(location.pathname)
  }

  componentWillUnmount() {
    clearInterval(this.refreshId)
  }

  render() {
    console.log('calling next agenda content')
    console.log('url call: ', API_URL_V1)
    console.log('here are your props: ', this.props)
    console.log(location)
    const { history, nextAgenda} = this.props

    if (!nextAgenda) {
      console.log('no agenda found')
      return (
        <Text style={{
          fontSize: 18,
          fontWeight: '300',
          margin: 30,
        }}
        >Loading...</Text>
      )
    }

    console.log('about to touch date, message')
    const { date, message } = nextAgenda

    if (!date) {
      console.log('no date found')
      return (<BetweenWeeks
        history={history}
        message={message}
      />)
    }

    const { bills } = nextAgenda

    if (!bills) {
      console.log('no bills found')
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
