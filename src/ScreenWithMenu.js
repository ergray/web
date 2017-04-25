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
    if (this.props.isVerified !== nextProps.isVerified) {
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
        if (response.status === 401) { return props.navigator.push({ name: 'AuthErrorScreen' }) }

        return response.json()
        .then(({ voting_power }) => props.dispatch({ type: 'SYNC_VOTING_POWER', votingPower: voting_power }))
      })
    }

    // Get delegates from the server
    if (!props.isVerified) {
      props.dispatch({ delegates: [], type: 'SYNC_DELEGATES' })
    } else {
      fetch('https://api.liquid.vote/my-delegates', { headers: { Session_ID: props.sessionId } })
      .then(response => response.json())
      .then((serverDelegates) => {
        if (!deepEqual(serverDelegates, this.state.delegates)) {
          props.dispatch({ delegates: serverDelegates, type: 'SYNC_DELEGATES' })
        }
      })
    }

    // Get constituents from the server
    if (!props.isVerified) {
      props.dispatch({ constituents: { approved: [], rejected: [], requests: [] }, type: 'SYNC_CONSTITUENTS' })
    } else {
      // Get delegation approvals, rejections, and requests from the server
      fetch('https://api.liquid.vote/my-delegation-permissions', { headers: { Session_ID: props.sessionId } })
        .then(response => response.json())
        .then(constituents => props.dispatch({ constituents, type: 'SYNC_CONSTITUENTS' }))
    }
  }

  render() {
    const { navigator, route, Screen } = this.props

    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Menu navigator={navigator} style={{ backgroundColor: '#080808', paddingTop: 30, width: 254 }} />
        <View style={{ flex: 1, height: '100%' }}>
          <Header navigator={navigator} route={route} />
          <Screen navigator={navigator} route={route} />
        </View>
      </View>
    )
  }
}

ScreenWithMenu.disableHeader = true

ScreenWithMenu.propTypes = {
  isVerified: React.PropTypes.bool.isRequired,
  navigator: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
  route: React.PropTypes.shape({}),
  Screen: React.PropTypes.func.isRequired, // eslint-disable-line
}

const mapStateToProps = pick([
  'isVerified',
  'sessionId',
])

export default connect(mapStateToProps)(ScreenWithMenu)
