import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import { connect } from 'react-redux'
import HoverableOpacity from '../HoverableOpacity'
import Text from '../Text'

function prettifyPhone(tenDigits) {
  const areaCode = tenDigits.slice(0, 3)
  const middle3 = tenDigits.slice(3, 6)
  const final4 = tenDigits.slice(6)

  return `(${areaCode}) ${middle3}-${final4}`
}

class DelegateInfoScreen extends Component {
  constructor(props) {
    super(props)

    if (props.sessionId && props.delegates) {
      this.getInfo(props)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sessionId && nextProps.delegates) {
      this.getInfo(nextProps)
    }
  }

  getInfo(props) {
    const rowIndex = props.delegates.findIndex(d => d.phone === props.match.params.phoneNumber)
    const activeDelegate = props.delegates[rowIndex]

    if (activeDelegate) {
      // Get delegate info from the server
      fetch(`${API_URL_V1}/delegate/${activeDelegate.phone}`, { headers: { Session_ID: props.sessionId } })
        .then(response => response.json())
        .then(({ name, status, user_id }) => {
          this.props.dispatch({ name, rowIndex, status, type: 'UPDATE_DELEGATE_INFO', user_id })
        })
    }
  }

  render() {
    const { delegates, dispatch, history, match, route, sessionId } = this.props

    const rowIndex = delegates.findIndex(d => d.phone === match.params.phoneNumber)

    const activeDelegate = delegates[rowIndex]

    if (!activeDelegate) {
      return (
        <Text style={{ margin: 30 }}>Not a delegate</Text>
      )
    }

    const statusCodesResponses = {

      APPROVAL_NEEDED: {
        button: {
          onPress() {
            fetch(`${API_URL_V1}/delegate/${activeDelegate.phone}/request`, {
              headers: {
                Session_ID: sessionId,
              },
              method: 'POST',
            })
              .then((response) => {
                if (response.status === 201) {
                  dispatch({ routeIndex: route.rowIndex, status: 'APPROVAL_REQUESTED', type: 'UPDATE_DELEGATE_INFO' })
                }
              })
          },
          text: 'REQUEST APPROVAL',
        },
        description: 'You need their permission to view their votes before you can delegate to them. ',
        text: 'Needs approval',
      },

      APPROVAL_REQUESTED: {
        button: {
          onPress() {},
          text: 'APPROVAL ALREADY REQUESTED',
        },
        description: 'You need their permission to view their votes before you can delegate to them. ',
        text: 'Approval pending',
      },

      APPROVED: {
        text: 'Active',
      },

      INCOMPLETE_REGISTRATION: {
        description: 'This person\'s Voter Registration hasn\'t been verified yet.',
        text: 'Incomplete registration',
      },

      undefined: {
        text: 'Loading...',
      },

      UNKNOWN_NUMBER: {
        button: {
          onPress() {},
          text: 'INVITE',
        },
        description: 'This number hasn\'t joined the Liquid network yet, would you like to invite them?',
        text: 'Unknown number',
      },

      WRONG_JURISDICTION: {
        description: 'This person cannot be delegated to because they are registered in a different jurisdiction from you.\n\nJust as with elected representatives, delegates must be in the same voting district as you.',
        text: 'Not in jurisdiction',
      },
    }

    const statusCodeResponse = statusCodesResponses[activeDelegate.status]

    const nameMatchesPhone = activeDelegate.name === activeDelegate.phone

    return (
      <View style={{ margin: 30 }}>

        { /* Name */ }
        { !nameMatchesPhone &&
          <Text style={{ fontSize: 24, marginBottom: 5 }}>{activeDelegate.name}</Text>
        }

        { /* Show nickname if there is one */ }
        { (activeDelegate.nickname
          && activeDelegate.nickname !== activeDelegate.name) && (

            <Text style={{ marginBottom: 15 }}>
              Nickname: {activeDelegate.nickname}
            </Text>
          )}

        { /* Phone number */ }
        <Text style={{
          fontSize: nameMatchesPhone ? 24 : undefined,
        }}
        >{prettifyPhone(activeDelegate.phone)}</Text>

        <View style={{ height: 40 }} />

        { /* Delegation status */ }
        <Text style={{ marginVertical: 15 }}>Status: <Text style={{ fontWeight: '700' }}>{statusCodeResponse.text}</Text></Text>

        { /* Delegation status description */ }
        { statusCodeResponse.description && (
          <Text>{statusCodeResponse.description}</Text>
        )}

        { /* Delegation status action button, if there is one */ }
        { statusCodeResponse.button && (
          <HoverableOpacity
            activeOpacity={0.5}
            hoverStyle={{ backgroundColor: 'rgba(5, 165, 290, 0.1)' }}
            outerStyle={{
              borderColor: 'rgb(5, 165, 290)',
              borderRadius: 5,
              borderWidth: 1,
              marginTop: 30,
            }}
            style={{
              alignItems: 'center',
              height: 38,
              justifyContent: 'center',
            }}
            onPress={statusCodeResponse.button.onPress}
          >
            <Text style={{ fontSize: 13 }}>
              {statusCodeResponse.button.text}
            </Text>
          </HoverableOpacity>
        )}

        { /* REMOVE DELEGATE button */ }
        <HoverableOpacity
          activeOpacity={0.5}
          hoverStyle={{ backgroundColor: 'rgba(251, 82, 82, 0.1)' }}
          outerStyle={{
            borderColor: 'darkred',
            borderRadius: 5,
            borderWidth: 1,
            marginVertical: 30,
          }}
          style={{
            alignItems: 'center',
            height: 38,
            justifyContent: 'center',
          }}
          onPress={() => {
            const updatedDelegates = [...this.props.delegates] // clone delegate list
            updatedDelegates.splice(rowIndex, 1) // remove one at the right index

            fetch(`${API_URL_V1}/my-delegates`, {
              body: JSON.stringify({
                delegates: updatedDelegates,
              }),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Session_ID: sessionId,
              },
              method: 'PUT',
            })
              .then(() => {
                this.props.dispatch({ delegates: updatedDelegates, type: 'SYNC_DELEGATES' })
                history.replace('/delegates')
              })
          }}
        >
          <Text style={{ fontSize: 13 }}>
            REMOVE
          </Text>
        </HoverableOpacity>

      </View>
    )
  }
}

DelegateInfoScreen.title = 'DELEGATE INFO'

DelegateInfoScreen.propTypes = {
  delegates: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string,
  })),
  dispatch: React.PropTypes.func.isRequired,
  history: React.PropTypes.shape({}),
  match: React.PropTypes.shape({
    params: React.PropTypes.shape({
      phoneNumber: React.PropTypes.string,
    }).isRequired,
  }).isRequired,
  route: React.PropTypes.shape({
    rowIndex: React.PropTypes.number.isRequired,
  }),
  sessionId: React.PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  delegates: state.delegates,
  sessionId: state.sessionId,
})

export default connect(mapStateToProps)(DelegateInfoScreen)
