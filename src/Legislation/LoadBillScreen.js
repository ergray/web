import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import { connect } from 'react-redux'
import { oldBill } from '../_util'
import Text from '../Text'
import BillScreen from './BillScreen'

class LoadBillScreen extends Component {
  componentDidMount() {
    const { bills, dispatch, match } = this.props
    const { date, bill_id } = match.params
    const bill_uid = date ? `${date}-${bill_id}` : bill_id

    if (date && bills) {
      fetch(`${API_URL_V1}/bills/${date}`)
        .then(response => response.json())
        .then(loadedBills => dispatch({ bills: loadedBills, date, type: 'SYNC_BILLS' }))
    } else if (!bills.us || !bills.us.filter(b => b.uid === bill_uid).length) {
      fetch(`${API_URL_V2}/legislation/?legislature=us&bill_uid=${bill_uid}`)
        .then(response => response.json())
        .then(loadedBills => loadedBills.map(oldBill))
        .then(loadedBills => dispatch({ bills: loadedBills, legislature: 'us', type: 'SYNC_BILLS' }))
    }
  }

  render() {
    const { bills, history, location, match } = this.props
    const { date, bill_id } = match.params
    const bill_uid = date ? `${date}-${bill_id}` : bill_id
    const key = date || 'us'

    let message = `Loading bill ${bill_uid}...`

    if (bills[key]) {
      const bill = bills[key].filter(b => b.uid === bill_uid)[0]
      if (!bill) {
        message = `Bill ${bill_uid} not found`
      } else {
        return <BillScreen bill={bill} history={history} location={location} />
      }
    }

    return (
      <View style={{ marginHorizontal: 20, marginTop: 20 }}>
        <Text>{message}</Text>
      </View>
    )
  }
}

LoadBillScreen.disableHeader = true

LoadBillScreen.propTypes = {
  bills: React.PropTypes.shape(),
  dispatch: React.PropTypes.func.isRequired,
  history: React.PropTypes.shape().isRequired,
  location: React.PropTypes.shape().isRequired,
  match: React.PropTypes.shape({
    params: React.PropTypes.shape({}).isRequired,
  }).isRequired,
}

const mapStateToProps = state => ({
  bills: state.bills,
})

export default connect(mapStateToProps)(LoadBillScreen)
