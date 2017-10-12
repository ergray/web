import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import dateFormat from 'dateformat'
import CommonStyle from '../CommonStyle'
import HoverableListItemPanel from '../HoverableListItemPanel'
import Text from '../Text'

const cstyle = CommonStyle()
const path = location.pathname

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


    // additions for nyc code
    // create a path variable for scalability of future cities

    const pathRe = /[a-z]+/g
    const parsedPath = pathRe.exec(path)

    let billUrl = parsedPath ? `/${parsedPath[0]}/${bill.date}/${bill.id}` : `legislation/${bill.uid}`

    // end additions

    if (bill.introduced) {
      billUrl = `/legislation/${bill.bill_uid}`
    }

    // ternary added for future city additions, and absence of votes property

    !bill.votes ? bill.votes = { nay: 0, yea: 0 } : null
    let yea = bill.votes.yea
    let nay = bill.votes.nay

    // end additions

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
          <View style={{ paddingHorizontal: '1rem', paddingVertical: '0.5rem' }}>
            <Text>{bill.title}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: '.5rem' }}>
              <View style={{ flexDirection: 'row', flexGrow: 1, flexWrap: 'wrap', justifyContent: 'flex-start', maxWidth: '100%' }}>
                <Text style={metaStyle}>{(bill.chamber || '').toUpperCase()}</Text>
                <Text style={metaStyle}>#{bill.itemNumber}</Text>
                <Text style={metaStyle}>Introduced {dateFormat(bill.date, 'yyyy-mm-dd')}</Text>
                <Text style={metaStyle}>Last action {dateFormat(bill.last_action_date || bill.updated || bill.date, 'ddd, mmm dS')}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text style={metaStyle}>Yea: {bill.votes.yea}</Text>
                <Text style={{ ...metaStyle, marginRight: 0 }}>Nay: {bill.votes.nay}</Text>
              </View>
            </View>

          </View>

          { /* Vote count indicator */ }
          { Number(yea || 0) + Number(nay || 0) > 0 && (
            <View style={{
              alignItems: 'center',
              flex: 1,
              flexDirection: 'row',
              marginLeft: -2,
              opacity: 0.4,
            }}
            >
              <View style={{ backgroundColor: '#2ca02c', flex: yea, height: 2 }} />
              <View style={{ backgroundColor: '#d62728', flex: nay, height: 2 }} />
            </View>
          ) }
        </View>
      </HoverableListItemPanel>
    )
  }
}

BillsListItem.propTypes = {
  agendaVotes: PropTypes.shape(),
  bill: PropTypes.shape().isRequired,
  history: PropTypes.shape({}).isRequired,
}

export default BillsListItem
