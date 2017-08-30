import PropTypes from 'prop-types'
import React from 'react'
import { View } from 'react-native'
import MediaQuery from 'react-responsive'
import StarIcon from 'react-icons/lib/md/star'
import StatueOfLiberty from 'images/statue_of_liberty.jpg'
import Button from 'Button'
import CommonStyle from 'CommonStyle'
import Image from 'Image'

const cstyle = CommonStyle()

export default function IntroHeader({ history, location, sessionId, showVideo = false }) {
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
      <Image
        alt=""
        source={StatueOfLiberty}
        style={{
          height: '100%',
          objectFit: 'cover',
          objectPosition: '50% 70%',
          opacity: 0.4,
          position: 'absolute',
          width: '100%',
        }}
      />
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

        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
          {!sessionId && <Button
            outline
            history={history}
            icon={StarIcon}
            style={{
              fontWeight: '600',
              marginLeft: '.5rem',
              marginRight: '.5rem',
              marginTop: '1.5rem',
            }}
            text="Join Us"
            to="/join"
          />}
          {location.pathname !== '/about' && <Button
            outline
            history={history}
            style={{
              fontWeight: '600',
              marginLeft: '.5rem',
              marginRight: '.5rem',
              marginTop: '1.5rem',
            }}
            text="Learn More"
            to="/about"
          />}
        </View>

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
    </View>
  )
}

IntroHeader.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
  sessionId: PropTypes.string,
  showVideo: PropTypes.bool,
}
