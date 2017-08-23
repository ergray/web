import React, { Component } from 'react'
import {
  ScrollView,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import Text from '../Text'

class YourRegistrationScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      registrationInfo: {},
    }

    if (props.sessionId) {
      this.getInfo(props)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.sessionId && nextProps.sessionId) {
      this.getInfo(nextProps)
    }
  }

  getInfo(props) {
    fetch(`${API_URL_V1}/my-registration-info`, { headers: { Session_ID: props.sessionId } })
      .then(response => response.json())
      .then((registrationInfo) => {
        props.dispatch({ sf_district: registrationInfo.sf_district, type: 'UPDATE_SF_DISTRICT' })

        // Have they not completed registration yet?
        if (registrationInfo.verification_status === undefined) {
          props.history.replace('/registration')
          return
        }

        this.setState({ registrationInfo })

        // Do we need to update isVerified?
        if (!props.isVerified && registrationInfo.verification_status === 'verified') {
          props.dispatch({ type: 'SET_IS_VERIFIED' })
        }
      })
  }

  render() {
    const {
      first_name, last_name,
      address, zip, sf_district,
      email, phone,
      photo_id_status,
      verification_status,
    } = this.state.registrationInfo

    function prettifyPhone(tenDigits) {
      if (!tenDigits) { return '' }

      const areaCode = tenDigits.slice(0, 3)
      const middle3 = tenDigits.slice(3, 6)
      const final4 = tenDigits.slice(6)

      return `(${areaCode}) ${middle3}-${final4}`
    }

    const header = { fontSize: 14, fontWeight: 'bold', marginBottom: 10, marginTop: 30, textAlign: 'center' }
    const normal = { fontSize: 18 }
    const label = { fontSize: 14, fontWeight: 'bold' }

    const verificationBorderColor = {
      invalid: 'red',
      outside_sf: '#666',
      submitted: '#666',
      undefined: 'red',
      verified: 'green',
    }[verification_status]

    return (
      <View style={{ alignSelf: 'center', flex: 1, marginHorizontal: 20, width: 400 }}>

        { !this.state.registrationInfo.first_name
          ? <Text style={{ ...normal, marginTop: 10 }}>Loading...</Text> :

          <ScrollView style={{ flex: 1, paddingTop: 10 }}>
            <View style={{ borderColor: verificationBorderColor, borderRadius: 3, borderWidth: 1, padding: 10 }}>
              <Text style={{ ...header, marginTop: 0 }}>VERIFICATION STATUS</Text>
              <Text style={{ ...normal, textAlign: 'center' }}>{{
                invalid: '✗ There\'s a problem with your verification.',
                outside_sf: '✗ You\'re not a legal voter in San Francisco.',
                submitted: 'Your verification is pending review.',
                undefined: '✗ Unknown.',
                verified: '✓ You have been verified.',
              }[verification_status]}</Text>
            </View>

            <Text style={header}>THE BASICS</Text>
            <Text style={normal}><Text style={label}>FIRST NAME:</Text> {first_name}</Text>
            <Text style={normal}><Text style={label}>LAST NAME:</Text> {last_name}</Text>

            <Text style={header}>JURISDICTION</Text>
            <Text style={normal}><Text style={label}>SF DISTRICT:</Text> {sf_district || ''}</Text>
            <Text style={normal}><Text style={label}>ADDRESS:</Text> {address}</Text>
            <Text style={normal}><Text style={label}>ZIP:</Text> {zip}</Text>

            <Text style={header}>CONTACT INFO</Text>
            <Text style={normal}><Text style={label}>EMAIL:</Text> {email}</Text>
            <Text style={normal}><Text style={label}>PHONE:</Text> {prettifyPhone(phone)}</Text>

            <Text style={header}>LEGAL ID</Text>
            <Text style={normal}>{{
              invalid: '✗ There\'s a problem with your photo ID.',
              submitted: 'Your photo ID was submitted, but not verified yet.',
              undefined: '✗ You have not submitted a photo ID.',
              verified: '✓ Your photo ID has been verified.',
            }[photo_id_status]}</Text>
          </ScrollView>

        }

      </View>
    )
  }
}

YourRegistrationScreen.title = 'REGISTRATION'

YourRegistrationScreen.propTypes = {
  dispatch: React.PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  history: React.PropTypes.shape({ // eslint-disable-line react/no-unused-prop-types
    replace: React.PropTypes.func.isRequired,
  }),
  isVerified: React.PropTypes.bool.isRequired, // eslint-disable-line react/no-unused-prop-types
  sessionId: React.PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  isVerified: state.isVerified,
  sessionId: state.sessionId,
})

export default connect(mapStateToProps)(YourRegistrationScreen)
