import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import ForwardIcon from 'react-icons/lib/md/chevron-right'
import CommonStyle from '../CommonStyle'
import Text from '../Text'
import HoverableListItemPanel from '../HoverableListItemPanel'
import { convertDateToLongFormat, hasDatePassed } from './convert-dates'

const cstyle = CommonStyle()

class PastAgendas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dates: null,
    }
    console.log('here is location from past agendas: ', location)
    if (location.pathname === '/sf'){
      fetch(`${API_URL_V1}/dates`)
        .then(response => response.json())
        .then((dates) => {
          this.setState({ dates: dates.filter(hasDatePassed) })
          console.log('sf state: ', this.state)
        })   
    } else if (location.pathname === '/nyc'){
      //fetch does not current do anything other than allow
      //synchronous setstate to work.
      //in the future this fetch should point to an api
      //with available dates
      fetch('https://infinite-brushlands-18740.herokuapp.com/bills')
      .then(response => {
        //placeholder hard coded date, in the future
        //this will be an array of dates pulled from above fetch
        this.setState({dates: ['2017-09-07']})
      })
    console.log('nyc state: ', this.state)
    }
  }
  render() {
    const { dates } = this.state

    if (!dates) {
      return (
        <Text style={{
          fontSize: 18,
          fontWeight: '300',
          margin: 30,
        }}
        >Loading...</Text>
      )
    }

    return (
      <View style={{ margin: 30 }}>
        { dates.map(date => (
          <HoverableListItemPanel
            key={date}
            style={{ padding: '1rem' }}
            //this needs to be fixed to allow for nyc
            onPress={() => this.props.history.push(`/sf/${date}`, { backable: true })}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ flexGrow: 1, fontWeight: '500' }}>{ convertDateToLongFormat(date) }</Text>
              <ForwardIcon color={cstyle.bodyColorLowlight} size={20} />
            </View>
          </HoverableListItemPanel>
        )) }

      </View>
    )
  }
}

PastAgendas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default PastAgendas
