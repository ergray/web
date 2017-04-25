import React, { Component } from 'react'
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native'

class BillsListItem extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const { bill, navigator, agendaVotes } = this.props
    const vote = agendaVotes[bill.uid]

    let position
    let isDelegated
    if (vote) {
      position = vote.position
      isDelegated = !!vote.delegate_id
    }

    const positionColor = {
      nay: '#d62728',
      undefined: '#000',
      yea: '#2ca02c',
    }
    const positionIcon = {
      nay: '✗',
      undefined: '',
      yea: '✓',
    }

    return (
      <TouchableHighlight
        delayPressIn={60}
        key={bill.uid}
        underlayColor="#444"
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        onPress={() => navigator.push({ bill, name: 'BillScreen' })}
      ><View style={{
        backgroundColor: this.state.hover ? 'hsla(0,0%,100%,0.1)' : null,
        borderColor: 'grey',
        borderTopWidth: 1,
        flexDirection: 'row',
        paddingHorizontal: 4,
        paddingVertical: 15,
      }}
      >
        <View style={{ width: 26 }}>
          <Text style={{
            borderColor: '#888',
            borderRadius: 12,
            borderStyle: 'solid',
            borderWidth: vote && !isDelegated && position !== 'abstain' ? 1 : 0,
            color: positionColor[position],
            fontSize: 16,
            fontWeight: '800',
            paddingVertical: 2,
            textAlign: 'center',
            width: 23,
          }}
          >{ positionIcon[position] }</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#fff', paddingRight: 20 + 10 }}>
            {bill.itemNumber}. {bill.id} - {bill.title}
          </Text>

          {/* Vote count indicator */}
          { bill.votes.yea + bill.votes.nay > 0 && (
            <View style={{
              alignItems: 'center',
              flex: 1,
              flexDirection: 'row',
              marginTop: 10,
              opacity: 0.6,
              paddingRight: 30,
            }}
            >
              <Text style={{ color: '#fff', marginRight: 5 }}>{bill.votes.yea}</Text>
              <View style={{ backgroundColor: '#2ca02c', flex: bill.votes.yea, height: 4 }} />
              <View style={{ backgroundColor: '#d62728', flex: bill.votes.nay, height: 4 }} />
              <Text style={{ color: '#fff', marginLeft: 5 }}>{bill.votes.nay}</Text>
            </View>
          )}

        </View>
      </View></TouchableHighlight>
    )
  }
}

BillsListItem.propTypes = {
  agendaVotes: React.PropTypes.shape(),
  bill: React.PropTypes.shape().isRequired,
  navigator: React.PropTypes.shape({}).isRequired,
}

export default BillsListItem
