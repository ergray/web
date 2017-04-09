import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Text, View } from 'react-native'

class AuditVoteScreen extends Component {
  constructor() {
    super()
    this.state = {
      verification: 'Loading...',
    }
  }

  componentWillMount() {
    fetch(`https://api.liquid.vote/bill/${this.props.route.bill.uid}/votes/verification`)
      .then(response => response.text())
      .then(verification => this.setState({ verification }))
  }

  render() {
    return (
      <View style={{ flex: 1, width: 850 }}>

        <ScrollView style={{ flex: 1, padding: 20 }}>

          <Text style={{ color: 'white' }}>
            {this.state.verification}
          </Text>

        </ScrollView>

      </View>
    )
  }

}

AuditVoteScreen.title = 'AUDIT VOTE'

AuditVoteScreen.propTypes = {
  route: React.PropTypes.shape({
    bill: React.PropTypes.shape({
      uid: React.PropTypes.string.isRequired,
    }),
  }),
}

const mapStateToProps = state => ({ activeBill: state.activeBill })

export default connect(mapStateToProps)(AuditVoteScreen)
