import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { EuiTitle, EuiButton, EuiSpacer, EuiEmptyPrompt, EuiBasicTable, EuiLink, EuiHealth } from '@elastic/eui';
import axios from 'axios';

function Dashboard({ history }) {
  const [VMData, setVMData] = useState({ vms: [] });

  useEffect(() => {
    const fetchVMs = async () => {
      let result;

      try {
        result = await axios('http://localhost:4000/api/v1/vms');
      } catch (err) {
        console.log("TODO: ERR: ", err)
        return
      }

      setVMData(result.data);
    };
 
    fetchVMs();
  }, []);

  return (
    <>
      {VMData?.data?.vms?.length > 0 ? (
        <>
          <EuiTitle size="l">
            <h3>Your VMs</h3>
          </EuiTitle>
          <EuiSpacer size="l" />
          <EuiSpacer size="l" />
          <EuiBasicTable
            items={VMData.data.vms}
            columns={columns}
          />
          <EuiSpacer size="l" />
          <EuiButton color="primary" fill onClick={() => history.push("/vm-manager")}>
            Add a VM
          </EuiButton>
        </>
      ) : (
        <>
          <EuiSpacer size="l" />
          <EuiEmptyPrompt
            iconType="compute"
            title={<h2>No currently running VMs</h2>}
            body={
              <p>
                Use CloudKit to manage your fleet of machines. Start by clicking
                the button below to run your first Virtual Machine.
              </p>
            }
            actions={
              <EuiButton color="primary" fill onClick={() => history.push("/vm-manager")}>
                Spin up a VM
              </EuiButton>
            }
          />
        </>
      )}
      <EuiSpacer size="l" />
    </>
  );
}

export default withRouter(Dashboard);

const columns = [
  {
    field: 'id',
    name: 'ID',
    sortable: true,
  },
  {
    field: 'name',
    name: 'Name',
    sortable: true,
  },
  {
    field: 'ip',
    name: 'IP Address (private)',
    sortable: true,
  },
  {
    field: 'mac',
    name: 'MAC Address',
    sortable: true,
  },
  {
    field: 'mem',
    name: 'Total Memory',
    sortable: true,
  },
  {
    field: 'current_mem',
    name: 'Remaining Memory',
    render: (num) => {
      return num + " Kib"
    },
    sortable: true,
  },
  {
    field: 'state',
    name: 'State',
    render: (state) => {
      let color = 'danger';
      let msg = 'unknown';

      if (state === 'running') {
        color = 'success'
        msg = 'running'
      } else if (state === 'paused') {
        color = 'warning'
        msg = 'paused'
      } else if (state === 'off') {
        color = 'warning'
        msg = 'off'
      }

      return <EuiHealth color={color}>{msg}</EuiHealth>;
    },
  },
];