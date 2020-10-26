import React, { useState } from 'react';
import { EuiCollapsibleNav, EuiButton, EuiTitle, EuiSpacer, EuiText, EuiCode } from '@elastic/eui';
import './App.scss';

function App() {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [navIsDocked, setNavIsDocked] = useState(false);

  return (
    <>
      <EuiCollapsibleNav
        isOpen={navIsOpen}
        isDocked={navIsDocked}
        button={
          <EuiButton onClick={() => setNavIsOpen(!navIsOpen)}>
            Toggle nav
          </EuiButton>
        }
        onClose={() => setNavIsOpen(false)}>
        <div style={{ padding: 16 }}>
          <EuiTitle>
            <h2>I am some nav</h2>
          </EuiTitle>
          <EuiSpacer />
          <EuiButton
            onClick={() => {
              setNavIsDocked(!navIsDocked);
            }}>
            Docked: {navIsDocked ? 'on' : 'off'}
          </EuiButton>
        </div>
      </EuiCollapsibleNav>

      {navIsDocked && (
        <EuiText size="s" color="subdued">
          <p>
            The button gets hidden by default when the nav is docked unless you
            set <EuiCode language="js">showButtonIfDocked = true</EuiCode>.
          </p>
        </EuiText>
      )}
    </>
  );
}

export default App;
