import React, { Component } from 'react'
import {
  ScrollView,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import HoverableOpacity from '../HoverableOpacity'
import Text from '../Text'

class RequestsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    // If they're verified, update delegation approvals, rejections, and requests
    if (props.isVerified) {
      fetch(`${API_URL_V1}/my-delegation-permissions`, { headers: { Session_ID: props.sessionId } })
        .then(response => response.json())
        .then(constituents => props.dispatch({ constituents, type: 'SYNC_CONSTITUENTS' }))
    }
  }

  updatePermissions(from, to, user) {
    fetch(`${API_URL_V1}/my-delegation-permissions`, {
      body: JSON.stringify({
        from,
        to,
        user,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Session_ID: this.props.sessionId,
      },
      method: 'PUT',
    })
      .then(response => response.json())
      .then(constituents => this.props.dispatch({ constituents, type: 'SYNC_CONSTITUENTS' }))
  }

  render() {
    if (!this.props.constituents) {
      return <Text style={{ fontSize: 16, marginLeft: 20, marginTop: 10 }}>Loading...</Text>
    }

    const { approved, rejected, requests } = this.props.constituents

    // Count num{Requested,Approved,Rejected} once they've loaded
    const numRequested = !requests ? '' : `(${requests.length})`
    const numApproved = !approved ? '' : `(${approved.length})`
    const numRejected = !rejected ? '' : `(${rejected.length})`

    return (
      <View style={{ alignSelf: 'center', flex: 1, marginHorizontal: 20, marginTop: 20 }}>
        <Text style={{ marginBottom: 20 }}>Approving someone to delegate to you increases your voting power, but also allows them to see how you vote.</Text>

        <ScrollView style={{ flex: 1 }}>
          <Text style={{ fontSize: 12, fontWeight: '700', marginBottom: 10, textTransform: 'uppercase' }}>Requests {numRequested}</Text>
          {requests.length === 0
            ? <View>
              <Text style={{ fontStyle: 'italic' }}>No requests— try inviting people.</Text>
            </View>
            : requests.map(user => (
              <View key={user.id} style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Text style={{ flex: 1, marginBottom: 5 }}>{user.first_name} {user.last_name}</Text>
                <HoverableOpacity
                  hoverStyle={{ backgroundColor: 'hsla(120, 57%, 40%, 0.1)' }}
                  outerStyle={{
                    borderColor: '#2ca02c',
                    borderRadius: 19,
                    borderWidth: 1,
                    marginRight: 10,
                  }}
                  style={{
                    alignItems: 'center',
                    backgroundColor: null,
                    paddingVertical: 6,
                    shadowOpacity: 0,
                    width: 50,
                  }}
                  onPress={() => { this.updatePermissions('requests', 'approved', user) }}
                ><Text style={{ fontSize: 20 }}>✓</Text></HoverableOpacity>
                <HoverableOpacity
                  hoverStyle={{ backgroundColor: 'rgba(251, 82, 82, 0.1)' }}
                  outerStyle={{
                    borderColor: '#d62728',
                    borderRadius: 19,
                    borderWidth: 1,
                  }}
                  style={{
                    alignItems: 'center',
                    backgroundColor: null,
                    paddingVertical: 6,
                    shadowOpacity: 0,
                    width: 50,
                  }}
                  onPress={() => { this.updatePermissions('requests', 'rejected', user) }}
                ><Text style={{ fontSize: 20 }}>✗</Text></HoverableOpacity>
              </View>
            ))
          }

          <Text style={{ fontSize: 12, fontWeight: '700', marginTop: 30, textTransform: 'uppercase' }}>Approved {numApproved}</Text>
          {approved && approved.map(user => (
            <View key={user.id} style={{ alignItems: 'center', flexDirection: 'row', marginVertical: 7 }}>
              <HoverableOpacity
                hoverStyle={{ backgroundColor: 'rgba(251, 82, 82, 0.1)' }}
                outerStyle={{
                  borderColor: '#d62728',
                  borderRadius: 19,
                  borderWidth: 1,
                  marginRight: 10,
                }}
                style={{
                  alignItems: 'center',
                  height: 30,
                  justifyContent: 'center',
                  width: 30,
                }}
                onPress={() => { this.updatePermissions('approved', 'rejected', user) }}
              ><Text style={{ fontSize: 20 }}>✗</Text></HoverableOpacity>
              <Text style={{ flex: 1 }}>{user.first_name} {user.last_name}</Text>
            </View>
          ))}

          <Text style={{ fontSize: 12, fontWeight: '700', marginTop: 15, textTransform: 'uppercase' }}>Rejected {numRejected}</Text>
          {rejected && rejected.map(user => (
            <View key={user.id} style={{ alignItems: 'center', flexDirection: 'row', marginVertical: 7 }}>
              <HoverableOpacity
                hoverStyle={{ backgroundColor: 'hsla(120, 57%, 40%, 0.1)' }}
                outerStyle={{
                  borderColor: '#2ca02c',
                  borderRadius: 19,
                  borderWidth: 1,
                  marginRight: 10,
                }}
                style={{
                  alignItems: 'center',
                  height: 30,
                  justifyContent: 'center',
                  width: 30,
                }}
                onPress={() => { this.updatePermissions('rejected', 'approved', user) }}
              ><Text style={{ fontSize: 20 }}>✓</Text></HoverableOpacity>
              <Text style={{ flex: 1 }}>{user.first_name} {user.last_name}</Text>
            </View>
          ))}
        </ScrollView>

      </View>
    )
  }
}

RequestsScreen.title = 'Requests'

RequestsScreen.propTypes = {
  constituents: React.PropTypes.shape({
    approved: React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired,
    rejected: React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired,
    requests: React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired,
  }),
  dispatch: React.PropTypes.func.isRequired,
  isVerified: React.PropTypes.bool.isRequired,
  sessionId: React.PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  constituents: state.constituents,
  isVerified: state.isVerified,
  sessionId: state.sessionId,
})

export default connect(mapStateToProps)(RequestsScreen)
