import React from 'react';

import { useMqttState } from 'mqtt-react-hooks';

const ConnectorWrapper = ({onBrokerChange}) => {

  /*
  * Status list
  * - Offline
  * - Connected
  * - Reconnecting
  * - Closed
  * - Error: printed in console too
  */
  const { connectionStatus } = useMqttState();

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <h1>{`Status: ${connectionStatus}`}</h1>
      <form onSubmit={onBrokerChange} style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
        <label style={{display: 'flex',  justifyContent: 'space-between', width: '100%'}}>
          Broker URL:
          <input id="brokerUrl" />
        </label>
        <label style={{display: 'flex',  justifyContent: 'space-between', width: '100%'}}>
          Topic (will default to all):
          <input id="topicToSubTo" />
        </label>
        <button type="submit" >Use this broker</button>
      </form>
    </div>
  );
}
export default ConnectorWrapper