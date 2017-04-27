import React, { Component } from 'react'
import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import { RNS3 } from 'react-native-aws3'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Entypo from 'react-native-vector-icons/Entypo'

class IdReviewScreen extends Component {
  constructor() {
    super()
    this.state = {
      isUploading: false,
      status: 'Uploading: 0%',
    }
  }

  uploadPhoto() {
    this.setState({ isUploading: true })

    fetch('https://api.liquid.vote/registration/photo', {
      headers: {
        Session_ID: this.props.sessionId,
      },
      method: 'POST',
    })
    .then(response => response.json())
    .then(({ filename }) => (
      RNS3.put({
        name: filename,
        type: 'image/jpeg',
        uri: this.props.registrationPhotoPath,
      }, {
        accessKey: 'AKIAJDBHLVJIULUKBVEA',
        acl: 'private',
        bucket: 'liquid-vote-uploads',
        keyPrefix: 'ids/',
        region: 'us-west-1',
        secretKey: 'aniNzv5pXv0GAzPERt3tkfDnRflhOXzvc98j0zEQ',
        successActionStatus: 201,
      })

      // Show progress updates
      .progress((event) => {
        this.setState({ status: `Uploading: ${Math.floor(event.percent * 100)}%` })
      })

      // Handle success
      .then((response) => {
        if (response.status !== 201) {
          throw new Error('Failed to upload image')
        }

        this.setState({ status: 'Upload complete.' })
        setTimeout(() => this.props.history.push({ name: 'EmailScreen', transition: null }), 800)
      })
    ))

    .catch(() => this.setState({ status: 'Failed to upload image' }))
  }

  render() {
    return (
      <View>

        <Image
          source={{ uri: this.props.registrationPhotoPath }}
          style={{
            alignSelf: 'center',
            height: Dimensions.get('window').height,
            justifyContent: 'flex-end',
            marginBottom: 12,
            width: Dimensions.get('window').width,
          }}
        >

          { !this.state.isUploading ? (
            <View style={{ flexDirection: 'row', marginBottom: 10, marginHorizontal: 30 }}>
              <TouchableOpacity
                style={{ borderRadius: 15, flex: 5, overflow: 'hidden' }}
                onPress={() => this.props.history.goBack()}
              >
                <Text style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  borderColor: 'grey',
                  borderWidth: 1,
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '500',
                  height: 60,
                  lineHeight: 60,
                  paddingRight: 10,
                  textAlign: 'center',
                }}
                >
                  <View style={{ height: 38, width: 35 }}>
                    <EvilIcons color="white" name="redo" size={29} />
                  </View>
                  RETAKE
                </Text>
              </TouchableOpacity>

              <View style={{ flex: 1 }} />

              <TouchableOpacity
                style={{ borderRadius: 15, flex: 5, overflow: 'hidden' }}
                onPress={() => this.uploadPhoto()}
              >
                <Text style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  borderColor: 'grey',
                  borderWidth: 1,
                  color: 'white',
                  flex: 1,
                  fontSize: 16,
                  fontWeight: '500',
                  lineHeight: 60,
                  textAlign: 'center',
                }}
                >
                  CONTINUE
                  <View style={{ height: 37, width: 19 }}>
                    <Entypo color="white" name="chevron-right" size={23} />
                  </View>
                </Text>
              </TouchableOpacity>

            </View>)

            : <Text style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: '#fff',
              fontSize: 18,
              fontWeight: '200',
              paddingVertical: 30,
              textAlign: 'center',
              width: Dimensions.get('window').width,
            }}
            >
              {this.state.status}
            </Text>
          }

        </Image>

      </View>
    )
  }
}

IdReviewScreen.disableHeader = true

IdReviewScreen.propTypes = {
  history: React.PropTypes.shape({
    goBack: React.PropTypes.func.isRequired,
    push: React.PropTypes.func.isRequired,
  }),
  registrationPhotoPath: React.PropTypes.string.isRequired,
  sessionId: React.PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  registrationPhotoPath: state.registrationPhotoPath,
  sessionId: state.sessionId,
})

export default connect(mapStateToProps)(IdReviewScreen)
