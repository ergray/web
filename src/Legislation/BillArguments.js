import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import { connect } from 'react-redux'
import CommonStyle from '../CommonStyle'
import HoverableOpacity from '../HoverableOpacity'
import Text from '../Text'
const pick = require('lodash/fp/pick')

const cstyle = CommonStyle()

class BillArguments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      nay: [],
      yea: [],
    }

    fetch(`${API_URL_V1}/bill/${props.activeBill}/arguments`, { headers: { Session_ID: props.sessionId } })
      .then(response => response.json())
      .then(({ nay, yea }) => this.setState({
        loading: false,
        nay,
        yea,
      }))
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <Text>Loading...</Text>
        </View>
      )
    }

    // Stores position as closure, returns a functions to map across
    const Argument = position => (
      ({ id, recommended, recommendations, text }) => (
        <View
          key={id}
          style={{
            backgroundColor: cstyle.panelColor,
            borderBottomColor: cstyle.panelBorderColor,
            borderBottomWidth: 2,
            borderRadius: 5,
            borderRightColor: cstyle.panelBorderColor,
            borderRightWidth: 1,
            marginBottom: 30,
            overflow: 'hidden',
            paddingHorizontal: '1rem',
            paddingVertical: '.5rem',
          }}
        >
          <Text>
            {text}
          </Text>

          <HoverableOpacity
            activeOpacity={0.5}
            hoverStyle={{ backgroundColor: 'hsla(0,0%,0%,0.1)' }}
            outerStyle={{ alignSelf: 'flex-end', marginTop: 5 }}
            style={{ padding: 5 }}
            onPress={() => {
              fetch(`${API_URL_V1}/argument/${id}/recommendations`, {
                headers: { Session_ID: this.props.sessionId },
                method: 'PUT',
              })

              // Optimistically update this arguments recommendation count
              this.setState({
                [position]: [...this.state[position]].map((arg) => {
                  if (arg.id !== id) {
                    return arg
                  }

                  // Add 1 if turning true, subtract 1 if turning false
                  let newNumRecommendations = arg.recommendations - 1
                  newNumRecommendations += (Number(!arg.recommended) * 2)
                  return { ...arg,
                    recommendations: newNumRecommendations,
                    recommended: !arg.recommended,
                  }
                }),
              })
            }}
          >
            <Text style={{
              color: '#5DA0FF',
              fontSize: 11,
            }}
            >
              {recommended ? 'RECOMMENDED' : 'RECOMMEND'} ({recommendations})
            </Text>
          </HoverableOpacity>
        </View>
      )
    )

    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>

        <View
          style={{
            flex: 1,
            flexBasis: '100%',
            padding: 20,
          }}
        >
          <Text style={{ fontSize: 13, fontWeight: '700', marginBottom: 20, textAlign: 'center', textTransform: 'uppercase' }}>For</Text>
          { this.state.yea.length > 0
            ? this.state.yea.map(Argument('yea'))
            : <Text style={{ color: '#bbb' }}>None given yet.</Text>
          }
        </View>

        <View style={{ backgroundColor: cstyle.panelBorderColor, width: 1 }} />

        <View
          style={{
            flex: 1,
            flexBasis: '100%',
            padding: 20,
          }}
        >
          <Text style={{ fontSize: 13, fontWeight: '700', marginBottom: 20, textAlign: 'center', textTransform: 'uppercase' }}>Against</Text>
          { this.state.nay.length > 0
            ? this.state.nay.map(Argument('nay'))
            : <Text style={{ color: '#bbb' }}>None given yet.</Text>
          }
        </View>

      </View>
    )
  }
}

BillArguments.propTypes = {
  activeBill: PropTypes.string.isRequired,
  sessionId: PropTypes.string,
}

export default connect(pick([
  'sessionId',
]))(BillArguments)
