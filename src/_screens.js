/* eslint global-require: 0 */

import React from 'react'
import { View } from 'react-native'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './Header'
import ScreenWithMenu from './ScreenWithMenu'

export const screens = {
  '/': require('./Login/LandingPage/1-LoginScreen').default,
  '/about': require('./AboutScreen').default,
  '/auth-error': require('./AuthErrorScreen').default,
  '/confirm-new-number/:phoneNumber': require('./Login/1.5-ConfirmNewNumberScreen').default,
  '/delegates': require('./Delegation/DelegatesScreen').default,
  '/delegates/add': require('./Delegation/AddDelegateScreen').default,
  '/delegates/add/:phoneNumber': require('./Delegation/ConfirmDelegateScreen').default,
  '/delegates/requests': require('./Delegation/RequestsScreen').default,
  '/delegates/:phoneNumber': require('./Delegation/DelegateInfoScreen').default, // eslint-disable-line sort-keys
  '/enter-sms': require('./Login/2-EnterSMSCodeScreen').default,
  '/feedback': require('./FeedbackScreen').default,
  '/registration': require('./Registration/0-RegistrationIntroScreen').default,
  '/registration/address': require('./Registration/2.5-AddressScreen').default,
  '/registration/camera': require('./Registration/3.3-CameraScreen').default,
  '/registration/email': require('./Registration/4-EmailScreen').default,
  '/registration/first-name': require('./Registration/1-FirstNameScreen').default,
  '/registration/last-name': require('./Registration/1.5-LastNameScreen').default,
  '/registration/legal-id': require('./Registration/3-LegalIdScreen').default,
  '/registration/review-id': require('./Registration/3.6-IdReviewScreen').default,
  '/registration/thank-you': require('./Registration/5-ThankYouScreen').default,
  '/registration/zip': require('./Registration/2-ZipScreen').default,
  '/sf': require('./HomeScreen/NextAgendaScreen').default,
  '/sf/board': require('./ElectedRep/BoardScreen').default,
  '/sf/districts-map': require('./ElectedRep/DistrictsMapScreen').default,
  '/sf/elected-rep': require('./ElectedRep/ElectedRepScreen').default,
  '/sf/:date': require('./Legislation/AgendaScreen').default,  // eslint-disable-line sort-keys
  '/sf/:date/:bill_id': require('./Legislation/LoadBillScreen').default,
  '/sf/:date/:bill_id/audit': require('./Legislation/AuditScreen').default,
  '/sf/:date/:bill_id/vote/:position': require('./Legislation/ConfirmVoteScreen').default,
  '/sms-login/:phoneNumber/:session_code': require('./Login/SMSLoginScreen').default,
  '/voting-power': require('./VotingPowerScreen/VotingPowerScreen').default,
  '/your-registration': require('./Registration/YourRegistrationScreen').default,
  '*': require('./404Screen').default, // eslint-disable-line sort-keys
}

export default () => (
  <Router>
    <Switch>
      { Object.keys(screens).map((path) => {
        const Screen = screens[path]

        return (
          <Route
            exact key={path} path={path} render={({ history, location, match }) => {
              if (Screen.disableMenu) {
                return (
                  <View style={{ flex: 1, height: '100%', width: '100%' }}>
                    <Header location={location} path={path} />
                    <Screen history={history} location={location} match={match} />
                  </View>
                )
              }

              return (<ScreenWithMenu
                Screen={Screen}
                history={history}
                location={location}
                match={match}
                path={path}
              />)
            }}
          />
        )
      }) }
    </Switch>
  </Router>
)
