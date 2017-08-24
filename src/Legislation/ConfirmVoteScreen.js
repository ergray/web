import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import { connect } from 'react-redux'
import Button from 'Button'
import CommonStyle from 'CommonStyle'
import Header from 'Header'
import HoverableOpacity from 'HoverableOpacity'
import Text from 'Text'
import TextInput from 'TextInput'

const cstyle = CommonStyle()

class ConfirmVoteScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      argument: '',
      disabled: false,
    }

    if (!props.location.state || !props.location.state.bill) {
      return props.history.replace(props.location.pathname.slice(0, 21))
    }

    if (props.sessionId) {
      this.getVotingPower(props.sessionId)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.sessionId && nextProps.sessionId) {
      this.getVotingPower(nextProps.sessionId)
    }
  }

  getVotingPower(sessionId) {
    fetch(`${API_URL_V1}/bill/${this.props.location.state.bill.uid}/voting-power`, { headers: { Session_ID: sessionId } })
      .then(response => response.json())
      .then(({ voting_power }) => this.setState({ voting_power }))
  }

  render() {
    const {
      dispatch,
      history,
      location,
      match,
      sessionId,
    } = this.props
    const { position } = match.params

    // Guard against missing location field
    if (!location || !location.state) {
      return null
    }
    const { bill } = location.state

    const Position = (
      <Text style={{
        color: {
          abstain: cstyle.bodyColorLowlight,
          nay: '#d62728',
          yea: '#2ca02c',
        }[position],
        fontWeight: '800',
      }}
      >
        {position.toUpperCase()}
      </Text>
    )

    return (
      <View>

        <Header backable history={history} location={location} title={bill.title} />

        <Text style={{
          marginBottom: 5,
          marginHorizontal: 20,
          marginTop: 20,
        }}
        >
          Why are you voting {Position}?
        </Text>

        <TextInput
          multiline
          numberOfLines={7}
          placeholder="Because..."
          style={{
            alignSelf: 'stretch',
            backgroundColor: cstyle.panelColor,
            borderBottomColor: cstyle.panelBorderColor,
            borderBottomStyle: 'solid',
            borderBottomWidth: 1,
            borderLeftColor: cstyle.panelBorderHoverColor,
            borderLeftStyle: 'solid',
            borderLeftWidth: 1,
            borderRadius: 3,
            borderTopColor: cstyle.panelBorderHoverColor,
            borderTopStyle: 'solid',
            borderTopWidth: 1,
            fontSize: 16,
            marginHorizontal: 20,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
          value={this.state.argument}
          onChangeText={argument => this.setState({ argument })}
        />

        <View
          style={{
            margin: 20,
          }}
        >
          <Text style={{ fontWeight: '700' }}>
            Your voting power for this bill is: &nbsp;{ this.state.voting_power || '...Loading...' }
          </Text>
          { this.state.voting_power < this.props.votingPower &&
            <Text style={{ marginTop: 10 }}>
              This is less than your max voting power because some of your constituents have directly voted.
            </Text>
          }
          <HoverableOpacity
            hoverStyle={{ backgroundColor: 'hsla(0,0%,100%,0.1)' }}
            outerStyle={{ alignSelf: 'flex-start', marginTop: 10 }}
            onPress={() => history.push('/voting-power')}
          >
            <Text style={{ color: '#5DA0FF', textDecorationLine: 'underline' }}>
              Invite more people to increase your voting power.
            </Text>
          </HoverableOpacity>

          <Button
            primary
            outerStyle={{
              opacity: this.state.disabled ? 0.4 : 1,
            }}
            style={{ marginTop: '1rem' }}
            text={`SAV${this.state.disabled ? 'ING' : 'E'}`}
            onPress={() => {
              // Don't let them vote if they're not logged in
              if (!sessionId) {
                window.alert('You are not logged in. Press JOIN in the left menu to sign in.') // eslint-disable-line
                return
              }

              // Dont let them press this button multiple times
              if (this.state.disabled) {
                return
              }
              this.setState({ disabled: true })

              // Save the position to redux store
              dispatch({ bill, position, type: 'VOTE_ON_BILL' })

              // Save the position to the server
              fetch(`${API_URL_V1}/bill/${bill.uid}/vote`, {
                body: JSON.stringify({
                  argument: this.state.argument,
                  position,
                }),
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Session_ID: sessionId,
                },
                method: 'POST',
              })
                .then(() => history.goBack())
            }}
          />
        </View>

        <View style={{ flex: 1 }} />

      </View>
    )
  }
}

ConfirmVoteScreen.title = 'Confirm Vote'

ConfirmVoteScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    state: PropTypes.shape(),
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      bill_id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
    }),
  }),
  sessionId: PropTypes.string.isRequired,
  votingPower: PropTypes.number,
}

const mapStateToProps = state => ({
  sessionId: state.sessionId,
  votingPower: state.votingPower,
})

export default connect(mapStateToProps)(ConfirmVoteScreen)
