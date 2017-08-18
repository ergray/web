import React, { Component } from 'react'
import {
  Image,
  Linking,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import letterGrade from 'letter-grade'
import Button from '../Button'
import Text from '../Text'
import reps from './current-reps'

class ElectedRepScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    if (!this.props.user || !this.props.user.sf_district) {
      return (
        <View style={{ alignItems: 'center', margin: 30 }}>
          <Text style={{ fontSize: 18 }}>Unknown voting district.</Text>

          <Button
            style={{ margin: 30 }}
            onPress={() => this.props.history.push('/sf/board', { backable: true })}
          >
            View all elected reps
          </Button>
        </View>
      )
    }

    const district = this.props.user.sf_district
    const rep = reps[district]

    return (
      <View style={{ alignSelf: 'center', flex: 1, marginTop: 20 }}>

        <View
          style={{
            alignSelf: 'center',
            borderColor: '#fff',
            borderLeftWidth: 0,
            borderWidth: 1,
            flexDirection: 'row',
            marginBottom: 20,
          }}
        >
          <Image
            source={rep.photo}
            style={{ height: 80, width: 70 }}
          />
          <View style={{ alignItems: 'center', alignSelf: 'center', width: 120 }}>
            <Text
              style={{
                fontSize: 17,
                marginBottom: 3,
              }}
            >{rep.name.toUpperCase()}</Text>
            <Text
              style={{
                fontSize: 28,
                fontWeight: '700',
              }}
            >{letterGrade(rep.score)}</Text>
          </View>
        </View>

        <Text
          style={{
            alignSelf: 'center',
            fontSize: 15,
            fontStyle: 'italic',
            fontWeight: '300',
            marginHorizontal: 30,
          }}
        >San Francisco District {district} Supervisor</Text>

        <Text
          style={{
            fontSize: 18,
            fontWeight: '300',
            marginHorizontal: 30,
            marginTop: 20,
          }}
        >Representative {rep.name} votes with {rep.pronoun} constituents
        <Text style={{ fontWeight: '700' }}> {rep.score}% </Text>
        of the time.</Text>

        <Button
          style={{ marginHorizontal: 30, marginTop: 30 }}
          onPress={() => {
            Linking.openURL(`tel:${rep.officePhone.replace(/\D/g, '')}`)
            .catch(() => {})
          }}
        >
          Call Office: &nbsp; {rep.officePhone}
        </Button>

        <Button
          style={{ marginHorizontal: 30, marginTop: 30 }}
          onPress={() => {
            Linking.openURL(`mailto:${rep.name.split(' ').join('.')}@sfgov.org`)
            .catch(() => {})
          }}
        >
          Email: &nbsp; {rep.name.split(' ').join('.')}@sfgov.org
        </Button>

        <Button
          style={{ margin: 30 }}
          onPress={() => this.props.history.push('/sf/board', { backable: true })}
        >
          View all elected reps
        </Button>
      </View>
    )
  }
}

ElectedRepScreen.title = 'Elected Rep'

ElectedRepScreen.propTypes = {
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
  user: React.PropTypes.shape({
    sf_district: React.PropTypes.number,
  }),
}

const mapStateToProps = state => ({ user: state.user })

export default connect(mapStateToProps)(ElectedRepScreen)
