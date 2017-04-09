import React, { Component } from 'react'
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import _ from 'lodash'
import { connect } from 'react-redux'
import { convertDateToLongFormat } from './convert-dates'
import PastAgendas from './PastAgendas' // eslint-disable-line import/newline-after-import
const pick = require('lodash/fp/pick')

class BillsList extends Component {
  constructor(props) {
    super(props)

    const { date } = props.route
    if (!props.bills[date]) {
      fetch(`https://api.liquid.vote/bills/${date}`)
      .then(response => response.json())
      .then(bills => props.dispatch({ bills, date, type: 'SYNC_BILLS' }))
    }

    // If the user is verified, get their votes
    if (props.isVerified) {
      fetch(`https://api.liquid.vote/my-votes/${date}`, { headers: { Session_ID: props.sessionId } })
      .then(response => response.json())
      .then(votes => props.dispatch({ date, type: 'SYNC_VOTES', votes }))
    }
  }

  render() {
    const { bills, billSort, homescreen, navigator, route, votes } = this.props
    const { date } = route
    let agenda = bills[date]

    if (!agenda) {
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

    agenda = _.sortBy(agenda, 'itemNumber')

    const agendaVotes = votes[date] || {}
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

    if (billSort === 'mostVotes') {
      agenda = _.sortBy(agenda.reverse(), bill => bill.votes.yea + bill.votes.nay).reverse()
    }

    return (
      <ScrollView style={{ marginBottom: homescreen ? 37 : 0 }}>
        <View style={{
          alignItems: 'center',
          backgroundColor: '#111',
          borderColor: '#555',
          borderTopWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 30,
        }}
        >
          <Text style={{ color: '#ddd', fontWeight: 'bold' }}>
            {convertDateToLongFormat(date).toUpperCase()}
          </Text>
          <TouchableOpacity
            style={{ padding: 15 }}
            onPress={() => Alert.alert(
              'Sort order',
              'How would like to sort this agenda?',
              [
                {
                  onPress: () => {
                    this.props.dispatch({ order: 'itemNumber', type: 'SET_BILL_SORT' })
                  },
                  text: `Item number ${billSort === 'itemNumber' ? '(Current)' : ''}`,
                },
                {
                  onPress: () => {
                    this.props.dispatch({ order: 'mostVotes', type: 'SET_BILL_SORT' })
                  },
                  text: `Most votes ${billSort === 'mostVotes' ? '(Current)' : ''}`,
                },
              ],
            )}
          >
            <MaterialCommunityIcons color="#ddd" name="sort-alphabetical" size={22} />
          </TouchableOpacity>
        </View>

        { agenda.map((bill) => {
          const vote = agendaVotes[bill.uid]
          let position
          let isDelegated
          if (vote) {
            position = vote.position
            isDelegated = !!vote.delegate_id
          }
          return (
            <TouchableOpacity
              key={bill.uid} style={{
                borderColor: 'grey',
                borderTopWidth: 1,
                flexDirection: 'row',
                paddingHorizontal: 4,
                paddingVertical: 15,
              }}
              onPress={() => navigator.push({ bill, name: 'BillScreen' })}
            >
              <View style={{ width: 26 }}>
                <Text style={{
                  borderColor: '#888',
                  borderRadius: 12,
                  borderWidth: isDelegated ? 1 : 0,
                  color: positionColor[position],
                  fontSize: 16,
                  fontWeight: '800',
                  paddingTop: 2,
                  textAlign: 'center',
                  width: 23,
                }}
                >{ positionIcon[position] }</Text>
              </View>
              <View style={{ width: 850 }}>
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
                    opacity: 0.3,
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
            </TouchableOpacity>
          )
        })}

        { /* Bottom border for final item */ }
        <View style={{ backgroundColor: 'grey', height: 1 }} />

        { !!homescreen &&
          <PastAgendas navigator={navigator} />
        }
      </ScrollView>
    )
  }
}

BillsList.propTypes = {
  bills: React.PropTypes.shape(),
  billSort: React.PropTypes.string.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  homescreen: React.PropTypes.bool,
  isVerified: React.PropTypes.bool.isRequired,
  navigator: React.PropTypes.shape({}).isRequired,
  route: React.PropTypes.shape({
    date: React.PropTypes.string.isRequired,
  }).isRequired,
  sessionId: React.PropTypes.string.isRequired,
  votes: React.PropTypes.shape(),
}

export default connect(pick([
  'bills',
  'billSort',
  'isVerified',
  'sessionId',
  'votes',
]))(BillsList)
