import React, { useState, useEffect } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import {
  EuiTitle,
  EuiSpacer,
  EuiLoadingChart,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiFlexGroup,
  EuiCodeBlock,
  EuiCopy,
  EuiIcon
} from '@elastic/eui';
import VMChart from '../../components/VMChart/VMChart';
import axios from 'axios';
import './VMView.scss';

function VMView() {
  const { id } = useParams();
  const [VM, setVM] = useState({vm:{}});

  useEffect(() => {
    const fetchVMMetadata = async () => {
      let result;

      try {
        result = await axios(`http://localhost:4000/api/v1/vms/${id}`);
      } catch (err) {
        console.log("TODO: ERR: ", err)
        return
      }

      setVM(result.data);
    };
 
    fetchVMMetadata();
  }, [id]);

  const cloudKitIP = '157.245.225.232';
  const sshInstructions = `ssh -J root@${cloudKitIP} ubuntu@${VM?.data?.vm?.ip}`;

  return (
    <>
      {VM?.data?.vm?.id ? (
        <>
          <EuiTitle size="m">
            <h3>
              {VM.data.vm.name}
            </h3>
          </EuiTitle>
          <EuiSpacer size="l" />
          <EuiHorizontalRule size="full" />
          <EuiSpacer size="l" />
          <EuiTitle size="s">
            <h5>Access your VM</h5>
          </EuiTitle>
          <EuiSpacer size="l" />
          <EuiFlexGroup justifyContent="spaceEvenly" alignItems="center">
            <EuiFlexItem>
              <EuiCodeBlock language="html">
                {sshInstructions}
              </EuiCodeBlock>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiCopy textToCopy={sshInstructions}>
                {(copy) => (
                  <EuiIcon
                    type="copyClipboard"
                    color="secondary"
                    onClick={copy}
                    size="l"
                    className="icon"
                  />
                )}
              </EuiCopy>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer size="l" />
          <EuiHorizontalRule size="full" />
          <EuiSpacer size="l" />
          <EuiTitle size="s">
            <h5>Memory Usage</h5>
          </EuiTitle>
          <EuiSpacer size="l" />
          <EuiSpacer size="l" />
          <VMChart />
        </>
      ) : (
        <div className="loading">
          <EuiLoadingChart size="xl" />
        </div>
      )}
    </>
  );
}

export default withRouter(VMView);
