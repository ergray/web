import React, { Component } from 'react'
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import HoverableOpacity from '../HoverableOpacity'
import { convertDateToLongFormat, hasDatePassed } from './convert-dates'

class PastAgendas extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    fetch('https://api.liquid.vote/dates')
    .then(response => response.json())
    .then((dates) => {
      this.setState({ dates: dates.filter(hasDatePassed) })
    })
  }

  render() {
    const { dates } = this.state

    if (!this.state.activated) {
      return (
        <HoverableOpacity
          activeOpacity={0.5}
          hoverStyle={{ backgroundColor: 'hsla(0,0%,100%,0.1)' }}
          outerStyle={{ margin: 30 }}
          style={{
            alignItems: 'center',
            borderColor: 'grey',
            borderRadius: 5,
            borderWidth: 1,
            height: 38,
            justifyContent: 'center',
          }}
          onPress={() => this.setState({ activated: true })}
        >
          <Text style={{ color: '#fff', fontFamily: 'HelveticaNeue, Helvetica', fontSize: 13 }}>
            VIEW PAST AGENDAS
          </Text>
        </HoverableOpacity>
      )
    }

    if (!dates) {
      return (
        <Text style={{
          color: '#fff',
          fontSize: 18,
          fontWeight: '300',
          marginHorizontal: 30,
          marginTop: 20,
        }}
        >Loading...</Text>
      )
    }

    return (
      <View style={{ marginHorizontal: 30, marginTop: 30 }}>

        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            alignItems: 'center',
            backgroundColor: '#333',
            borderColor: 'grey',
            borderRadius: 5,
            borderWidth: 1,
            height: 38,
            justifyContent: 'center',
            marginBottom: 15,
            paddingVertical: 8,
            position: 'relative',
            shadowOpacity: 0,
          }}
          onPress={() => this.setState({ activated: false })}
        >
          <Text style={{ color: '#fff', fontFamily: 'HelveticaNeue, Helvetica', fontSize: 13 }}>
            HIDE PAST AGENDAS
          </Text>
        </TouchableOpacity>

        { dates.map(date => (
          <TouchableOpacity
            key={date}
            style={{
              borderColor: 'grey',
              borderRadius: 4,
              borderWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 6,
              padding: 10,
            }}
            onPress={() => this.props.navigator.push({ date, name: 'AgendaScreen' })}
          >
            <Text style={{ color: '#fff' }}>{ convertDateToLongFormat(date) }</Text>
            <Text style={{ color: 'lightgrey', fontSize: 14, fontWeight: '800' }}>></Text>
          </TouchableOpacity>
        )) }

      </View>
    )
  }
}

PastAgendas.propTypes = {
  navigator: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
}

export default PastAgendas
