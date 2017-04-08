import React from 'react'
import {
  Text,
  View,
} from 'react-native'
import { connect } from 'react-redux'

function LoadBillScreen({ bills, dispatch, navigator, route }) {
  const { bill_uid } = route
  const date = bill_uid.slice(0, 10)
  let message = `Loading bill ${bill_uid}...`
  if (bills[date]) {
    const bill = bills[date].filter(b => b.uid === bill_uid)[0]
    if (!bill) {
      message = `Bill ${bill_uid} not found`
    } else {
      setTimeout(() => {
        navigator.replace({ bill, name: 'BillScreen' })
      }, 0)
    }
  } else {
    fetch(`https://api.liquid.vote/bills/${date}`)
    .then(response => response.json())
    .then(loadedBills => dispatch({ bills: loadedBills, date, type: 'SYNC_BILLS' }))
  }

  return (
    <View style={{ marginHorizontal: 20, marginTop: 20 }}>
      <Text style={{ color: '#fff' }}>{message}</Text>
    </View>
  )
}

LoadBillScreen.title = 'LOADING BILL'

LoadBillScreen.propTypes = {
  bills: React.PropTypes.shape(),
  dispatch: React.PropTypes.func.isRequired,
  navigator: React.PropTypes.shape({}).isRequired,
  route: React.PropTypes.shape({
    bill_uid: React.PropTypes.string,
  }),
}

const mapStateToProps = state => ({
  bills: state.bills,
})

export default connect(mapStateToProps)(LoadBillScreen)
