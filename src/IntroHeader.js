import React, { PropTypes } from 'react'
import { Image, View } from 'react-native'
import StarIcon from 'react-icons/lib/md/star'
import cover from './landing.jpg'
import Button from './Button'
import CommonStyle from './CommonStyle'

const cstyle = CommonStyle()

export default function IntroHeader({ history }) {
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: '#111',
        borderBottomColor: cstyle.panelBorderColor,
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        justifyContent: 'center',
        minHeight: '200px',
        overflow: 'hidden',
        paddingVertical: 30,
      }}
    >
      <div
        style={{
          backgroundColor: 'transparent',
          color: '#FFF',
          fontSize: '28px',
          fontWeight: '600',
          marginBottom: '.5rem',
          paddingLeft: '2rem',
          paddingRight: '2rem',
          textAlign: 'center',
          textShadow: '1px 1px 1px #000',
          zIndex: 1,
        }}
      >
        End the two-party system.
      </div>
      <div
        style={{
          backgroundColor: 'transparent',
          color: '#FFF',
          fontSize: '21px',
          fontWeight: '400',
          paddingLeft: '2rem',
          paddingRight: '2rem',
          textAlign: 'center',
          textShadow: '1px 1px 1px #000',
          zIndex: 1,
        }}
      >
        Vote directly on real legislation,
        or delegate to someone you trust. It's called Liquid Democracy.
      </div>
      <Button
        outline
        history={history}
        icon={StarIcon}
        style={{
          fontWeight: '600',
          marginTop: '1.5rem',
          zIndex: 1,
        }}
        text="Join Us"
        to="/join"
      />
      <Image
        source={cover}
        style={{
          bottom: 0,
          flex: 1,
          height: '100%',
          left: 0,
          opacity: 0.4,
          position: 'absolute',
          resizeMode: 'cover',
          width: '100%',
          zIndex: 0,
        }}
      />
    </View>
  )
}

IntroHeader.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}
