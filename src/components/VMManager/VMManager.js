import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {
  EuiSpacer,
  EuiTitle,
  EuiSuperSelect,
  EuiHealth,
  EuiButton,
} from '@elastic/eui';
import axios from 'axios';

function Dashboard({ history }) {
  const [machineType, setValue] = useState(options[0].value);
  const [loading, setLoading] = useState(false);

  const onChange = (machineType) => {
    setValue(machineType);
  };

  const createVM = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:4000/api/v1/vms', { machineType });
    } catch (err) {
      console.log("TODO: ERR: ", err)
      return
    }
    setLoading(false);
    history.push("/dashboard")
  };

  return (
    <>
      <EuiTitle size="l">
        <h3>Select an Operating System</h3>
      </EuiTitle>
      <EuiSpacer size="l" />
      <EuiSuperSelect
        options={options}
        valueOfSelected={machineType}
        onChange={(machineType) => onChange(machineType)}
      />
      <EuiSpacer size="l" />
      <EuiButton fill color="primary" onClick={createVM} disabled={loading}>
        Create
      </EuiButton>
    </>
  );
}

export default withRouter(Dashboard);

const options = [
  {
    value: 'ubuntu-18.04-bionic',
    inputDisplay: (
      <EuiHealth color="success" style={{ lineHeight: 'inherit' }}>
        ubuntu-18.04-bionic
      </EuiHealth>
    ),
  },
  {
    value: 'macOS-64-bit',
    inputDisplay: (
      <EuiHealth color="subdued" style={{ lineHeight: 'inherit' }}>
        macOS-64-bit
      </EuiHealth>
    ),
    disabled: true,
  },
  {
    value: 'windows',
    inputDisplay: (
      <EuiHealth color="subdued" style={{ lineHeight: 'inherit' }}>
        windows-64-bit
      </EuiHealth>
    ),
    disabled: true,
  },
];