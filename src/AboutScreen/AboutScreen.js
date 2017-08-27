import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import MediaQuery from 'react-responsive'
import { Parallax } from 'react-parallax'
import HoverableLink from 'HoverableLink'
import Image from 'Image'
import IntroHeader from 'IntroHeader'
import SubscribeCTA from 'AboutScreen/SubscribeCTA'
import constituencyGraphic from 'AboutScreen/constituency-graphic.png'
import Text from 'Text'

function AboutScreen({ history, sessionId }) {
  return (
    <View>
      <IntroHeader showVideo history={history} sessionId={sessionId} />

      { /* Introducing LD */}
      <MediaQuery maxWidth={960}>
        {smallScreen => (
          <View style={{ alignItems: 'center', backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 60 }}>
            <Text style={{ fontSize: smallScreen ? 30 : 46, fontWeight: '500', letterSpacing: 4.63, marginBottom: 30, textAlign: 'center' }} >
              What is Liquid Democracy?
            </Text>
            <View style={{ alignItems: 'center', width: smallScreen ? undefined : 920 }}>
              <Text style={{ fontSize: 21, fontWeight: '200', letterSpacing: 1 }} >
                  Liquid makes it possible to vote directly on legislation, instead of waiting years to choose between two out-of-touch parties. You can delegate to someone you trust to vote on your behalf whenever you don’t have the time or expertise. You can take back your delegation at any time, and delegates can only vote on legislation when you don’t.
              </Text>
              <Text style={{ fontSize: 21, fontWeight: '200', letterSpacing: 1, marginTop: '2rem' }} >
                Our politicians ought to be representatives of the people, not party or corporation. Liquid gives you the opportunity to represent yourself, instead of being held hostage by elections. Liquid democracy can end the two-party system and restore power to the people.
              </Text>
            </View>
          </View>
        )}
      </MediaQuery>

      { /* three slogans */}
      <MediaQuery maxWidth={575}>
        {verySmallScreen => (<View style={{ backgroundColor: '#191723' }}>
          <View style={{ alignSelf: 'center', maxWidth: 920, paddingHorizontal: 20, paddingVertical: 60, width: '100%' }}>
            <Text style={{ color: '#E2E2E2', fontSize: 26, fontWeight: '200', letterSpacing: 2.17, marginBottom: 60 }}>
              REMOVE CORRUPTION
            </Text>

            <Text style={{ alignSelf: verySmallScreen ? 'auto' : 'center', color: '#E2E2E2', fontSize: 26, fontWeight: '200', letterSpacing: 2.17, marginBottom: 60 }}>
              MOVE PAST A TWO PARTY SYSTEM
            </Text>

            <Text style={{ alignSelf: verySmallScreen ? 'auto' : 'flex-end', color: '#E2E2E2', fontSize: 26, fontWeight: '200', letterSpacing: 2.17 }}>
              RESTORE REPRESENTATION
            </Text>
          </View>
        </View>)}
      </MediaQuery>

      { /* voting power */}
      <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 60 }}>
        <View style={{ alignItems: 'center', alignSelf: 'center', maxWidth: 920, width: '100%' }}>
          <Image
            source={constituencyGraphic}
            style={{
              alignSelf: 'center',
              height: 200,
              marginBottom: 30,
              width: 310,
            }}
          />

          <Text style={{ fontSize: 26, fontWeight: '200', letterSpacing: 1 }}>
            Build your constituency through delegation to gain voting power
          </Text>
        </View>
      </View>

      { /* RoM&C */}
      <View style={{ backgroundColor: '#191723', paddingHorizontal: 20, paddingVertical: 60 }}><MediaQuery maxWidth={1025}>{medium => (
        <View style={{ alignSelf: 'center', maxWidth: 920, paddingLeft: medium ? 55 : 0, width: '100%' }}>
          <Text style={{ color: '#E2E2E2', fontSize: 100, fontWeight: '700', left: medium ? 0 : -55, opacity: 0.3, position: 'absolute', top: -49 }}>&ldquo;</Text>

          <Text style={{ color: '#E2E2E2', fontSize: 27, fontWeight: '700', letterSpacing: 2 }}>
            Law is the expression of the general will.
          </Text>

          <Text style={{ color: '#E2E2E2', fontSize: 27, fontWeight: '700', letterSpacing: 2, marginTop: 30 }}>
            Every citizen has a right to participate personally, or through their representative, in its foundation.
          </Text>
          <Text style={{ alignSelf: 'flex-end', color: '#E2E2E2', fontSize: 24, fontStyle: 'italic', marginTop: 60 }}>
            — Declaration of the Rights of Man and of the Citizen
          </Text>

          <Text style={{ alignSelf: 'flex-end', color: '#E2E2E2', marginTop: 20 }}>
            AUGUST 1789
          </Text>
        </View>
      )}</MediaQuery></View>

      { /* Learn More */}
      <View style={{ alignItems: 'center', paddingHorizontal: 20, paddingVertical: 60 }}>
        <View style={{ alignSelf: 'center', maxWidth: 920, width: '100%' }}>
          <Text style={{ fontSize: 45, fontWeight: '100', letterSpacing: 0.12 }}>
            LEARN MORE
          </Text>

          <Text style={{ fontWeight: 'bold', marginBottom: 5, marginTop: 30 }}>INTRODUCTION</Text>
          <Text style={{ marginBottom: 5 }}><HoverableLink href="http://intro.liquid.vote" text="What is Liquid Democracy?" /></Text>

          <Text style={{ fontWeight: 'bold', marginBottom: 5, marginTop: 30 }}>ARTICLES</Text>
          <Text style={{ marginBottom: 5 }}><HoverableLink href="http://candidate.liquid.vote" text="Liquid Democracy Candidates: How to upgrade our legislature, one seat at a time" /></Text>
          <Text style={{ marginBottom: 5 }}><HoverableLink href="http://free.liquid.vote" text="Liquid Democracy and A Free Political Economy" /></Text>
          <Text style={{ marginBottom: 5 }}><HoverableLink href="http://gerrymandering.liquid.vote" text="Liquid Democracy Can Completely Eliminate Gerrymandering" /></Text>
          <Text style={{ marginBottom: 5 }}><HoverableLink href="http://two.liquid.vote" text="How to Move Past A Two Party System" /></Text>
          <Text style={{ marginBottom: 5 }}><HoverableLink href="http://easy.liquid.vote" text="Don't Care About Politics? Liquid democracy is easier for you too" /></Text>
          <Text style={{ marginBottom: 5 }}><HoverableLink href="http://privacy.liquid.vote" text="Liquid Privacy" /></Text>

          <Text style={{ fontWeight: 'bold', marginBottom: 5, marginTop: 30 }}>TECHNICAL PAPERS</Text>
          <Text style={{ marginBottom: 5 }}><HoverableLink href="http://score.liquid.vote" text="How to Calculate a Politician's Representative Score" /></Text>
          <Text style={{ marginBottom: 5 }}><HoverableLink href="http://secure.liquid.vote" text="Secure Internet Voting" /></Text>

          <Text style={{ fontWeight: 'bold', marginBottom: 5, marginTop: 30 }}>RELATED</Text>
          <Text style={{ marginBottom: 5 }}><HoverableLink href="http://upgrading.liquid.vote" text="Upgrading Democracy: How voting could work now, 240 years later" /></Text>
          <Text style={{ marginBottom: 5 }}><HoverableLink href="http://netparty.liquid.vote" text="The Internet Party: How technology can disrupt politics and re-invent government" /></Text>
          <Text style={{ marginBottom: 5 }}><HoverableLink href="http://hotdog.liquid.vote" text="Let's End Hotdog Worship in America" /></Text>
          <Text style={{ marginBottom: 5 }}><HoverableLink href="http://networks.liquid.vote" text="The Power of Networks (video)" /></Text>

        </View>
      </View>

      { /* Subscribe */}
      <SubscribeCTA />

      <MediaQuery maxWidth={1300}>{mediumScreen => (<MediaQuery maxWidth={880}>
        {(smallScreen) => {
          let height = 600
          if (mediumScreen) { height = 400 }
          if (smallScreen) { height = 230 }

          return (
            <Parallax bgHeight={`${height * 1.6}px`} bgImage="https://blog.liquid.vote/assets/america_cover.jpg" strength={height / -5}>
              <View style={{ height: (height * 1.17) }} />
            </Parallax>
          )
        }}
      </MediaQuery>)}</MediaQuery>

      { /* Footer */}
      <View style={{ backgroundColor: '#191723', padding: 60 }}>
        <Text style={{ color: '#E2E2E2', fontSize: 30, fontWeight: '100', letterSpacing: 0.12, textAlign: 'center' }}>
          Liquid Democracy is Now Possible
        </Text>
      </View>

    </View>
  )
}

AboutScreen.disableHeader = true

AboutScreen.propTypes = {
  history: PropTypes.shape({}).isRequired,
  sessionId: PropTypes.string,
}

export default connect(({ sessionId }) => ({ sessionId }))(AboutScreen)
