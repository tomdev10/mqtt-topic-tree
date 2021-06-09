import React from 'react';
import { Connector } from 'mqtt-react-hooks';

const ConnectorWrapper = ({children, brokerUrlToUse}) => {
  return brokerUrlToUse ? <Connector brokerUrl={brokerUrlToUse} options={{keepalive: 0}}>{children}</Connector> : <>{children}</>;
}

export default ConnectorWrapper;

