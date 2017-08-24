import PropTypes from 'prop-types'
import React from 'react'
import {
  Dimensions,
  Image,
  TouchableOpacity,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import photoGuides from './photo-guides.png'

const Camera = props => <View {...props} /> // eslint-disable-line react-filenames/filename-matches-component

function CameraScreen({ dispatch, history }) {
  const { height, width } = Dimensions.get('window')
  const guidesWidth = Math.min(375, width)
  const guidesHeight = Math.floor(guidesWidth * 1.445)

  return (
    <View>
      <Camera
        aspect={Camera.constants.Aspect.fill}
        captureTarget={Camera.constants.CaptureTarget.temp}
        ref={(cam) => { this.camera = cam }}
        style={{
          alignItems: 'center',
          flexGrow: 1,
          height,
          justifyContent: 'space-between',
          width,
        }}
      >
        <Image
          source={photoGuides}
          style={{
            height: guidesHeight,
            marginTop: 30,
            width: guidesWidth,
          }}
        />
        <TouchableOpacity
          style={{
            alignItems: 'center',
            backgroundColor: 'black',
            borderColor: 'grey',
            borderRadius: 50,
            borderWidth: 1,
            height: 60,
            justifyContent: 'center',
            marginBottom: 20,
            width: 60,
          }}
          onPress={() => this.camera.capture()
            .then(data => dispatch({ path: data.path, type: 'CAPTURE_ID_PHOTO' }))
            .then(() => { history.push('/registration/review-id') })
            .catch(err => console.error('err:', err)) // eslint-disable-line no-console
          }
        >
          <EntypoIcon color="white" name="camera" size={24} />
        </TouchableOpacity>
      </Camera>
    </View>
  )
}

CameraScreen.disableHeader = true

CameraScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}

export default connect()(CameraScreen)
