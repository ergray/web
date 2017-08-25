import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import deepEqual from 'deep-equal'
import { View } from 'react-native'
import IntroHeader from './IntroHeader'
import Menu from './Menu/Menu'
import Header from './Header'
const pick = require('lodash/fp/pick')

class ScreenWithMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    // Refresh every 5 minutes
    this.refreshId = setInterval(() => this.getUserInfoFromServer(props), 5 * 60 * 1000)

    this.getUserInfoFromServer(props)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isVerified !== nextProps.isVerified
      || this.props.sessionId !== nextProps.sessionId
    ) {
      this.getUserInfoFromServer(nextProps)
    }
  }

  componentWillUnmount() {
    clearInterval(this.refreshId)
  }

  getUserInfoFromServer(props) {
    // Get voting_power
    if (!props.isVerified) {
      props.dispatch({ type: 'SYNC_VOTING_POWER', votingPower: 0 })
    } else {
      fetch(`${API_URL_V1}/my-voting-power`, { headers: { Session_ID: props.sessionId } })
        .then((response) => {
          if (response.status === 401) { return props.history.push('/auth-error') }

          return response.json()
            .then(({ voting_power }) => props.dispatch({ type: 'SYNC_VOTING_POWER', votingPower: voting_power }))
        })
    }

    // Get delegates from the server
    if (props.sessionId) {
      fetch(`${API_URL_V1}/my-delegates`, { headers: { Session_ID: props.sessionId } })
        .then(response => response.json())
        .then((serverDelegates) => {
          if (!deepEqual(serverDelegates, this.state.delegates)) {
            props.dispatch({ delegates: serverDelegates, type: 'SYNC_DELEGATES' })
          }
        })
    }

    // Get constituents from the server
    if (props.sessionId) {
      // Get delegation approvals, rejections, and requests from the server
      fetch(`${API_URL_V1}/my-delegation-permissions`, { headers: { Session_ID: props.sessionId } })
        .then(response => response.json())
        .then(constituents => props.dispatch({ constituents, type: 'SYNC_CONSTITUENTS' }))
    }
  }

  render() {
    const { history, loading, location, match, Screen, sessionId } = this.props

    return (
      <View>
        <Menu history={history} />
        {!loading.client && !sessionId && ['/sign-in', '/join'].indexOf(location.pathname) === -1 &&
          <IntroHeader history={history} />
        }
        <Header history={history} location={location} />
        <Screen history={history} location={location} match={match} />
      </View>
    )
  }
}

ScreenWithMenu.disableHeader = true

ScreenWithMenu.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  isVerified: PropTypes.bool.isRequired,
  loading: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
  sessionId: PropTypes.string,
  Screen: PropTypes.func.isRequired, // eslint-disable-line
}

const mapStateToProps = pick([
  'isVerified',
  'loading',
  'sessionId',
])

export default connect(mapStateToProps)(ScreenWithMenu)
