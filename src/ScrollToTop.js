import PropTypes from 'prop-types'
import { Component } from 'react'

export default class ScrollToTop extends Component {
  componentDidMount() {
    window.scrollTo(0, 0) // eslint-disable-line
  }

  render() {
    return this.props.children
  }
}

ScrollToTop.propTypes = {
  children: PropTypes.element,
}
