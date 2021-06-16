import {useState,useEffect} from 'react';


import ConnectionStatus from './ConnectionStatus';
import ConnectorWrapper from './ConnectorWrapper';
import Instructions from './Instructions';
import MessageLog from './MessageLog';

function App() {
  const [brokerUrl, setBrokerUrl] = useState();
  const [toggleTree, setToggleTree] = useState(false);
  const [subTopic, setSubTopic] = useState(false);

  const handleBrokerChange = (e) => {
    e.preventDefault();
    if (e.target[0].value !== "") {
      setBrokerUrl(e.target[0].value)
      setSubTopic(e.target[1].value)
    }
  };

  useEffect(()=>{
    if (brokerUrl) document.getElementById('brokerUrl').value = brokerUrl;
    if (subTopic) document.getElementById('topicToSubTo').value = subTopic;
  },[brokerUrl,subTopic]);

  const handleToggleTree = () => setToggleTree(!toggleTree);

  return (
    <div className="App">
      <ConnectorWrapper brokerUrlToUse={brokerUrl}>
        <Instructions />
        <ConnectionStatus onBrokerChange={handleBrokerChange} handleToggleTree={handleToggleTree} />
        <MessageLog tree={toggleTree} subTopic={subTopic} />
      </ConnectorWrapper>
    </div>
  );
}

export default App;
