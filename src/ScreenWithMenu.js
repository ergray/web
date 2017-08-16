import React, { Component } from 'react'
import { connect } from 'react-redux'
import deepEqual from 'deep-equal'
import { View } from 'react-native'
import Menu from './Menu'
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
      fetch('https://api.liquid.vote/my-voting-power', { headers: { Session_ID: props.sessionId } })
      .then((response) => {
        if (response.status === 401) { return props.history.push('/auth-error') }

        return response.json()
        .then(({ voting_power }) => props.dispatch({ type: 'SYNC_VOTING_POWER', votingPower: voting_power }))
      })
    }

    // Get delegates from the server
    if (props.sessionId) {
      fetch('https://api.liquid.vote/my-delegates', { headers: { Session_ID: props.sessionId } })
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
      fetch('https://api.liquid.vote/my-delegation-permissions', { headers: { Session_ID: props.sessionId } })
        .then(response => response.json())
        .then(constituents => props.dispatch({ constituents, type: 'SYNC_CONSTITUENTS' }))
    }
  }

  render() {
    const { history, location, match, path, Screen } = this.props

    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1, height: '100%' }}>
          <Menu history={history} style={{ backgroundColor: '#080808', padding: 30 }} />
          <Header history={history} location={location} path={path} />
          <Screen history={history} location={location} match={match} />
        </View>
      </View>
    )
  }
}

ScreenWithMenu.disableHeader = true

ScreenWithMenu.propTypes = {
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
  isVerified: React.PropTypes.bool.isRequired,
  location: React.PropTypes.shape({}).isRequired,
  match: React.PropTypes.shape({}).isRequired,
  path: React.PropTypes.string.isRequired,
  sessionId: React.PropTypes.string,
  Screen: React.PropTypes.func.isRequired, // eslint-disable-line
}

const mapStateToProps = pick([
  'isVerified',
  'sessionId',
])

export default connect(mapStateToProps)(ScreenWithMenu)
