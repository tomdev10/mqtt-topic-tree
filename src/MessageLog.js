import React, {useEffect,useState} from 'react';
import TreeExplorer from './TreeExplorer';
import { useSubscription } from 'mqtt-react-hooks';

export default function MessageLog({tree, subTopic}) {
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
      {tree && <TreeExplorer messages={messagesObj} />}
      <hr />
      <span>{JSON.stringify(messages)}</span>
    </>
  );



  }
