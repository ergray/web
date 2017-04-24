import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import TrumpApprovalHeader from './TrumpApprovalHeader'
const pick = require('lodash/fp/pick')

class TrumpApprovalScreen extends Component {

  constructor(props) {
    super(props)

    fetch('https://api.liquid.vote/my-potus-approval', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Session_ID: props.sessionId,
      },
      method: 'GET',
    })
    .then(response => response.json())
    .then((response) => {
      props.dispatch({ approve: response.approve, type: 'SET_POTUS_APPROVAL' })
    })
  }

  render() {
    const { dispatch, potusApproval, sessionId } = this.props
    return (
      <View style={{ marginHorizontal: 30, paddingTop: 30 }}>

        <Text style={{ color: '#fff', fontSize: 16 }}>Do you approve of President Donald Trump today?</Text>

        <TouchableOpacity
          style={{
            alignItems: 'center',
            backgroundColor: potusApproval === true ? 'rgba(0, 255, 0, 0.1)' : null,
            borderColor: 'green',
            borderRadius: 3,
            borderWidth: 1,
            flexDirection: 'row',
            height: 90,
            marginHorizontal: 30,
            marginTop: 60,
            paddingLeft: 20,
          }}
          onPress={() => {
            fetch('https://api.liquid.vote/potus-approval', {
              body: JSON.stringify({
                approve: true,
              }),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Session_ID: sessionId,
              },
              method: 'POST',
            })
            .then(response => response.json())
            .then(response => dispatch({ approve: response.updated_approve, type: 'SET_POTUS_APPROVAL' }))
          }}
        >
          <MaterialIcons color="green" name="thumb-up" size={36} />
          <View style={{ marginLeft: 15 }}>
            <Text style={{ color: '#fff', fontSize: 15 }}>
              I approve of
            </Text>
            <Text style={{ color: '#fff', fontSize: 15 }}>
              President Trump today.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignItems: 'center',
            backgroundColor: potusApproval === false ? 'rgba(255, 0, 0, 0.1)' : null,
            borderColor: 'darkred',
            borderRadius: 3,
            borderWidth: 1,
            flexDirection: 'row',
            height: 90,
            marginHorizontal: 30,
            marginTop: 60,
            paddingLeft: 20,
          }}
          onPress={() => {
            fetch('https://api.liquid.vote/potus-approval', {
              body: JSON.stringify({
                approve: false,
              }),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Session_ID: sessionId,
              },
              method: 'POST',
            })
            .then(response => response.json())
            .then(response => dispatch({ approve: response.updated_approve, type: 'SET_POTUS_APPROVAL' }))
          }}
        >
          <MaterialIcons color="darkred" name="thumb-down" size={36} />
          <View style={{ marginLeft: 15 }}>
            <Text style={{ color: '#fff', fontSize: 15 }}>
              I disapprove of
            </Text>
            <Text style={{ color: '#fff', fontSize: 15 }}>
              President Trump today.
            </Text>
          </View>
        </TouchableOpacity>

      </View>
    )
  }
}

TrumpApprovalScreen.header = TrumpApprovalHeader

TrumpApprovalScreen.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  potusApproval: React.PropTypes.bool,
  sessionId: React.PropTypes.string.isRequired,
}

export default connect(pick([
  'potusApproval',
  'sessionId',
]))(TrumpApprovalScreen)
