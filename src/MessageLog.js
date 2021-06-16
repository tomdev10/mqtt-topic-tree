import React, {useEffect,useState} from 'react';
import TreeExplorer from './TreeExplorer';
import { useSubscription } from 'mqtt-react-hooks';
import JSONTree from 'react-json-tree'
import NetworkExplorer from './NetworkExplorer';
import Treemap from './Treemap';

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
      {view === 'map' && <Treemap messages={messagesObj} />}
      <hr />
      {messages.length > 0 && <JSONTree data={messages} />}
    </>
  );



  }
