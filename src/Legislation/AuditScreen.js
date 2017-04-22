import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Text, View } from 'react-native'

class AuditScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      audit: 'Loading...',
    }

    fetch(`https://api.liquid.vote/bill/${props.route.bill.uid}/audit`)
      .then(response => response.text())
      .then(audit => this.setState({ audit }))

    fetch(`https://api.liquid.vote/bill/${props.route.bill.uid}/audit/mine`, {
      headers: { Session_ID: props.sessionId },
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
      <View style={{ alignSelf: 'center', flex: 1, width: 850 }}>

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

      </View>
    )
  }

}

AuditScreen.title = 'AUDIT VOTE'

AuditScreen.propTypes = {
  route: React.PropTypes.shape({
    bill: React.PropTypes.shape({
      uid: React.PropTypes.string.isRequired,
    }),
  }),
  sessionId: React.PropTypes.string,
}

const mapStateToProps = state => ({
  sessionId: state.sessionId,
})

export default connect(mapStateToProps)(AuditScreen)
