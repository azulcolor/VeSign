import React from 'react'
import Router from 'next/router'

import useAuth from '../../../../hooks/components/auth/useAuth'

const authenticatedRouteLogin = (Component = null, options = {}) => {
  class AuthenticatedRoute extends React.Component {
    state = {
      loading: true,
    }

    async componentDidMount() {
      const { isLogged } = useAuth()
      const isLoggedIn = await isLogged()

      if (isLoggedIn) {
        Router.push(options.path || '/admin/shipments')
      } else {
        this.setState({ loading: false })
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

export default authenticatedRouteLogin 