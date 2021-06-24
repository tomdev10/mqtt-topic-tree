import React, {useEffect,useState} from 'react';
import { useSubscription } from 'mqtt-react-hooks';
import JSONTree from 'react-json-tree';

import NetworkExplorer from './charts/NetworkExplorer/NetworkExplorer';
import TreeMap from './charts/TreeMap/TreeMap';
import VisChart from './charts/VisChart/VisChart';
import RadialTree from './charts/RadialTree/RadialTree';
import TreeExplorer from './charts/TreeExplorer/TreeExplorer';

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
    <> 
      {view === 'tree' && <TreeExplorer messages={messagesObj} />}
      {view === 'network' && <NetworkExplorer messages={messagesObj} />}
      {view === 'map' && <TreeMap messages={messagesObj} />}
      {view === 'vis' && <VisChart messages={messagesObj} />}
      {view === 'radial' && <RadialTree messages={messagesObj} />}
      <hr />
      {messages.length > 0 && <JSONTree data={messages} />}
    </>
  );



  }
