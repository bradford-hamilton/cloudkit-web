import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
  EuiSpacer,
  EuiTitle,
  EuiSuperSelect,
  EuiText,
  EuiButton,
} from '@elastic/eui';
import MachineSelect from '../../components/MachineSelect/MachineSelect';
import axios from 'axios';

function Dashboard({ history }) {
  const [machineType, setMachineType] = useState('');
  const [memory, setMemory] = useState(2);
  const [vcpus, setVcpus] = useState(1);
  const [loading, setLoading] = useState(false);

  const changeMem = (memory) => {
    setMemory(memory);
  };

  const changeVcpus = (compute) => {
    setVcpus(compute);
  };

  const toggleMachine = (selected) => {
    selected ? setMachineType('ubuntu-18.04-bionic') : setMachineType('');
  };

  const createVM = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:4000/api/v1/vms', {
        machineType,
        memory,
        vcpus,
      });
    } catch (err) {
      console.log("TODO: ERR: ", err)
      return
    }
    setLoading(false);
    history.push("/dashboard")
  };

  return (
    <>
      <EuiSpacer size="l" />
      <EuiTitle size="m">
        <h3>Operating System</h3>
      </EuiTitle>
      <EuiSpacer size="l" />
      <MachineSelect toggleMachine={toggleMachine} />
      <EuiSpacer size="xl" />
      <EuiTitle size="m">
        <h3>Memory</h3>
      </EuiTitle>
      <EuiSpacer size="l" />
      <EuiSuperSelect
        options={memoryOptions}
        valueOfSelected={memory}
        onChange={(memory) => changeMem(memory)}
        itemLayoutAlign="top"
        hasDividers
      />
      <EuiSpacer size="l" />
      <EuiTitle size="m">
        <h3>vCPUs</h3>
      </EuiTitle>
      <EuiSpacer size="l" />
      <EuiSuperSelect
        options={vcpusOptions}
        valueOfSelected={vcpus}
        onChange={(vcpus) => changeVcpus(vcpus)}
        itemLayoutAlign="top"
        hasDividers
      />
      <EuiSpacer size="l" />
      <EuiButton
        fill
        color="primary"
        onClick={createVM}
        disabled={machineType === '' || loading}
      >
        Create
      </EuiButton>
    </>
  );
}

export default withRouter(Dashboard);

const memoryOptions = [
  {
    value: 1,
    inputDisplay: '1 GB',
    dropdownDisplay: (
        <>
          <strong>1 GB</strong>
          <EuiText size="s" color="subdued">
            <p className="euiTextColor--subdued">
              Basic workflows.
            </p>
          </EuiText>
        </>
      ),
  },
  {
    value: 2,
    inputDisplay: '2 GB',
    dropdownDisplay: (
        <>
          <strong>2 GB</strong>
          <EuiText size="s" color="subdued">
            <p className="euiTextColor--subdued">
              Little extra umph.
            </p>
          </EuiText>
        </>
      ),
  },
  {
    value: 4,
    inputDisplay: '4 GB',
    dropdownDisplay: (
        <>
          <strong>4 GB</strong>
          <EuiText size="s" color="subdued">
            <p className="euiTextColor--subdued">
              Larger workloads, web apps.
            </p>
          </EuiText>
        </>
      ),
  },
  {
    value: 8,
    inputDisplay: '8 GB',
    dropdownDisplay: (
        <>
          <strong>8 GB</strong>
          <EuiText size="s" color="subdued">
            <p className="euiTextColor--subdued">
              Now we're cooking with fire.
            </p>
          </EuiText>
        </>
      ),
  },
];


const vcpusOptions = [
  {
    value: 1,
    inputDisplay: '1 vCPU',
    dropdownDisplay: (
        <>
          <strong>1 vCPU</strong>
          <EuiText size="s" color="subdued">
            <p className="euiTextColor--subdued">
              Just exploring.
            </p>
          </EuiText>
        </>
      ),
  },
  {
    value: 2,
    inputDisplay: '2 vCPU',
    dropdownDisplay: (
        <>
          <strong>2 vCPU</strong>
          <EuiText size="s" color="subdued">
            <p className="euiTextColor--subdued">
              Not too bad!
            </p>
          </EuiText>
        </>
      ),
  },
  {
    value: 4,
    inputDisplay: '4 vCPU',
    dropdownDisplay: (
        <>
          <strong>4 vCPU</strong>
          <EuiText size="s" color="subdued">
            <p className="euiTextColor--subdued">
              Lets rip!
            </p>
          </EuiText>
        </>
      ),
  },
];

