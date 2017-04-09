import React, { Component } from 'react'
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { connect } from 'react-redux'

function prettifyPhone(tenDigits) {
  const areaCode = tenDigits.slice(0, 3)
  const middle3 = tenDigits.slice(3, 6)
  const final4 = tenDigits.slice(6)

  return `(${areaCode}) ${middle3}-${final4}`
}

class DelegateInfoScreen extends Component {
  constructor(props) {
    super(props)

    const activeDelegate = props.delegates[props.route.rowIndex]

    // Get delegate info from the server
    fetch(`https://api.liquid.vote/delegate/${activeDelegate.phone}`, { headers: { Session_ID: props.sessionId } })
    .then(response => response.json())
    .then(({ name, status, user_id }) => {
      props.dispatch({ name, rowIndex: props.route.rowIndex, status, type: 'UPDATE_DELEGATE_INFO', user_id })
    })
  }

  render() {
    const { delegates, dispatch, route, sessionId } = this.props

    const activeDelegate = delegates[route.rowIndex]

    const statusCodesResponses = {

      APPROVAL_NEEDED: {
        button: {
          onPress() {
            fetch(`https://api.liquid.vote/delegate/${activeDelegate.phone}/request`, {
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

    return (
      <View style={{ marginHorizontal: 30, paddingTop: 20 }}>

        <Text style={{ color: 'white', fontSize: 24, marginBottom: 5 }}>{activeDelegate.name}</Text>

        { (activeDelegate.nickname
          && activeDelegate.nickname !== activeDelegate.name) && (

            <Text style={{ color: 'white', marginBottom: 15 }}>
              Nickname: {activeDelegate.nickname}
            </Text>
        )}

        <Text style={{ color: 'white' }}>{prettifyPhone(activeDelegate.phone)}</Text>

        <View style={{ height: 40 }} />

        <Text style={{ color: 'white', marginVertical: 15 }}>Status: <Text style={{ fontWeight: '700' }}>{statusCodeResponse.text}</Text></Text>

        { statusCodeResponse.description && (
          <Text style={{ color: 'white' }}>{statusCodeResponse.description}</Text>
        )}
        { statusCodeResponse.button && (
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              alignItems: 'center',
              borderColor: '#05A5D1',
              borderRadius: 5,
              borderWidth: 1,
              height: 38,
              justifyContent: 'center',
              marginVertical: 30,
            }}
            onPress={statusCodeResponse.button.onPress}
          >
            <Text style={{ color: '#fff', fontSize: 13 }}>
              {statusCodeResponse.button.text}
            </Text>
          </TouchableOpacity>
        )}
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
