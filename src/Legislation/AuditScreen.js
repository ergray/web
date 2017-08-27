import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import Header from 'Header'
import Text from 'Text'

class AuditScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      audit: 'Loading...',
    }

    const { date, bill_id } = props.match.params
    const bill_uid = date ? `${date}-${bill_id}` : bill_id

    fetch(`${API_URL_V1}/bill/${bill_uid}/audit`)
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
    const bill_uid = date ? `${date}-${bill_id}` : bill_id

    fetch(`${API_URL_V1}/bill/${bill_uid}/audit/mine`, {
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
    const { history, location } = this.props

    return (
      <View style={{ paddingBottom: '2rem', paddingHorizontal: '2rem' }}>
        <Header backable history={history} location={location} title="Vote Audit" />

        { this.state.mine && (
          <View style={{
            borderBottomWidth: 1,
            borderColor: '#333',
            marginBottom: 30,
            paddingBottom: 30,
          }}
          >
            <Text style={{ marginBottom: 15 }}>
              You can find your vote to ensure your position was tallied correctly.
            </Text>
            <Text>
              YOUR HASH:
            </Text>
            <Text>
              {this.state.mine.hash} {this.state.mine.position}
            </Text>
          </View>
        )}

        <Text>
          {this.state.audit}
        </Text>

      </View>
    )
  }
}

AuditScreen.title = 'Audit Vote'

AuditScreen.propTypes = {
  history: PropTypes.shape({}),
  location: PropTypes.shape({}),
  match: PropTypes.shape({
    params: PropTypes.shape({
      bill_id: PropTypes.string,
      date: PropTypes.string,
    }),
  }),
  sessionId: PropTypes.string,
}

const mapStateToProps = state => ({
  sessionId: state.sessionId,
})

export default connect(mapStateToProps)(AuditScreen)
