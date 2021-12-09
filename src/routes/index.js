import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import privateRoutes from './privateRoutes';
import publicRoutes from './publicRoutes';

import PublicRoute from './restrictions/PublicRoute';
import PrivateRoute from './restrictions/PrivateRoute';
import SplitRoute from './restrictions/SplitRoute';

export default function Routes(){

  const routes = [
    ...publicRoutes,
    ...privateRoutes,
  ]
 
  return (
    <Router>
      <Switch>
        {routes.map((route) => {

          // If route is private and has fallbacks
          if(route.auth && route.fallback){
            return <SplitRoute key={route.path} {...route} />
          }

            // If route is private
            if(route.auth){
            return <PrivateRoute key={route.path} {...route} />
          }

          // Otherwise, public route
          return <PublicRoute key={route.path} {...route} />

        })}
      </Switch>
    </Router>
  )
}