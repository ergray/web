import React, { Component } from 'react'
import {
  Text,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import HoverableOpacity from '../HoverableOpacity'
const pick = require('lodash/fp/pick')

class BillArguments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      nay: [],
      yea: [],
    }

    fetch(`https://api.liquid.vote/bill/${props.activeBill}/arguments`, { headers: { Session_ID: props.sessionId } })
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
          <Text style={{ color: '#fff' }}>Loading...</Text>
        </View>
      )
    }

    // Stores position as closure, returns a functions to map across
    const Argument = position => (
      ({ id, recommended, recommendations, text }) => (
        <View
          key={id} style={{
            backgroundColor: '#222',
            borderRadius: 5,
            marginBottom: 30,
            overflow: 'hidden',
            padding: 10,
          }}
        >
          <Text style={{ color: 'white' }}>
            {text}
          </Text>

          <HoverableOpacity
            activeOpacity={0.5}
            hoverStyle={{ backgroundColor: 'hsla(0,0%,100%,0.1)' }}
            outerStyle={{ alignSelf: 'flex-end', marginTop: 5 }}
            style={{ padding: 5 }}
            onPress={() => {
              fetch(`https://api.liquid.vote/argument/${id}/recommendations`, {
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
          <Text style={{ color: '#fff', fontSize: 13, fontWeight: '700', marginBottom: 20, textAlign: 'center' }}>FOR</Text>
          { this.state.yea.length > 0
            ? this.state.yea.map(Argument('yea'))
            : <Text style={{ color: '#bbb' }}>None given yet.</Text>
          }
        </View>

        <View style={{ backgroundColor: '#303030', width: 1 }} />

        <View
          style={{
            flex: 1,
            flexBasis: '100%',
            padding: 20,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 13, fontWeight: '700', marginBottom: 20, textAlign: 'center' }}>AGAINST</Text>
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
  activeBill: React.PropTypes.string.isRequired,
  sessionId: React.PropTypes.string,
}

export default connect(pick([
  'sessionId',
]))(BillArguments)
