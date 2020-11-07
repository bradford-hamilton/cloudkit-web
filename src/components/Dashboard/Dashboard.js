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
    field: 'ID',
    name: 'VM ID',
    sortable: true,
  },
  {
    field: 'Name',
    name: 'VM Name',
    sortable: true,
  },
  {
    field: 'online',
    name: 'Online',
    dataType: 'boolean',
    render: (online) => {
      online = true;
      const color = online ? 'success' : 'danger';
      const label = online ? 'Online' : 'Offline';
      return <EuiHealth color={color}>{label}</EuiHealth>;
    },
  },
];