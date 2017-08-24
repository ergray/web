import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  ScrollView,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import deepEqual from 'deep-equal'
import Button from '../Button'
import HoverableListItemPanel from '../HoverableListItemPanel'
import Text from '../Text'

class DelegatesScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidUpdate(prevProps) {
    // Sync delegation updates to the server for persistence
    // Check if there were prevProps (to skip first load) and if the delegate list changed
    if (prevProps.delegates && !deepEqual(prevProps.delegates, this.props.delegates)) {
      fetch(`${API_URL_V1}/my-delegates`, {
        body: JSON.stringify({
          delegates: this.props.delegates,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Session_ID: this.props.sessionId,
        },
        method: 'PUT',
      })
    }
  }

  reorderDelegate(from, to) {
    const updatedDelegates = [...this.props.delegates]
    updatedDelegates.splice(to, 0, updatedDelegates.splice(from, 1)[0])

    this.props.dispatch({ delegates: updatedDelegates, type: 'SYNC_DELEGATES' })
  }

  removeDelegate(index) {
    const updatedDelegates = [...this.props.delegates] // clone delegate list
    updatedDelegates.splice(index, 1) // remove one at the right index

    this.props.dispatch({ delegates: updatedDelegates, type: 'SYNC_DELEGATES' })
  }

  render() {
    const { history, delegatesEditMode } = this.props
    let { delegates } = this.props

    if (delegates === undefined) {
      delegates = [{ name: 'Loading...' }]
    }

    function P(props) {
      return <Text style={{ fontSize: 15 }}> {props.children}</Text>
    }

    if (!this.props.sessionId) {
      return (
        <View style={{ margin: '2rem' }}>
          <P>You are not logged in. Press JOIN above.</P>
          <View style={{ height: 30 }} />
          <P>Then you can add personal delegates.</P>
        </View>
      )
    }

    return (
      <View style={{ flex: 1, margin: '2rem' }}>

        <View style={{ flexDirection: 'row', marginBottom: 30 }}>
          { /* ADD NEW DELEGATE button */ }
          <Button
            backable
            primary
            history={history}
            style={{ flexGrow: 1, marginRight: 8 }}
            text="Add new delegate"
            to="/delegates/add"
          />

          { /* VIEW REQUESTS button */ }
          <Button
            backable
            secondary
            history={history}
            style={{ flexGrow: 1, marginLeft: 8 }}
            text="View delegate requests"
            to="/delegates/requests"
          />

        </View>

        { /* Instructions at top */ }
        <View style={{ height: 80 }}>
          { !delegatesEditMode ? (
            <P>
              Like elected reps, delegates are personal representatives who can vote for you.
            </P>
          )

            : (
              <P>
              Press and drag a name to reorder.
              </P>
            )
          }
        </View>

        { /* YOU row */ }
        { delegates.length > 0 &&
          (
            <HoverableListItemPanel
              outerStyle={{ marginBottom: '.1rem' }}
              style={{
                flexDirection: 'row',
                padding: '1rem',
              }}
              onPress={() => history.push('/voting-power')}
            >
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 18, fontWeight: '200', width: 25 }}>
                  0.
                </Text>
                <Text style={{ fontSize: 18, fontWeight: '200' }}>
                  You
                </Text>
              </View>
            </HoverableListItemPanel>
          )
        }

        { /* Static list of delegates */ }
        <ScrollView>
          { delegates.map(({ name, status }, rowIndex) => (
            <HoverableListItemPanel
              key={name}
              style={{
                flexDirection: 'row',
                padding: '1rem',
              }}
              onPress={() => { this.props.history.push(`/delegates/${delegates[rowIndex].phone}`, { rowIndex }) }}
            >
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 18, fontWeight: '200', width: 25 }}>
                  {Number(rowIndex) + 1}.
                </Text>
                <Text style={{ fontSize: 18, fontWeight: '200' }}>
                  {name}

                  { (status && status !== 'APPROVED') &&
                    <Text style={{ color: '#d62728' }}> &nbsp;( ! )</Text>
                  }
                </Text>
              </View>
            </HoverableListItemPanel>
          ))}
        </ScrollView>

      </View>)
  }
}

DelegatesScreen.title = 'Delegates'

DelegatesScreen.propTypes = {
  delegates: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })),
  delegatesEditMode: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  sessionId: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  delegates: state.delegates,
  delegatesEditMode: state.delegatesEditMode,
  sessionId: state.sessionId,
})

export default connect(mapStateToProps)(DelegatesScreen)
