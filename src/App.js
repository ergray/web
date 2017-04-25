import React, { Component } from 'react'
import { AppState, View } from 'react-native'
import { compose, createStore } from 'redux'
import { Provider } from 'react-redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import localForage from 'localforage'
import devTools from 'remote-redux-devtools'
import _ from 'lodash'
import screens from './_screens'
import reducer, { initialState } from './_reducer'
import Header from './Header'
import ScreenWithMenu from './ScreenWithMenu'

const INITIAL_ROUTE = { name: 'LoginScreen' }

const store = createStore(reducer, initialState, compose(autoRehydrate(), devTools()))
// Store session info to device so it's not lost when closed
persistStore(store, { storage: localForage,
  whitelist: ['billSort', 'isVerified', 'knownNumbers', 'sessionId', 'user'],
})

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      appState: AppState.currentState,
      stack: [INITIAL_ROUTE],
    }
  }

  componentDidMount() {
    // Ping server to wake it up
    fetch('https://api.liquid.vote')
  }

  render() {
    const route = _.last(this.state.stack)
    const Screen = screens[route.name]

    const navigator = {
      pop: () => {
        const newStack = [...this.state.stack]
        newStack.pop()
        this.setState({
          stack: newStack,
        })
      },
      push: (newRoute) => {
        this.setState({
          stack: [...this.state.stack, newRoute],
        })
      },
      replace: (newRoute) => {
        const newStack = [...this.state.stack]
        newStack.pop(); newStack.push(newRoute)
        this.setState({
          stack: newStack,
        })
      },
      resetTo: (newRoute) => {
        this.setState({
          stack: [newRoute],
        })
      },
    }

    return (
      <Provider store={store}>
        { Screen.disableMenu ? (
          <View style={{ flex: 1, height: '100%', width: '100%' }}>
            <Header navigator={navigator} route={route} />
            <Screen navigator={navigator} route={route} />
          </View>
        ) : (
          <ScreenWithMenu Screen={Screen} navigator={navigator} route={route} />
        )}
      </Provider>
    )
  }
}
