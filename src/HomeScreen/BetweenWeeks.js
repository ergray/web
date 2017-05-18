import React, { Component } from 'react'
import {
  ScrollView,
  Switch,
  Text,
} from 'react-native'
import { connect } from 'react-redux'
import PastAgendas from '../Legislation/PastAgendas'
import CountdownTimer from './react-countdown-timer'
const pick = require('lodash/fp/pick')

class BetweenWeeks extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    function getNextAgenda() {
      fetch('https://api.liquid.vote/next-agenda')
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
    }

    // Refresh every 5 minutes
    this.refreshId = setInterval(() => getNextAgenda(), 5 * 60 * 1000)

    getNextAgenda()
  }

  componentWillUnmount() {
    clearInterval(this.refreshId)
  }

  render() {
    const { dispatch, history, message, user } = this.props

    const daysUntilFriday = 5 - (new Date()).getDay()
    function millisecondsUntilFridayAtNoon() {
      const noonFriday = new Date()
      noonFriday.setHours(12, 0, 0, 0)
      noonFriday.setDate((new Date()).getDate() + daysUntilFriday)
      return noonFriday - (new Date())
    }

    return (
      <ScrollView>
        <Text style={{
          color: '#fff',
          fontSize: 18,
          fontWeight: '300',
          margin: 30,
        }}
        >{message} Expected in&nbsp;
        {<CountdownTimer initialTimeRemaining={millisecondsUntilFridayAtNoon()} />}.</Text>

        <Text style={{
          color: '#fff',
          fontSize: 18,
          fontWeight: '300',
          margin: 30,
        }}
        >
        Would you like a notification for it's release?
          <Switch
            activeThumbColor="#5CB85C"
            activeTrackColor="#ADDAAD"
            style={{
              display: 'inline-block',
              marginHorizontal: 10,
              position: 'relative',
              top: 2,
              width: 60,
            }}
            thumbColor="#EBA9A7"
            trackColor="#D9534F"
            value={user.legislation_notification}
            onValueChange={() => {
              dispatch({ type: 'TOGGLE_LEGISLATION_NOTIFICATIONS' })
              fetch('https://api.liquid.vote/legislation-notifications', {
                headers: { Session_ID: this.props.sessionId },
                method: 'PUT',
              })
            }}
          />
          <Text style={{ display: 'inline-block', width: 35 }}>
            {user.legislation_notification ? 'ON' : 'OFF' }
          </Text>
        </Text>


        <PastAgendas history={history} />
      </ScrollView>
    )
  }
}

BetweenWeeks.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
  message: React.PropTypes.string,
  sessionId: React.PropTypes.string.isRequired,
  user: React.PropTypes.shape().isRequired,
}

const mapStateToProps = pick([
  'sessionId',
  'user',
])

export default connect(mapStateToProps)(BetweenWeeks)
