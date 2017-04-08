import React from 'react'
import { ScrollView, Text } from 'react-native'
import { convertDateToLongFormat } from './convert-dates'

function BillContents({ bill }) {
  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>

      <Text style={{ color: 'white', fontStyle: 'italic', marginBottom: 10 }}>{convertDateToLongFormat(bill.date)}</Text>

      { bill.sponsors &&
        <Text style={{ color: 'white', marginBottom: 10 }}>Sponsors: {bill.sponsors.join('; ')}</Text>
      }

      <Text style={{ color: 'white', marginBottom: 30 }}>{bill.text}</Text>

      <Text style={{ color: 'white', fontWeight: '700', marginBottom: 20 }}>{bill.question}</Text>

    </ScrollView>
  )
}

BillContents.propTypes = {
  bill: React.PropTypes.shape({}),
}

export default BillContents
