import PropTypes from 'prop-types'
import React from 'react'
import { View, Platform, WebView } from 'react-native'
import Text from '../Text'
import { convertDateToLongFormat } from './convert-dates'

function BillContents({ bill }) {
  return (
    <View style={{ padding: '2rem' }}>

      <Text style={{ fontStyle: 'italic', marginBottom: 10 }}>{convertDateToLongFormat(bill.date)}</Text>

      { bill.sponsors &&
        <Text style={{ marginBottom: 10 }}>Sponsors: {bill.sponsors.join('; ')}</Text>
      }

      {Platform.OS !== 'web' &&
        <WebView source={{ html: bill.text }} style={{ marginBottom: 30 }} />
      }
      {Platform.OS === 'web' &&
        <div dangerouslySetInnerHTML={{ __html: bill.text }} /> // eslint-disable-line react/no-danger
      }

      <Text style={{ fontWeight: '700', marginBottom: 20 }}>{bill.question}</Text>

    </View>
  )
}

BillContents.propTypes = {
  bill: PropTypes.shape({}),
}

export default BillContents
