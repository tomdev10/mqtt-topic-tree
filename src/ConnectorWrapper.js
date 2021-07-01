import React from 'react';
import { Connector } from 'mqtt-react-hooks';

const ConnectorWrapper = ({children, brokerUrlToUse, clientId, username, password}) => {
  return brokerUrlToUse ? <Connector brokerUrl={brokerUrlToUse} options={{keepalive: 0, clientId, username, password, rejectUnauthorized: false}}>{children}</Connector> : <>{children}</>;
}

export default ConnectorWrapper;

