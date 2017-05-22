import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import deepEqual from 'deep-equal'
import HoverableOpacity from '../HoverableOpacity'

class DelegatesScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidUpdate(prevProps) {
    // Sync delegation updates to the server for persistence
    // Check if there were prevProps (to skip first load) and if the delegate list changed
    if (prevProps.delegates && !deepEqual(prevProps.delegates, this.props.delegates)) {
      fetch('https://api.liquid.vote/my-delegates', {
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
      return <Text style={{ color: '#fff', fontSize: 15 }}> {props.children}</Text>
    }

    if (!this.props.sessionId) {
      return (
        <View style={{ margin: 30 }}>
          <P>You are not logged in. Press JOIN on the left.</P>
          <View style={{ height: 30 }} />
          <P>Then you can add personal delegates.</P>
        </View>
      )
    }

    return (
      <View style={{ flex: 1, marginHorizontal: 20 }}>

        <View style={{ flexDirection: 'row', marginVertical: 30 }}>
          { /* ADD NEW DELEGATE button */ }
          <HoverableOpacity
            activeOpacity={0.5}
            hoverStyle={{ backgroundColor: 'rgba(5, 165, 209,0.1)' }}
            outerStyle={{ flex: 1, marginRight: 30 }}
            style={{
              alignItems: 'center',
              borderColor: 'rgb(5, 165, 209)',
              borderRadius: 5,
              borderWidth: 1,
              height: 38,
              justifyContent: 'center',
            }}
            onPress={() => history.push('/delegates/add')}
          >
            <Text style={{ color: '#fff', fontFamily: 'HelveticaNeue, Helvetica', fontSize: 13 }}>
              ADD NEW DELEGATE
            </Text>
          </HoverableOpacity>

          { /* VIEW REQUESTS button */ }
          <HoverableOpacity
            activeOpacity={0.5}
            hoverStyle={{ backgroundColor: 'hsla(0,0%,100%,0.1)' }}
            outerStyle={{ flex: 1 }}
            style={{
              alignItems: 'center',
              borderColor: 'grey',
              borderRadius: 5,
              borderWidth: 1,
              height: 38,
              justifyContent: 'center',
            }}
            onPress={() => history.push('/delegates/requests')}
          >
            <Text style={{ color: '#fff', fontFamily: 'HelveticaNeue, Helvetica', fontSize: 13 }}>
              VIEW DELEGATE REQUESTS
            </Text>
          </HoverableOpacity>

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
            <HoverableOpacity
              hoverStyle={{ backgroundColor: 'hsla(0,0%,100%,0.2)' }}
              outerStyle={{ backgroundColor: '#252525', marginBottom: 30 }}
              style={{
                borderBottomWidth: 1,
                borderColor: '#000',
                flexDirection: 'row',
                paddingHorizontal: 20,
                paddingVertical: 15,
              }}
              onPress={() => history.push('/voting-power')}
            >
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: '200', width: 25 }}>
                0.
              </Text>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: '200' }}>
                You
              </Text>
            </HoverableOpacity>
          )
        }

        { /* Static list of delegates */ }
        <ScrollView>
          { delegates.map(({ name, status }, rowIndex) => (
            <HoverableOpacity
              hoverStyle={{ backgroundColor: 'hsla(0,0%,100%,0.2)' }}
              key={name}
              outerStyle={{ backgroundColor: '#333' }}
              style={{
                borderBottomWidth: 1,
                borderColor: '#000',
                flexDirection: 'row',
                padding: 20,
              }}
              onPress={() => { this.props.history.push(`/delegates/${delegates[rowIndex].phone}`, { rowIndex }) }}
            >
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: '200', width: 25 }}>
                {Number(rowIndex) + 1}.
              </Text>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: '200' }}>
                {name}

                { (status && status !== 'APPROVED') &&
                  <Text style={{ color: '#d62728' }}> &nbsp;( ! )</Text>
                }
              </Text>
            </HoverableOpacity>
          ))}
        </ScrollView>

      </View>)
  }
}

DelegatesScreen.title = 'DELEGATES'

DelegatesScreen.propTypes = {
  delegates: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string,
  })),
  delegatesEditMode: React.PropTypes.bool,
  dispatch: React.PropTypes.func.isRequired,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
  sessionId: React.PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  delegates: state.delegates,
  delegatesEditMode: state.delegatesEditMode,
  sessionId: state.sessionId,
})

export default connect(mapStateToProps)(DelegatesScreen)
