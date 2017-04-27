import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Text, View } from 'react-native'

class AuditScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      audit: 'Loading...',
    }

    const { date, bill_id } = props.match.params

    fetch(`https://api.liquid.vote/bill/${date}-${bill_id}/audit`)
      .then(response => response.text())
      .then(audit => this.setState({ audit }))

    if (props.sessionId) {
      this.getMyHash(props.sessionId)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.sessionId && nextProps.sessionId) {
      this.getMyHash(nextProps.sessionId)
    }
  }

  getMyHash(sessionId) {
    const { date, bill_id } = this.props.match.params

    fetch(`https://api.liquid.vote/bill/${date}-${bill_id}/audit/mine`, {
      headers: { Session_ID: sessionId },
    })
    .then((response) => {
      if (response.status === 200) {
        response.json()
        .then(mine => this.setState({ mine }))
      }
    })
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, padding: 20 }}>

        { this.state.mine && (
          <View style={{
            borderBottomWidth: 1,
            borderColor: '#333',
            marginBottom: 30,
            paddingBottom: 30,
          }}
          >
            <Text style={{ color: 'white', marginBottom: 15 }}>
              You can find your vote to ensure your position was tallied correctly.
            </Text>
            <Text style={{ color: 'white' }}>
              YOUR HASH:
            </Text>
            <Text style={{ color: 'white' }}>
              {this.state.mine.hash} {this.state.mine.position}
            </Text>
          </View>
        )}

        <Text style={{ color: 'white' }}>
          {this.state.audit}
        </Text>

      </ScrollView>
    )
  }

}

AuditScreen.title = 'AUDIT VOTE'

AuditScreen.propTypes = {
  match: React.PropTypes.shape({
    params: React.PropTypes.shape({
      bill_id: React.PropTypes.string.isRequired,
      date: React.PropTypes.string.isRequired,
    }),
  }),
  sessionId: React.PropTypes.string,
}

const mapStateToProps = state => ({
  sessionId: state.sessionId,
})

export default connect(mapStateToProps)(AuditScreen)
