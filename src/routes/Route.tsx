import React from 'react'
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect
} from 'react-router-dom'

import DefaultLayout from '../pages/_layouts/default'

import { useAuth } from '../hooks/auth'

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean
  component: React.ComponentType
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { userLogged } = useAuth()
  const Layout = DefaultLayout

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        if (isPrivate && userLogged()) {
          return (
            <Layout>
              <Component />
            </Layout>
          )
        }
        return isPrivate === !!userLogged() ? (
          <Component />
            ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location }
            }}
          />
            )
      }}
    />
  )
}

export default Route
