import React from 'react'
import { Image, View, Text } from 'react-native'
import MediaQuery from 'react-responsive'
import { Parallax, Background } from 'react-parallax'
import HoverableLink from '../../HoverableLink'
import SubscribeCTA from './SubscribeCTA'
import constituencyGraphic from './constituency-graphic.png'
import AmericaCover from './america_cover.jpg'

function ExtendedLandingPage() {
  return (
    <View>

      { /* Video section */ }
      <View style={{ alignItems: 'center', backgroundColor: '#191723', paddingHorizontal: 20, paddingVertical: 60 }}>
        <Text style={{ color: 'white', fontFamily: 'Helvetica Neue', fontSize: 43, fontWeight: '100', letterSpacing: 1, marginBottom: 60, textAlign: 'center' }} >
          People, Not Parties
        </Text>
        <MediaQuery maxWidth={740}>
          {smallScreen => (
            <iframe allowFullScreen frameBorder="0" height={smallScreen ? 200 : 315} src="https://www.youtube.com/embed/8Eqo0LMQKEA" width={smallScreen ? 360 : 560} />
          )}
        </MediaQuery>
      </View>

      { /* Introducing LD */ }
      <MediaQuery maxWidth={960}>
        {smallScreen => (
          <View style={{ alignItems: 'center', backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 60 }}>
            <Text style={{ color: '#262626', fontFamily: 'Helvetica Neue', fontSize: smallScreen ? 30 : 46, fontWeight: '500', letterSpacing: 4.63, marginBottom: 30, textAlign: 'center' }} >
              INTRODUCING LIQUID DEMOCRACY
            </Text>
            <View style={{ alignItems: 'center', flexDirection: !smallScreen ? 'row' : 'column', justifyContent: 'space-between', width: smallScreen ? undefined : 920 }}>
              <Text style={{ color: '#262626', fontFamily: 'Helvetica Neue', fontSize: 26, fontWeight: '200', letterSpacing: 1 }} >
                Vote on real legislation.
              </Text>
              <Text style={{ color: '#262626', fontFamily: 'Helvetica Neue', fontSize: 26, fontWeight: '200', letterSpacing: 1, marginTop: smallScreen ? 15 : 0 }} >
                Or delegate your vote to anyone you trust.
              </Text>
            </View>
            <Text style={{ color: '#262626', fontFamily: 'Helvetica Neue', fontSize: 26, fontWeight: '200', letterSpacing: 1, marginTop: 60, maxWidth: 480, textAlign: 'center', width: '100%' }} >
              We'll grade politicians on how well they truly represent their voters.
            </Text>
          </View>
        )}
      </MediaQuery>

      { /* three slogans */ }
      <MediaQuery maxWidth={575}>
        {verySmallScreen => (
          <View style={{ alignSelf: 'center', maxWidth: 920, paddingHorizontal: 20, paddingVertical: 60, width: '100%' }}>
            <Text style={{ color: '#E2E2E2', fontFamily: 'Helvetica Neue', fontSize: 26, fontWeight: '200', letterSpacing: 2.17, marginBottom: 60 }}>
              REMOVE CORRUPTION
            </Text>

            <Text style={{ alignSelf: verySmallScreen ? 'auto' : 'center', color: '#E2E2E2', fontFamily: 'Helvetica Neue', fontSize: 26, fontWeight: '200', letterSpacing: 2.17, marginBottom: 60 }}>
              MOVE PAST A TWO PARTY SYSTEM
            </Text>

            <Text style={{ alignSelf: verySmallScreen ? 'auto' : 'flex-end', color: '#E2E2E2', fontFamily: 'Helvetica Neue', fontSize: 26, fontWeight: '200', letterSpacing: 2.17 }}>
              GET REAL REPRESENTATION
            </Text>
          </View>
        )}
      </MediaQuery>

      { /* voting power */ }
      <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 60 }}>
        <View style={{ alignItems: 'center', alignSelf: 'center', maxWidth: 920, width: '100%' }}>
          <Text style={{ color: '#262626', fontFamily: 'Helvetica Neue', fontSize: 26, fontWeight: '200', letterSpacing: 1 }}>
            POWERED by Liquid Democracy
          </Text>

          <Image
            source={constituencyGraphic}
            style={{
              alignSelf: 'center',
              height: 200,
              marginVertical: 30,
              width: 310,
            }}
          />

          <Text style={{ color: '#262626', fontFamily: 'Helvetica Neue', fontSize: 26, fontWeight: '200', letterSpacing: 1 }}>
            Build your constituency to gain VOTING POWER
          </Text>
        </View>
      </View>

      { /* RoM&C */ }
      <View style={{ paddingHorizontal: 20, paddingVertical: 60 }}><MediaQuery maxWidth={1025}>{medium => (
        <View style={{ alignSelf: 'center', maxWidth: 920, paddingLeft: medium ? 55 : 0, width: '100%' }}>
          <Text style={{ color: 'white', fontFamily: 'Helvetica Neue', fontSize: 100, fontWeight: '700', left: medium ? 0 : -55, opacity: 0.3, position: 'absolute', top: -49 }}>&ldquo;</Text>

          <Text style={{ color: 'white', fontFamily: 'Helvetica Neue', fontSize: 27, fontWeight: '700', letterSpacing: 2 }}>
            Law is the expression of the general will.
          </Text>

          <Text style={{ color: 'white', fontFamily: 'Helvetica Neue', fontSize: 27, fontWeight: '700', letterSpacing: 2, marginTop: 30 }}>
            Every citizen has a right to participate personally, or through their representative, in its foundation.
          </Text>
          <Text style={{ alignSelf: 'flex-end', color: 'white', fontFamily: 'Helvetica Neue', fontSize: 24, fontStyle: 'italic', marginTop: 60 }}>
            — Declaration of the Rights of Man and of the Citizen
          </Text>

          <Text style={{ alignSelf: 'flex-end', color: 'white', marginTop: 20 }}>
            AUGUST 1789
          </Text>
        </View>
      )}</MediaQuery></View>

      { /* Learn More */ }
      <View style={{ alignItems: 'center', backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 60 }}>
        <View style={{ alignSelf: 'center', maxWidth: 920, width: '100%' }}>
          <Text style={{ fontFamily: 'Helvetica Neue', fontSize: 45, fontWeight: '100', letterSpacing: 0.12 }}>
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

          <Text style={{ fontWeight: 'bold', marginBottom: 5, marginTop: 30 }}>INTERACTIVE DEMO</Text>
          <Text style={{ marginBottom: 5 }}><HoverableLink href="http://demo.liquid.vote" text="http://demo.liquid.vote" /></Text>

          <Text style={{ fontWeight: 'bold', marginBottom: 5, marginTop: 30 }}>RELATED</Text>
          <Text style={{ marginBottom: 5 }}><HoverableLink href="http://upgrading.liquid.vote" text="Upgrading Democracy: How voting could work now, 240 years later" /></Text>
          <Text style={{ marginBottom: 5 }}><HoverableLink href="http://netparty.liquid.vote" text="The Internet Party: How technology can disrupt politics and re-invent government" /></Text>
          <Text style={{ marginBottom: 5 }}><HoverableLink href="http://hotdog.liquid.vote" text="Let's End Hotdog Worship in America" /></Text>
          <Text style={{ marginBottom: 5 }}><HoverableLink href="http://networks.liquid.vote" text="The Power of Networks (video)" /></Text>

        </View>
      </View>

      { /* Attributes */ }
      <MediaQuery maxWidth={500}>
        {verySmallScreen => (
          <View style={{ paddingBottom: 30, paddingHorizontal: 20, paddingTop: 60 }}>
            <View style={{ alignSelf: 'center', maxWidth: 920, width: '100%' }}>
              <Text style={{ color: 'white', fontFamily: 'Helvetica Neue', fontSize: 35, fontWeight: '500', letterSpacing: 0.5, marginBottom: 60 }}>
                LIQUID DEMOCRACY
              </Text>

              <View style={{ flexDirection: verySmallScreen ? 'column' : 'row', justifyContent: 'space-between' }}>

                <View>
                  <Text style={{ color: 'white', fontFamily: 'Helvetica Neue', fontSize: 26, fontWeight: '200', letterSpacing: 1, marginBottom: 30 }}>
                    Digital
                  </Text>
                  <Text style={{ color: 'white', fontFamily: 'Helvetica Neue', fontSize: 26, fontWeight: '200', letterSpacing: 1, marginBottom: 30 }}>
                    Authentic
                  </Text>
                </View>

                <View>
                  <Text style={{ color: 'white', fontFamily: 'Helvetica Neue', fontSize: 26, fontWeight: '200', letterSpacing: 1, marginBottom: 30 }}>
                    Transparent
                  </Text>
                  <Text style={{ color: 'white', fontFamily: 'Helvetica Neue', fontSize: 26, fontWeight: '200', letterSpacing: 1, marginBottom: 30 }}>
                    Accountable
                  </Text>
                </View>

                <View style={{ alignItems: verySmallScreen ? 'flex-start' : 'flex-end' }}>
                  <Text style={{ color: 'white', fontFamily: 'Helvetica Neue', fontSize: 26, fontWeight: '200', letterSpacing: 1, marginBottom: 30 }}>
                    Easy
                  </Text>
                  <Text style={{ color: 'white', fontFamily: 'Helvetica Neue', fontSize: 26, fontWeight: '200', letterSpacing: 1, marginBottom: 30 }}>
                    Participatory
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </MediaQuery>

      { /* Subscribe */ }
      <SubscribeCTA />

      <MediaQuery maxWidth={1300}>{mediumScreen => (<MediaQuery maxWidth={880}>
        { (smallScreen) => {
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

      { /* Footer */ }
      <View style={{ padding: 60 }}>
        <Text style={{ color: 'white', fontFamily: 'Helvetica Neue', fontSize: 30, fontWeight: '100', letterSpacing: 0.12, textAlign: 'center' }}>
          Liquid Democracy is Now Possible
        </Text>
      </View>

    </View>
  )
}

export default ExtendedLandingPage
