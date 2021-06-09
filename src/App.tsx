import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'

import GlobalStyle from './styles/global'
import Routes from './routes'
import AppProvider from './hooks'

const App: React.FC = () => (
  <Router>
    <AppProvider>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Routes />
      </QueryParamProvider>
    </AppProvider>
    <GlobalStyle />
  </Router>
)

export default App
