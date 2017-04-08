import { Navigator } from 'react-native'
import buildStyleInterpolator from 'buildStyleInterpolator' // eslint-disable-line import/no-extraneous-dependencies

// Based on https://github.com/facebook/react-native/issues/1953#issuecomment-209872368
// To use: { transition: null } during navigator.push()

const NoTransition = {
  opacity: {
    type: 'constant',
    value: 1.0,
  },
}

export default Object.assign({}, Navigator.SceneConfigs.FadeAndroid, {
  animationInterpolators: {
    into: buildStyleInterpolator(NoTransition),
    out: buildStyleInterpolator(NoTransition),
  },
  defaultTransitionVelocity: 1000,
  gestures: null,
})
