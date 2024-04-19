import React from 'react'
import Router from 'next/router'

import useAuth from '../../../../hooks/components/auth/useAuth'

const authenticatedRoute = (Component = null, options = {}) => {
  class AuthenticatedRoute extends React.Component {
    state = {
      loading: true,
    }

    async componentDidMount() {
      const { isLogged } = useAuth()
      const isLoggedIn = await isLogged()

      if (isLoggedIn) {
        this.setState({ loading: false })
      } else {
        Router.push(options.pathAfterFailure || '/auth/login')
      }
    }

    render() {
      const { loading } = this.state

      if (loading) {
        return <div />
      }

      return <Component {...this.props} />
    }
  }

  return AuthenticatedRoute
}

export default authenticatedRoute
