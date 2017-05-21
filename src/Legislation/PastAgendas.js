import React, { Component } from 'react'
import {
  Text,
  View,
} from 'react-native'
import HoverableOpacity from '../HoverableOpacity'
import { convertDateToLongFormat, hasDatePassed } from './convert-dates'

class PastAgendas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activated: true,
    }

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
          margin: 30,
        }}
        >Loading...</Text>
      )
    }

    return (
      <View style={{ margin: 30 }}>

        <HoverableOpacity
          activeOpacity={0.5}
          hoverStyle={{ backgroundColor: 'hsla(0,0%,100%,0.1)' }}
          outerStyle={{ marginBottom: 15 }}
          style={{
            alignItems: 'center',
            borderColor: 'hsl(0,0%,30%)',
            borderRadius: 5,
            borderWidth: 1,
            height: 38,
            justifyContent: 'center',
          }}
          onPress={() => this.setState({ activated: false })}
        >
          <Text style={{ color: '#fff', fontFamily: 'HelveticaNeue, Helvetica', fontSize: 13 }}>
            HIDE PAST AGENDAS
          </Text>
        </HoverableOpacity>

        { dates.map(date => (
          <HoverableOpacity
            hoverStyle={{ backgroundColor: 'hsla(0,0%,100%,0.1)' }}
            key={date}
            outerStyle={{
              borderColor: 'hsla(0,0%,100%,0.25)',
              borderRadius: 4,
              borderWidth: 1,
              marginVertical: 8,
            }}
            style={{
              backgroundImage: 'linear-gradient(-180deg, hsla(0,0%,20%,0.5) 0%, hsla(0,0%,10%,0.5) 100%)',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 15,
            }}
            onPress={() => this.props.history.push(`/sf/${date}`, { backable: true })}
          >
            <Text style={{ color: '#eee' }}>{ convertDateToLongFormat(date) }</Text>
            <Text style={{ color: 'lightgrey', fontSize: 14, fontWeight: '800' }}>></Text>
          </HoverableOpacity>
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
