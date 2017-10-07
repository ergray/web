import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import { connect } from 'react-redux'
import { oldBill } from '_util'
import ActivityIndicator from 'ActivityIndicator'
import Text from 'Text'
import BillScreen from 'Legislation/BillScreen'

const path = location.pathname

class LoadBillScreen extends Component {
  componentDidMount() {
    const { bills, dispatch, match } = this.props
    const { date, bill_id } = match.params
    const bill_uid = date ? `${date}-${bill_id}` : bill_id
    const pathRe = /[a-z]+/g
    const thisPath = pathRe.exec(path)[0]

    if (date && bills) {
      if (thisPath === 'sf') {
        fetch(`${API_URL_V1}/bills/${date}`)
          .then(response => response.json())
          .then(loadedBills => dispatch({ bills: loadedBills, date, type: 'SYNC_BILLS' }))
          // nyc addition
      } else if (thisPath === 'nyc') {
        fetch('https://infinite-brushlands-18740.herokuapp.com/bills')
          .then(response => response.json())
          .then(response => dispatch({ bills: response.data, date, type: 'SYNC_BILLS' }))
      }
      // end nyc addition
    } else if (!bills.us || !bills.us.filter(b => b.uid === bill_uid).length) {
      fetch(`${API_URL_V2}/legislation/?json=${JSON.stringify({ bill_uid, legislature: 'us' })}`)
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

    // added for scope, clean this up, maybe add to a redux store so we can always refer to it
    const pathRe = /[a-z]+/g
    const thisPath = pathRe.exec(path)[0]
    if (bills[key]) {
      let bill = bills[key].filter(b => b.uid === bill_uid)[0]
      // content for nyc
      if (thisPath === 'nyc') {
        bill = bills[key].filter(b => b.id === Number(bill_id))[0]
        bill.uid = bill_uid
      }
      // end new content
      if (!bill) {
        return (
          <View style={{ marginHorizontal: 20, marginTop: 20 }}>
            <Text>Bill {bill_uid} not found</Text>
          </View>
        )
      }
      return <BillScreen bill={bill} history={history} location={location} />
    }

    return (
      <ActivityIndicator text={`Loading bill ${bill_uid}...`} />
    )
  }
}

LoadBillScreen.disableHeader = true

LoadBillScreen.propTypes = {
  bills: PropTypes.shape(),
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({}).isRequired,
  }).isRequired,
}

const mapStateToProps = state => ({
  bills: state.bills,
})

export default connect(mapStateToProps)(LoadBillScreen)
