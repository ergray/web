import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import dateFormat from 'dateformat'
import CommonStyle from '../CommonStyle'
import HoverableListItemPanel from '../HoverableListItemPanel'
import Text from '../Text'

const cstyle = CommonStyle()

class BillsListItem extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const { bill, history, agendaVotes } = this.props
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

    let billUrl = `/sf/${bill.date}/${bill.id}`
    if (bill.introduced) {
      billUrl = `/legislation/${bill.bill_uid}`
    }

    let yea = bill.votes.yea || 0
    let nay = bill.votes.nay || 0
    if (yea === 0 && nay === 0) {
      yea = 1
      nay = 1
    }

    const metaStyle = {
      borderColor: cstyle.panelBorderColor,
      borderRadius: 3,
      borderStyle: 'solid',
      borderWidth: 1,
      color: cstyle.bodyColorLowlight,
      fontSize: '11px',
      marginRight: '6px',
      padding: '3px',
    }

    return (
      <HoverableListItemPanel
        key={bill.uid}
        onPress={() => history.push(billUrl)}
      >
        <View>
          <View style={{ width: 35 }}>
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
          <View style={{ flex: 1, paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '.5rem' }}>
            <Text>{bill.title}</Text>
            <View style={{ flexDirection: 'row', marginTop: '.5rem' }}>
              <View style={{ flexDirection: 'row', flexGrow: 1, justifyContent: 'flex-start' }}>
                <Text style={metaStyle}>{(bill.chamber || '').toUpperCase()}</Text>
                <Text style={metaStyle}>#{bill.itemNumber}</Text>
                <Text style={metaStyle}>Introduced {dateFormat(bill.date, 'yyyy-mm-dd')}</Text>
                <Text style={metaStyle}>Last action {dateFormat(bill.last_action || bill.updated || bill.date, 'ddd, mmm dS, h:MM TT')}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text style={metaStyle}>Yea: 0</Text>
                <Text style={{ ...metaStyle, marginRight: 0 }}>Nay: 0</Text>
              </View>
            </View>

          </View>
          {/* Vote count indicator */}
          <View style={{
            alignItems: 'center',
            flex: 1,
            flexDirection: 'row',
            marginLeft: -2,
            marginTop: '.5rem',
            opacity: 0.4,
          }}
          >
            <View style={{ backgroundColor: '#2ca02c', flex: yea, height: 2 }} />
            <View style={{ backgroundColor: '#d62728', flex: nay, height: 2 }} />
          </View>
        </View>
      </HoverableListItemPanel>
    )
  }
}

BillsListItem.propTypes = {
  agendaVotes: React.PropTypes.shape(),
  bill: React.PropTypes.shape().isRequired,
  history: React.PropTypes.shape({}).isRequired,
}

export default BillsListItem
