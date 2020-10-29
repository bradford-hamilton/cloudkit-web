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

  const onChange = (machineType) => {
    setValue(machineType);
  };

  const createVM = async () => {
    try {
      await axios.post('http://localhost:4000/api/v1/vms', { machineType });
    } catch (err) {
      console.log("TODO: ERR: ", err)
      return
    }
    history.push("/dashboard")
  };

  return (
    <>
      <EuiTitle size="l">
        <h3>Select your machine</h3>
      </EuiTitle>
      <EuiSpacer size="l" />
      <EuiSuperSelect
        options={options}
        valueOfSelected={machineType}
        onChange={(machineType) => onChange(machineType)}
      />
      <EuiSpacer size="l" />
      <EuiButton fill color="primary" onClick={createVM}>
        Create
      </EuiButton>
    </>
  );
}

export default withRouter(Dashboard);

const options = [
  {
    value: 'linux-64-bit',
    inputDisplay: (
      <EuiHealth color="success" style={{ lineHeight: 'inherit' }}>
        linux-64-bit
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