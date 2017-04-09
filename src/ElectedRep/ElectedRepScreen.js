import React, { Component } from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import letterGrade from 'letter-grade'
import reps from './current-reps'

class ElectedRepScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const district = this.props.user.sf_district
    const rep = reps[district]

    return (
      <View style={{ flex: 1, marginTop: 10 }}>

        <View
          style={{
            alignSelf: 'center',
            borderColor: '#fff',
            borderLeftWidth: 0,
            borderWidth: 1,
            flexDirection: 'row',
            marginBottom: 20,
            width: 190,
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

        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            alignItems: 'center',
            borderColor: '#05A5D1',
            borderRadius: 5,
            borderWidth: 1,
            height: 38,
            justifyContent: 'center',
            marginHorizontal: 30,
            marginTop: 30,
          }}
          onPress={() => {}}
        >
          <Text style={{ color: '#fff', fontSize: 13 }}>
            CALL OFFICE: &nbsp; {rep.officePhone}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            alignItems: 'center',
            borderColor: '#05A5D1',
            borderRadius: 5,
            borderWidth: 1,
            height: 38,
            justifyContent: 'center',
            marginHorizontal: 30,
            marginTop: 10,
          }}
          onPress={() => {}}
        >
          <Text style={{ color: '#fff', fontSize: 13 }}>
            EMAIL: &nbsp; {rep.name.split(' ').join('.')}@sfgov.org
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            alignItems: 'center',
            borderColor: '#5DA0FF',
            borderRadius: 5,
            borderWidth: 1,
            height: 38,
            justifyContent: 'center',
            marginHorizontal: 30,
            marginTop: 30,
          }}
          onPress={() => this.props.navigator.push({ name: 'AllElectedRepsScreen' })}
        >
          <Text style={{ color: '#fff', fontSize: 13 }}>
            VIEW ALL ELECTED REPS
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

ElectedRepScreen.title = 'ELECTED REP'

ElectedRepScreen.propTypes = {
  navigator: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
  user: React.PropTypes.shape({
    sf_district: React.PropTypes.number.isRequired,
  }),
}

const mapStateToProps = state => ({ user: state.user })

export default connect(mapStateToProps)(ElectedRepScreen)
