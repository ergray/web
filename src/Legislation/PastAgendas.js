import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import ForwardIcon from 'react-icons/lib/md/chevron-right'
import { api_url } from '../Config'
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

    fetch(`${api_url}/dates`)
    .then(response => response.json())
    .then((dates) => {
      this.setState({ dates: dates.filter(hasDatePassed) })
    })
  }

  render() {
    const { dates } = this.state

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
            onPress={() => this.props.history.push(`/sf/${date}`, { backable: true })}
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
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
}

export default PastAgendas
