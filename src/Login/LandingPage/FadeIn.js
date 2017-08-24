import React, { Component } from 'react'

export default class FadeIn extends Component {
  constructor() {
    super()
    this.state = {
      numVisible: 0,
    }
  }

  componentDidMount() {
    const numChildren = React.Children.count(this.props.children)
    let numVisible = this.state.numVisible
    const interval = setInterval(() => {
      numVisible += 0.3
      if (numVisible > numChildren) { clearInterval(interval) }

      this.setState({ numVisible })
    }, 200)
  }

  render() {
    const duration = 0.5
    return (
      <div>
        {React.Children.map(this.props.children, (child, i) => (
          <div style={{
            opacity: this.state.numVisible > i ? 1 : 0,
            position: 'relative',
            top: this.state.numVisible > i ? 0 : 20,
            transition: `opacity ${duration}s, top ${duration}s`,
          }}
          >
            {child}
          </div>
        ))}
      </div>
    )
  }
}

FadeIn.propTypes = {
  children: React.PropTypes.node,
}
