import React, { Component } from 'react'
import {
  Image,
  Linking,
  Text,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import letterGrade from 'letter-grade'
import HoverableOpacity from '../HoverableOpacity'
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
          <Text style={{ color: '#fff', fontSize: 18 }}>Unknown voting district.</Text>

          <HoverableOpacity
            activeOpacity={0.5}
            hoverStyle={{ backgroundColor: 'hsla(215, 100%, 68%, 0.1)' }}
            outerStyle={{ margin: 30 }}
            style={{
              alignItems: 'center',
              borderColor: 'hsl(215, 100%, 68%)',
              borderRadius: 5,
              borderWidth: 1,
              height: 40,
              justifyContent: 'center',
              width: 250,
            }}
            onPress={() => this.props.history.push('/sf/board', { backable: true })}
          >
            <Text style={{ color: '#fff', fontSize: 13 }}>
              VIEW ALL ELECTED REPS
            </Text>
          </HoverableOpacity>
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
                color: '#fff',
                fontSize: 17,
                marginBottom: 3,
              }}
            >{rep.name.toUpperCase()}</Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 28,
                fontWeight: '700',
              }}
            >{letterGrade(rep.score)}</Text>
          </View>
        </View>

        <Text
          style={{
            alignSelf: 'center',
            color: '#fff',
            fontSize: 15,
            fontStyle: 'italic',
            fontWeight: '300',
            marginHorizontal: 30,
          }}
        >San Francisco District {district} Supervisor</Text>

        <Text
          style={{
            color: '#fff',
            fontSize: 18,
            fontWeight: '300',
            marginHorizontal: 30,
            marginTop: 20,
          }}
        >Representative {rep.name} votes with {rep.pronoun} constituents
        <Text style={{ fontWeight: '700' }}> {rep.score}% </Text>
        of the time.</Text>

        <HoverableOpacity
          activeOpacity={0.5}
          hoverStyle={{ backgroundColor: 'hsla(193, 95%, 42%, 0.1)' }}
          outerStyle={{ marginHorizontal: 30, marginTop: 30 }}
          style={{
            alignItems: 'center',
            borderColor: 'hsl(193, 95%, 42%)',
            borderRadius: 5,
            borderWidth: 1,
            height: 40,
            justifyContent: 'center',
          }}
          onPress={() => {
            Linking.openURL(`tel:${rep.officePhone.replace(/\D/g, '')}`)
            .catch(() => {})
          }}
        >
          <Text style={{ color: '#fff', fontSize: 13 }}>
            CALL OFFICE: &nbsp; {rep.officePhone}
          </Text>
        </HoverableOpacity>

        <HoverableOpacity
          activeOpacity={0.5}
          hoverStyle={{ backgroundColor: 'hsla(193, 95%, 42%, 0.1)' }}
          outerStyle={{ marginHorizontal: 30, marginTop: 30 }}
          style={{
            alignItems: 'center',
            borderColor: 'hsl(193, 95%, 42%)',
            borderRadius: 5,
            borderWidth: 1,
            height: 40,
            justifyContent: 'center',
          }}
          onPress={() => {
            Linking.openURL(`mailto:${rep.name.split(' ').join('.')}@sfgov.org`)
            .catch(() => {})
          }}
        >
          <Text style={{ color: '#fff', fontSize: 13 }}>
            EMAIL: &nbsp; {rep.name.split(' ').join('.')}@sfgov.org
          </Text>
        </HoverableOpacity>

        <HoverableOpacity
          activeOpacity={0.5}
          hoverStyle={{ backgroundColor: 'hsla(215, 100%, 68%, 0.1)' }}
          outerStyle={{ margin: 30 }}
          style={{
            alignItems: 'center',
            borderColor: 'hsl(215, 100%, 68%)',
            borderRadius: 5,
            borderWidth: 1,
            height: 40,
            justifyContent: 'center',
          }}
          onPress={() => this.props.history.push('/sf/board', { backable: true })}
        >
          <Text style={{ color: '#fff', fontSize: 13 }}>
            VIEW ALL ELECTED REPS
          </Text>
        </HoverableOpacity>
      </View>
    )
  }
}

ElectedRepScreen.title = 'ELECTED REP'

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
