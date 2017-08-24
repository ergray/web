import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'
import MenuFull from './MenuFull'
import MenuSmall from './MenuSmall'

function Menu({ constituents, dispatch, history, style = {}, user, votingPower = '..' }) {
  let numRequests
  if (constituents && constituents.requests) {
    numRequests = constituents.requests.length
  }

  let first_name = user.first_name
  if (!first_name) {
    first_name = 'UNREGISTERED'
  }

  let message = `Hi, ${first_name} (${votingPower})`

  const isLoggedOut = Object.keys(user).length === 0

  if (isLoggedOut) {
    message = 'JOIN'
  }

  return (
    <MediaQuery maxWidth={740}>
      {smallScreen => (
        smallScreen ? (
          <MenuSmall dispatch={dispatch} history={history} isLoggedOut={isLoggedOut} message={message} numRequests={numRequests} style={style} />
        ) : (
          <MenuFull dispatch={dispatch} history={history} isLoggedOut={isLoggedOut} message={message} numRequests={numRequests} style={style} />
        )

      )}
    </MediaQuery>
  )
}

Menu.propTypes = {
  constituents: PropTypes.shape({}),
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  style: PropTypes.shape({}),
  user: PropTypes.shape({}),
  votingPower: PropTypes.number,
}

const mapStateToProps = state => ({
  constituents: state.constituents,
  user: state.user,
  votingPower: state.votingPower,
})

export default connect(mapStateToProps)(Menu)
