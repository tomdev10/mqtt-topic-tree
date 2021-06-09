import {useState} from 'react';
import './App.css';

import ConnectionStatus from './ConnectionStatus';
import ConnectorWrapper from './ConnectorWrapper';
import MessageLog from './MessageLog';

function App() {
  const [brokerUrl, setBrokerUrl] = useState();
  const [toggleTree, setToggleTree] = useState(false);
  const [subTopic, setSubTopic] = useState(false);

  const handleBrokerChange = (e) => {
    setBrokerUrl(e.target[0].value)
    setSubTopic(e.target[1].value)
  };

  const handleToggleTree = () => setToggleTree(!toggleTree);

  return (
    <div className="App">
      <ConnectorWrapper brokerUrlToUse={brokerUrl}>
        <ConnectionStatus onBrokerChange={handleBrokerChange} />
        <button onClick={handleToggleTree}>Toggle Tree</button>
        <MessageLog tree={toggleTree} subTopic={subTopic} />
      </ConnectorWrapper>
    </div>
  );
}

export default App;
