import React, { useState } from 'react';
import {
  EuiIcon,
  EuiCard,
  EuiFlexItem,
  EuiFlexGroup,
} from '@elastic/eui';

const MachineSelect = ({ toggleMachine }) => {
  const [cardSelected, setCard] = useState(false);

  const cardClicked = () => {
    toggleMachine(!cardSelected);
    setCard(!cardSelected);
  };

  return (
    <EuiFlexGroup gutterSize="l">
      <EuiFlexItem>
        <EuiCard
          icon={<EuiIcon
            type="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Logo-ubuntu_cof-orange-hex.svg/1024px-Logo-ubuntu_cof-orange-hex.svg.png"
            size="xxl"
            title="My SVG logo"
          />}
          title="Ubuntu"
          description="18.04 LTS (Bionic Beaver)"
          selectable={{
            onClick: cardClicked,
            isSelected: cardSelected,
          }}
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard
          icon={<EuiIcon
            type="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Apple_Computer_Logo_rainbow.svg/931px-Apple_Computer_Logo_rainbow.svg.png"
            size="xxl"
            title="My SVG logo"
          />}
          title="MacOS"
          description="Catalina 10.15.7 (64-bit)"
          selectable={{ isDisabled: true }}
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard
          icon={<EuiIcon size="xxl" type="logoWindows" />}
          title="Windows 10"
          description="64-bit"
          selectable={{ isDisabled: true }}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default MachineSelect;