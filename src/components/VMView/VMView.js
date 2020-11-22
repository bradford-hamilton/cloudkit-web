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
  const { domain_id } = useParams();
  const [VM, setVM] = useState({ vm: {}, memory_usage: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVMMetadata = async () => {
      setLoading(true);
      let result;

      try {
        result = await axios(`http://localhost:4000/api/v1/vms/${domain_id}`);
      } catch (err) {
        console.log("TODO: ERR: ", err)
        return
      }

      setVM(result.data.data);
      setLoading(false);
    };

    fetchVMMetadata();
  }, [domain_id]);

  const cloudKitIP = '157.245.225.232';
  const sshInstructions = `ssh -J root@${cloudKitIP} ubuntu@${VM?.vm?.ip}`;

  return (
    <>
      {loading ? (
        <div className="loading">
          <EuiLoadingChart size="xl" />
        </div>
      ) : (
        <>
          <EuiTitle size="m">
            <h3>
              {VM?.data?.vm?.name}
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
          <VMChart memUsage={VM.memory_usage} />
        </>        
      )}
    </>
  );
}

export default withRouter(VMView);
