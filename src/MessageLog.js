import React, {useEffect,useState} from 'react';
import { useSubscription } from 'mqtt-react-hooks';
import JSONTree from 'react-json-tree';

// import NetworkExplorer from './charts/NetworkExplorer/NetworkExplorer';
// import TreeMap from './charts/TreeMap/TreeMap';
// import VisChart from './charts/VisChart/VisChart';
// import RadialTree from './charts/RadialTree/RadialTree';
// import TreeExplorer from './charts/TreeExplorer/TreeExplorer';


const NetworkExplorer = React.lazy(() => import('./charts/NetworkExplorer/NetworkExplorer'));
const TreeMap = React.lazy(() => import('./charts/TreeMap/TreeMap'));
const VisChart = React.lazy(() => import('./charts/VisChart/VisChart'));
const RadialTree = React.lazy(() => import('./charts/RadialTree/RadialTree'));
const TreeExplorer = React.lazy(() => import('./charts/TreeExplorer/TreeExplorer'));
const Sunburst = React.lazy(() => import('./charts/Sunburst/Sunburst'));

export default function MessageLog({view, subTopic}) {
  /* Message structure:
  *  topic: string
  *  message: string
  */
  const { message } = useSubscription(subTopic || '#');
  const [messages, setMessages] = useState([]);
  const [messagesObj, setMessagesObj] = useState([]);
 

  useEffect(() => {
    if (message) setMessages((msgs) => [...msgs, message]);
  }, [message]);

  useEffect(()=>{
    if (messages) {
      const result = messages.reduce((obj, cur) => ({...obj, [cur.topic]: cur.message}), {})
      setMessagesObj(result);
    }
  },[messages, setMessagesObj]);

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {view === 'tree' && <TreeExplorer messages={messagesObj} />}
      {view === 'network' && <NetworkExplorer messages={messagesObj} />}
      {view === 'map' && <TreeMap messages={messagesObj} />}
      {view === 'vis' && <VisChart messages={messagesObj} />}
      {view === 'radial' && <RadialTree messages={messagesObj} />}
      {view === 'sun' && <Sunburst messages={messagesObj} />}
      <hr />
      {messages.length > 0 && <JSONTree data={messages} />}
    </React.Suspense>
  );



  }
