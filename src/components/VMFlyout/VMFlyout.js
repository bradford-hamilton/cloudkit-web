import React, { useState } from 'react';
import {
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiIcon,
  EuiText,
  EuiTitle,
  EuiCodeBlock,
  EuiCopy,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
} from '@elastic/eui';
import './VMFlyout.scss'

const VMFlyout = ({ cloudKitIP, vmIP }) => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);

  let flyout;

  const sshInstructions = `ssh -J root@${cloudKitIP} ubuntu@${vmIP}`;

  if (isFlyoutVisible) {
    flyout = (
      <EuiFlyout
        ownFocus
        onClose={() => setIsFlyoutVisible(false)}
        aria-labelledby="flyoutTitle"
      >
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h2 id="flyoutTitle">
              Welcome to your Ubuntu VM
            </h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          <EuiText>
            <p>
              Copy the SSH jump command below to access your virtual machine.
            </p>
          </EuiText>
          <EuiSpacer size="l" />
          <EuiFlexGroup justifyContent="spaceEvenly" alignItems="center">
            <EuiFlexItem>
              <EuiCodeBlock language="html">
                {sshInstructions}
              </EuiCodeBlock>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiCopy textToCopy={`ssh -J root@${cloudKitIP} ubuntu@${vmIP}`}>
                {(copy) => (
                  <EuiIcon type="copyClipboard" color="secondary" onClick={copy} size="l" className="icon" />
                )}
              </EuiCopy>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlyoutBody>
      </EuiFlyout>
    );
  }

  return (
    <div>
      <EuiButton size="s" color="secondary" onClick={() => setIsFlyoutVisible(true)}>
        Get Started
      </EuiButton>
      {flyout}
    </div>
  );
};

export default VMFlyout;