import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import ForwardIcon from 'react-icons/lib/md/chevron-right'
import CommonStyle from '../CommonStyle'
import Text from '../Text'
import HoverableListItemPanel from '../HoverableListItemPanel'
import { convertDateToLongFormat, hasDatePassed } from './convert-dates'

const cstyle = CommonStyle()

class PastAgendas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dates: null,
    }
    const path = props.history.location.pathname

    if (path === '/sf') {
      fetch(`${API_URL_V1}/dates`)
        .then(response => response.json())
        .then((dates) => {
          this.setState({ dates: dates.filter(hasDatePassed) })
        })
    } else if (path === '/nyc') {
      fetch('https://infinite-brushlands-18740.herokuapp.com/bills')
        .then(response => response.json())
        .then((response) => {
          const dates = response.data.map(bills => bills.date)
          const trimmedDates = new Set(dates)
          const uniqueDates = Array.from(trimmedDates)
          // in the future this should filter like sf, to pull only dates that have occurred
          // and not future agenda items
          this.setState({ dates: uniqueDates })
        })
    }
  }
  render() {
    const { dates } = this.state
    const path = this.props.history.location.pathname

    if (!dates) {
      return (
        <Text style={{
          fontSize: 18,
          fontWeight: '300',
          margin: 30,
        }}
        >Loading...</Text>
      )
    }

    return (
      <View style={{ margin: 30 }}>
        { dates.map(date => (

          <HoverableListItemPanel
            key={date}
            style={{ padding: '1rem' }}
            // nyc change: adjusted for scalability - no longer hard codes in 'sf' in favor of location.pathname
            onPress={() => this.props.history.push(`${path}/${date}`, { backable: true })}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ flexGrow: 1, fontWeight: '500' }}>{ convertDateToLongFormat(date) }</Text>
              <ForwardIcon color={cstyle.bodyColorLowlight} size={20} />
            </View>
          </HoverableListItemPanel>
        )) }

      </View>
    )
  }
}

PastAgendas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default PastAgendas
