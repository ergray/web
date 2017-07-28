import React, { Component } from 'react'
import { View } from 'react-native'
import MediaQuery from 'react-responsive'

export default class SubscribeCTA extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
    }
  }

  render() {
    return (
      <MediaQuery maxWidth={450}>
        {verySmallScreen => (
          <View style={{ alignItems: 'center', backgroundColor: '#181e2b', padding: 60 }}>
            <label htmlFor="voter-email" style={{ color: '#eee', display: 'block', fontSize: 23, letterSpacing: -0.5, marginBottom: 25 }}>
              Subscribe for updates
            </label>
            <div id="subscribe-inputs" style={{ display: this.state.showConfirmation ? 'none' : 'block' }}>
              <input
                id="voter-email" placeholder="Email Address" style={{
                  border: this.state.voterEmailError ? '5px solid red' : '',
                  borderRadius: 2,
                  borderWidth: 0,
                  boxSizing: 'border-box',
                  color: '#2f2f2f',
                  fontSize: 12,
                  fontWeight: 'bold',
                  height: 40,
                  paddingLeft: this.state.voterEmailError ? 8 : 12,
                  width: 240,
                }} type="text" value={this.state.email}
                onChange={event => this.setState({ email: event.target.value })}
              />
              <input
                id="btn-subscribe" style={{
                  backgroundColor: !this.state.submitHover ? '#2b71b1' : '#16548E',
                  border: 'none',
                  borderRadius: 2,
                  boxSizing: 'border-box',
                  color: 'white',
                  cursor: !this.state.submitHover ? '' : 'pointer',
                  display: verySmallScreen ? 'block' : '',
                  fontWeight: 'bold',
                  height: 40,
                  margin: verySmallScreen ? '15px auto' : '',
                  padding: '0 12px',
                  textTransform: 'uppercase',
                  WebkitAppearance: null,
                }} type="submit" value="Subscribe" onClick={() => {
                  fetch('https://api.liquid.vote/subscribe', {
                    body: JSON.stringify({
                      email: this.state.email,
                    }),
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    method: 'POST',
                  })
                  .then((response) => {
                    // Success
                    if (response.status === 201) {
                      this.setState({ showConfirmation: true })
                    }

                    // Already subscribed, show confirmation anyway
                    if (response.status === 409) {
                      this.setState({ showConfirmation: true })
                    }

                    // Server reports invalid email
                    if (response.status === 400) {
                      this.setState({ voterEmailError: true })
                    }
                  })
                }}
                onMouseEnter={() => this.setState({ submitHover: true })}
                onMouseLeave={() => this.setState({ submitHover: false })}
              />
            </div>

            { this.state.showConfirmation && (
              <p id="subscribe-confirmation" style={{ color: '#eee' }}> &#10004; Subscribed</p>
            ) }
          </View>
        )}
      </MediaQuery>
    )
  }
}

/*
.subscribe-cta
  input[type="submit"]
    &:hover
      background-color: #16548E
      cursor: pointer
*/
