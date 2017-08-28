import PropTypes from 'prop-types'
import React from 'react'
import { View } from 'react-native'
import MediaQuery from 'react-responsive'
import StarIcon from 'react-icons/lib/md/star'
import { Background, Parallax } from 'react-parallax'
import cover from 'landing.jpg'
import Button from 'Button'
import CommonStyle from 'CommonStyle'
import Image from 'Image'

const cstyle = CommonStyle()

export default function IntroHeader({ history, sessionId, showVideo = false }) {
  return (
    <View
      style={{
        backgroundColor: '#111',
        borderBottomColor: cstyle.panelBorderColor,
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        overflow: 'hidden',
      }}
    >
      <Parallax bgStyle={{ height: '100%', width: '100%' }}>
        <Background>
          <Image
            alt="Statue of Liberty"
            source={cover}
            style={{
              height: '150%',
              objectFit: 'cover',
              opacity: 0.4,
              width: '100%',
            }}
          />
        </Background>
        <View
          style={{
            alignItems: 'center',
            paddingVertical: '2rem',
          }}
        >
          <div
            style={{
              backgroundColor: 'transparent',
              color: '#FFF',
              fontSize: '28px',
              fontWeight: '600',
              paddingLeft: '2rem',
              paddingRight: '2rem',
              textAlign: 'center',
              textShadow: '1px 1px 1px #000',
            }}
          >
            Vote directly on real legislation or delegate to someone you trust.
          </div>
          <div
            style={{
              backgroundColor: 'transparent',
              color: '#FFF',
              fontSize: '21px',
              fontWeight: '400',
              marginTop: '1rem',
              paddingLeft: '2rem',
              paddingRight: '2rem',
              textAlign: 'center',
              textShadow: '1px 1px 1px #000',
            }}
          >It's called Liquid Democracy.</div>

          {!sessionId && <Button
            outline
            history={history}
            icon={StarIcon}
            style={{
              fontWeight: '600',
              marginTop: '1.5rem',
            }}
            text="Join Us"
            to="/join"
          />}

          { showVideo &&
            <View
              style={{
                alignItems: 'center',
                paddingBottom: '1rem',
                paddingHorizontal: '1rem',
                paddingTop: '2rem',
              }}
            >
              <MediaQuery maxWidth={740}>
                {smallScreen => (
                  <iframe allowFullScreen frameBorder="0" height={smallScreen ? 200 : 315} src="https://www.youtube.com/embed/u9-hvwPSbhM" width={smallScreen ? 360 : 560} />
                )}
              </MediaQuery>
            </View>
          }
        </View>
      </Parallax>
    </View>
  )
}

IntroHeader.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  sessionId: PropTypes.string,
  showVideo: PropTypes.bool,
}
