import React, { Component } from 'react'
import {
  Alert,
  Image,
  ListView,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import FoundationIcon from 'react-native-vector-icons/Foundation'
import IoniconsIcon from 'react-native-vector-icons/Ionicons'
import deepEqual from 'deep-equal'
import HeaderWithEditButton from './HeaderWithEditButton'
import arrow from './arrow.png'

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
    const { navigator, delegatesEditMode } = this.props
    let { delegates } = this.props

    if (delegates === undefined) {
      delegates = [{ name: 'Loading...' }]
    }

    function P(props) {
      return <Text style={{ color: '#fff', fontSize: 15 }}> {props.children}</Text>
    }

    return (
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <View style={{ height: 80, paddingTop: 20 }}>
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

        { delegates.length === 0 ?
          (
            <View>
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#fff',
                  marginTop: 60,
                }}
              >...You have no delegates, add your first one:</Text>
              <Image
                source={arrow}
                style={{
                  alignSelf: 'center',
                  height: 165,
                  marginLeft: 90,
                  marginVertical: 30,
                  width: 42,
                }}
              />

            </View>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: '#252525',
                borderBottomWidth: 1,
                borderColor: '#000',
                flexDirection: 'row',
                marginBottom: 30,
                paddingHorizontal: 20,
                paddingVertical: 15,
              }}
              onPress={() => navigator.push({ name: 'VotingPowerScreen' })}
            >
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: '200', width: 25 }}>
                0.
              </Text>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: '200' }}>
                You
              </Text>
            </TouchableOpacity>
          )
        }

        { !delegatesEditMode ?
          <ScrollView>
            { delegates.map(({ name, status }, rowIndex) => (
              <TouchableOpacity
                key={name}
                style={{
                  backgroundColor: '#333',
                  borderBottomWidth: 1,
                  borderColor: '#000',
                  flexDirection: 'row',
                  padding: 20,
                }}
                onLongPress={() => this.props.dispatch({ type: 'TOGGLE_DELEGATES_EDIT_MODE' })}
                onPress={() => { this.props.navigator.push({ name: 'DelegateInfoScreen', rowIndex }) }}
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
              </TouchableOpacity>
            ))}
          </ScrollView>

          :

          <ListView
            data={delegates}
            sortRowStyle={{ backgroundColor: '#fff', height: 61, opacity: 1 }}
            onRowMoved={event => ( // eslint-disable-line react/jsx-sort-props
              this.reorderDelegate(event.from, event.to))}
            renderRow={({ name, status }, ignore, index) =>
              <TouchableHighlight
                delayLongPress={100}
                style={{
                  backgroundColor: 'hsla(0, 0%, 23%, 0.85)',
                  borderBottomWidth: 1,
                  borderColor: '#000',
                  marginBottom: 8,
                  paddingLeft: 20,
                }}
                underlayColor="#333"
              >
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <FoundationIcon
                      color="white" name="list" size={15}
                      style={{ paddingTop: 4, width: 25 }}
                    />
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: '200' }}>
                      {name}

                      { (status && status !== 'APPROVED') &&
                        <Text style={{ color: '#d62728' }}> &nbsp;( ! )</Text>
                      }
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{ alignItems: 'center', paddingVertical: 13, width: 50 }}
                    onPress={() => Alert.alert(
                      `Remove ${name.split(' ')[0]}`,
                      'Are you sure?',
                      [
                        { onPress: () => {}, text: 'Cancel' },
                        {
                          onPress: () => {
                            if (delegates.length === 1) {
                              this.props.dispatch({ type: 'TOGGLE_DELEGATES_EDIT_MODE' })
                            }
                            this.removeDelegate(index)
                          },
                          text: 'OK' },
                      ],
                    )}
                  >
                    <IoniconsIcon color="darkred" name="md-remove-circle" size={32} />
                  </TouchableOpacity>
                </View>
              </TouchableHighlight>
            }
          />
        }

        <View style={{ marginBottom: 15 }}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              alignItems: 'center',
              borderColor: '#05A5D1',
              borderRadius: 5,
              borderWidth: 1,
              height: 38,
              justifyContent: 'center',
            }}
            onPress={() => {
              // Don't let them add delegates if they're not verified
              if (!this.props.isVerified) {
                Alert.alert(
                  'Unverified',
                  'Your registration must be verified before you can add delegates.',
                  [
                    { onPress: () => navigator.push({ name: 'YourRegistrationScreen' }),
                      text: 'More Info' },
                    { text: 'OK' },
                  ],
                )
              }
            }}
          >
            <Text style={{ color: '#fff', fontSize: 13 }}>
              ADD DELEGATE
            </Text>
          </TouchableOpacity>
        </View>

      </View>)
  }
}

DelegatesScreen.header = HeaderWithEditButton

DelegatesScreen.propTypes = {
  delegates: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string,
  })),
  delegatesEditMode: React.PropTypes.bool,
  dispatch: React.PropTypes.func.isRequired,
  isVerified: React.PropTypes.bool.isRequired,
  navigator: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
  sessionId: React.PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  delegates: state.delegates,
  delegatesEditMode: state.delegatesEditMode,
  isVerified: state.isVerified,
  sessionId: state.sessionId,
})

export default connect(mapStateToProps)(DelegatesScreen)
