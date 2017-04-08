import URL from 'url'
import React, { Component } from 'react'
import { AppState, AsyncStorage, Linking, Navigator, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { compose, createStore } from 'redux'
import { Provider } from 'react-redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import devTools from 'remote-redux-devtools'
import screens from './_screens'
import reducer, { initialState } from './_reducer'
import Header from './Header'
import NoTransition from './NoTransition'

const INITIAL_ROUTE = { name: 'LoginScreen' }

const store = createStore(reducer, initialState, compose(autoRehydrate(), devTools()))
// Store session info to device so it's not lost when closed
persistStore(store, { storage: AsyncStorage,
  whitelist: ['billSort', 'isVerified', 'sessionId', 'user'],
})

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      appState: AppState.currentState,
    }
  }

  componentDidMount() {
    // Ping server to wake it up
    fetch('https://api.liquid.vote')
    // And when app comes back from background
    AppState.addEventListener('change', (nextAppState) => {
      if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
        fetch('https://api.liquid.vote')
      }
      this.setState({ appState: nextAppState })
    })

    Linking.addEventListener('url', (event) => {
      if (event.url) {
        const parsedUrl = URL.parse(event.url, true)

        if (parsedUrl.path.slice(1, 5) === 'bill') {
          const bill_uid = parsedUrl.path.slice(6, 23)
          this.navigator.immediatelyResetRouteStack([
            { name: 'LoginScreen' },
            { name: 'HomeScreen' },
            { bill_uid, name: 'LoadBillScreen' },
          ])
        }
      }
    })
  }

  render() {
    return (
      <Provider store={store}><View style={{ backgroundColor: '#111', flex: 1 }}>
        <Navigator
          configureScene={(route) => {
            if (route.transition === null) {
              return NoTransition
            }

            if (route.transition) {
              return Navigator.SceneConfigs[route.transition]
            }

            return Navigator.SceneConfigs.PushFromRight
          }}
          initialRoute={INITIAL_ROUTE}
          navigationBar={<Header />}
          ref={(ref) => { this.navigator = ref }}
          renderScene={(route, navigator) => {
            const Screen = screens[route.name]
            return (
              <LinearGradient
                colors={['#000', '#292929']}
                style={{ backgroundColor: 'transparent', flex: 1, justifyContent: 'flex-start' }}
              >
                { !Screen.disableHeader &&
                  <View style={{ marginTop: 64 }} />
                }
                <Screen navigator={navigator} route={route} />
              </LinearGradient>
            )
          }}
        />
      </View></Provider>
    )
  }
}
