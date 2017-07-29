import React from 'react'
import { Image, View, Text } from 'react-native'
import MediaQuery from 'react-responsive'
import SubscribeCTA from './SubscribeCTA'
import constituencyGraphic from './constituency-graphic.png'
import AmericaCover from './america_cover.jpg'

function ExtendedLandingPage() {
  return (
    <View>

      { /* Video section */ }
      <View style={{ alignItems: 'center', backgroundColor: '#191723', paddingHorizontal: 20, paddingVertical: 60 }}>
        <Text style={{ color: 'white', fontFamily: 'HelveticaNeue-Thin', fontSize: 43, letterSpacing: 1, marginBottom: 60, textAlign: 'center' }} >
          People, Not Parties
        </Text>
        <MediaQuery maxWidth={740}>
          {smallScreen => (
            <iframe allowFullScreen frameBorder="0" height={smallScreen ? 200 : 315} src="https://www.youtube.com/embed/nJmGrNdJ5Gw" width={smallScreen ? 360 : 560} />
          )}
        </MediaQuery>
      </View>

      { /* Introducing LD */ }
      <MediaQuery maxWidth={960}>
        {smallScreen => (
          <View style={{ alignItems: 'center', backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 60 }}>
            <Text style={{ color: '#262626', fontFamily: 'HelveticaNeue-Medium', fontSize: smallScreen ? 30 : 46, letterSpacing: 4.63, marginBottom: 30, textAlign: 'center' }} >
              INTRODUCING LIQUID DEMOCRACY
            </Text>
            <View style={{ alignItems: 'center', flexDirection: !smallScreen ? 'row' : 'column', justifyContent: 'space-between', width: smallScreen ? undefined : 920 }}>
              <Text style={{ color: '#262626', fontFamily: 'HelveticaNeue-Light', fontSize: 26, letterSpacing: 1 }} >
                Vote directly on legislation.
              </Text>
              <Text style={{ color: '#262626', fontFamily: 'HelveticaNeue-Light', fontSize: 26, letterSpacing: 1, marginTop: smallScreen ? 15 : 0 }} >
                Or delegate your vote to anyone you know.
              </Text>
            </View>
            <Text style={{ color: '#262626', fontFamily: 'HelveticaNeue-Light', fontSize: 26, letterSpacing: 1, marginTop: 60, maxWidth: 480, textAlign: 'center', width: '100%' }} >
              We'll grade elected politicians on how well they truly represent their voters.
            </Text>
          </View>
        )}
      </MediaQuery>

      { /* three slogans */ }
      <MediaQuery maxWidth={575}>
        {verySmallScreen => (
          <View style={{ alignSelf: 'center', maxWidth: 920, paddingHorizontal: 20, paddingVertical: 60, width: '100%' }}>
            <Text style={{ color: '#E2E2E2', fontFamily: 'HelveticaNeue-Light', fontSize: 26, letterSpacing: 2.17, marginBottom: 60 }}>
              REMOVE CORRUPTION
            </Text>

            <Text style={{ alignSelf: verySmallScreen ? 'auto' : 'center', color: '#E2E2E2', fontFamily: 'HelveticaNeue-Light', fontSize: 26, letterSpacing: 2.17, marginBottom: 60 }}>
              MOVE PAST A TWO PARTY SYSTEM
            </Text>

            <Text style={{ alignSelf: verySmallScreen ? 'auto' : 'flex-end', color: '#E2E2E2', fontFamily: 'HelveticaNeue-Light', fontSize: 26, letterSpacing: 2.17 }}>
              GET REAL REPRESENTATION
            </Text>
          </View>
        )}
      </MediaQuery>

      { /* voting power */ }
      <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 60 }}>
        <View style={{ alignItems: 'center', alignSelf: 'center', maxWidth: 920, width: '100%' }}>
          <Text style={{ color: '#262626', fontFamily: 'HelveticaNeue-Light', fontSize: 26, letterSpacing: 1 }}>
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

          <Text style={{ color: '#262626', fontFamily: 'HelveticaNeue-Light', fontSize: 26, letterSpacing: 1 }}>
            Build your constituency to gain VOTING POWER
          </Text>
        </View>
      </View>

      { /* RoM&C */ }
      <View style={{ paddingHorizontal: 20, paddingVertical: 60 }}>
        <View style={{ alignSelf: 'center', maxWidth: 920, width: '100%' }}>
          <Text style={{ color: 'white', fontFamily: 'HelveticaNeue-Bold', fontSize: 27, letterSpacing: 2 }}>
            Law is the expression of the general will.
          </Text>

          <Text style={{ color: 'white', fontFamily: 'HelveticaNeue-Bold', fontSize: 27, letterSpacing: 2, marginTop: 30 }}>
            Every citizen has a right to participate personally, or through their representative, in its foundation.
          </Text>
          <Text style={{ alignSelf: 'flex-end', color: 'white', fontFamily: 'HelveticaNeue-Italic', fontSize: 24, marginTop: 60 }}>
            — Declaration of the Rights of Man and of the Citizen
          </Text>

          <Text style={{ alignSelf: 'flex-end', color: 'white', marginTop: 20 }}>
            AUGUST 1789
          </Text>
        </View>
      </View>

      { /* Learn More */ }
      <View style={{ alignItems: 'center', backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 60 }}>
        <View style={{ alignSelf: 'center', maxWidth: 920, width: '100%' }}>
          <Text style={{ fontFamily: 'HelveticaNeue-Thin', fontSize: 45, letterSpacing: 0.12 }}>
            LEARN MORE
          </Text>

          <Text style={{ fontWeight: 'bold', marginBottom: 5, marginTop: 30 }}>INTRODUCTION</Text>
          <Text style={{ marginBottom: 5 }}>What is Liquid Democracy? <a href="http://intro.liquid.vote">http://intro.liquid.vote</a></Text>

          <Text style={{ fontWeight: 'bold', marginBottom: 5, marginTop: 30 }}>ARTICLES</Text>
          <Text style={{ marginBottom: 5 }}>Liquid Democracy Candidates: How to upgrade our legislature, one seat at a time <a href="http://candidate.liquid.vote">http://candidate.liquid.vote</a></Text>
          <Text style={{ marginBottom: 5 }}>Liquid Democracy and A Free Political Economy <a href="http://free.liquid.vote">http://free.liquid.vote</a></Text>
          <Text style={{ marginBottom: 5 }}>Liquid Democracy Can Completely Eliminate Gerrymandering <a href="http://gerrymandering.liquid.vote">http://gerrymandering.liquid.vote</a></Text>
          <Text style={{ marginBottom: 5 }}>How to Move Past A Two Party System <a href="http://two.liquid.vote">http://two.liquid.vote</a></Text>
          <Text style={{ marginBottom: 5 }}>Don't Care About Politics? Liquid democracy is easier for you too <a href="http://easy.liquid.vote">http://easy.liquid.vote</a></Text>
          <Text style={{ marginBottom: 5 }}>Liquid Privacy <a href="http://privacy.liquid.vote">http://privacy.liquid.vote</a></Text>

          <Text style={{ fontWeight: 'bold', marginBottom: 5, marginTop: 30 }}>TECHNICAL PAPERS</Text>
          <Text style={{ marginBottom: 5 }}>How to Calculate a Politician's Representative Score <a href="http://score.liquid.vote">http://score.liquid.vote</a></Text>
          <Text style={{ marginBottom: 5 }}>Secure Internet Voting <a href="http://secure.liquid.vote">http://secure.liquid.vote</a></Text>

          <Text style={{ fontWeight: 'bold', marginBottom: 5, marginTop: 30 }}>INTERACTIVE DEMO</Text>
          <Text style={{ marginBottom: 5 }}><a href="http://demo.liquid.vote">http://demo.liquid.vote</a></Text>

          <Text style={{ fontWeight: 'bold', marginBottom: 5, marginTop: 30 }}>RELATED</Text>
          <Text style={{ marginBottom: 5 }}>Upgrading Democracy: How voting could work now, 240 years later <a href="http://upgrading.liquid.vote">http://upgrading.liquid.vote</a></Text>
          <Text style={{ marginBottom: 5 }}>Let's End Hotdog Worship in America <a href="http://hotdogs.liquid.vote">http://hotdogs.liquid.vote</a></Text>
          <Text style={{ marginBottom: 5 }}>The Internet Party: How technology can disrupt politics and re-invent government <a href="http://netparty.liquid.vote">http://netparty.liquid.vote</a></Text>
          <Text style={{ marginBottom: 5 }}>The Power of Networks (video) <a href="http://networks.liquid.vote">http://networks.liquid.vote</a></Text>

        </View>
      </View>

      { /* Attributes */ }
      <MediaQuery maxWidth={500}>
        {verySmallScreen => (
          <View style={{ paddingBottom: 30, paddingHorizontal: 20, paddingTop: 60 }}>
            <View style={{ alignSelf: 'center', maxWidth: 920, width: '100%' }}>
              <Text style={{ color: 'white', fontFamily: 'HelveticaNeue-Medium', fontSize: 35, letterSpacing: 0.5, marginBottom: 60 }}>
                LIQUID DEMOCRACY
              </Text>

              <View style={{ flexDirection: verySmallScreen ? 'column' : 'row', justifyContent: 'space-between' }}>

                <View>
                  <Text style={{ color: 'white', fontFamily: 'HelveticaNeue-Light', fontSize: 26, letterSpacing: 1, marginBottom: 30 }}>
                    Digital
                  </Text>
                  <Text style={{ color: 'white', fontFamily: 'HelveticaNeue-Light', fontSize: 26, letterSpacing: 1, marginBottom: 30 }}>
                    Authentic
                  </Text>
                </View>

                <View>
                  <Text style={{ color: 'white', fontFamily: 'HelveticaNeue-Light', fontSize: 26, letterSpacing: 1, marginBottom: 30 }}>
                    Transparent
                  </Text>
                  <Text style={{ color: 'white', fontFamily: 'HelveticaNeue-Light', fontSize: 26, letterSpacing: 1, marginBottom: 30 }}>
                    Accountable
                  </Text>
                </View>

                <View style={{ alignItems: verySmallScreen ? 'flex-start' : 'flex-end' }}>
                  <Text style={{ color: 'white', fontFamily: 'HelveticaNeue-Light', fontSize: 26, letterSpacing: 1, marginBottom: 30 }}>
                    Easy
                  </Text>
                  <Text style={{ color: 'white', fontFamily: 'HelveticaNeue-Light', fontSize: 26, letterSpacing: 1, marginBottom: 30 }}>
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

      <MediaQuery maxWidth={960}>
        {mediumScreen => (
          <MediaQuery maxWidth={630}>
            {smallScreen => (
              <Image
                source={AmericaCover}
                style={[{
                  alignSelf: 'center',
                  height: mediumScreen ? 400 : 600,
                  width: '100%',
                }, smallScreen && { height: 230 },
                ]}
              />
            )}
          </MediaQuery>
        )}
      </MediaQuery>

      { /* Footer */ }
      <View style={{ padding: 60 }}>
        <Text style={{ color: 'white', fontFamily: 'HelveticaNeue-Thin', fontSize: 30, letterSpacing: 0.12, textAlign: 'center' }}>
          Liquid Democracy is Now Possible
        </Text>
      </View>

    </View>
  )
}

export default ExtendedLandingPage
