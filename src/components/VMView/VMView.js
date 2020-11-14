import React, { useState, useEffect } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { EuiTitle, EuiSpacer, EuiLoadingChart } from '@elastic/eui';
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
