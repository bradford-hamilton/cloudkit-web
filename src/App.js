import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";
import { EuiCollapsibleNav, EuiTitle, EuiSpacer } from '@elastic/eui';
import Dashboard from './components/Dashboard/Dashboard'
import VMManager from './components/VMManager/VMManager'
import './App.scss';

function App() {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [navIsDocked, _setNavIsDocked] = useState(true);

  return (
    <Router>
      <div className="page-wrapper">
        <EuiCollapsibleNav
          className="collapsible-nav"
          isOpen={navIsOpen}
          isDocked={navIsDocked}
          // button={
          //   <EuiButton onClick={() => setNavIsOpen(!navIsOpen)}>
          //     Toggle nav
          //   </EuiButton>
          // }
          onClose={() => setNavIsOpen(false)}>
          <div style={{ padding: 16 }}>
            <EuiTitle>
              <Link to="/dashboard">
                <h2>CloudKit</h2>
              </Link>
            </EuiTitle>
            <EuiSpacer size="l"/>
            {/* <EuiButton
              onClick={() => {
                setNavIsDocked(!navIsDocked);
              }}>
              Docked: {navIsDocked ? 'on' : 'off'}
            </EuiButton> */}
          </div>
        </EuiCollapsibleNav>
      </div>
      <Switch>
        <Redirect
          from='/'
          to="/dashboard"
          exact
        />
        <Route
          path="/dashboard"
          exact
        >
          <Dashboard />
        </Route>
        <Route
          path="/vm-manager"
          exact
        >
          <VMManager />
        </Route>
        <Route
          path="*"
          component={NoMatch}
        />
      </Switch>
    </Router>
  );
}

function NoMatch() {
  return <h1>Four Oh Four</h1>
}

export default App;
