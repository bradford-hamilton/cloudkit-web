import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { EuiTitle, EuiButton, EuiSpacer, EuiEmptyPrompt } from '@elastic/eui';
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

      setVMData(result.data.vms);
    };
 
    fetchVMs();
  }, []);

  return (
    <>
      {VMData ? (
        <>
          <EuiTitle size="l">
            <h3>Your VMs</h3>
          </EuiTitle>
          <ul>
            {VMData.vms.map(vm => (
              <li key={vm.id}>
                {vm.name}
              </li>
            ))}
          </ul>
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