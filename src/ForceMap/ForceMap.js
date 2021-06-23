import React, { createRef, useEffect } from 'react';
import renderMindMap from './renderMindMap';

export default function ForceMap({messages}) {
  const divRef = createRef();
  let nodes = [];
  let links = [];
  let noOfLevels = [];

  function checkIfArrayContainsNode(arr, id, level) {
    return arr.some(function(arrVal) {
      return id === arrVal.id && arrVal.level === level;
    });
  }

  function checkIfArrayContainsLink(arr, id, parent) {
    return arr.some(function(arrVal) {
      return id === arrVal.target && arrVal.source === parent;
    });
  }

  const generateTopicNameFrom = (messageTopic,index) => {
    let splitArray = messageTopic.split('/');
    splitArray.length = index +1;
    return splitArray.join('/')
  };

  /*eslint-disable*/
  const enrichDataForTree = (messages) => {
    Object.keys(messages).map(messageTopic => {
      const arrayOfTopicLevels = messageTopic.split('/');
      arrayOfTopicLevels.map((singleNode, index) => {

        const contentToUse = index === arrayOfTopicLevels.length - 1 ? messages[messageTopic]: null;
        const idToUse = index === messageTopic.split('/').length -1 ? messageTopic : generateTopicNameFrom(messageTopic, index);
        const parentIdToUse = index === 0 ? 'broker' : generateTopicNameFrom(messageTopic, index -1);
        if (index+1 > noOfLevels) noOfLevels = index+1;
        if (!checkIfArrayContainsNode(nodes,idToUse,index+1)) {
          if (contentToUse) {
            nodes.push({id: idToUse , displayName: messageTopic.split('/')[index], level: index +1 , attributes: {payload: contentToUse}});
          } else {
            nodes.push({id: idToUse , displayName: messageTopic.split('/')[index], level: index +1});
          }
        }
        if (!checkIfArrayContainsLink(links,idToUse,parentIdToUse)) {
          links.push({ source: parentIdToUse, target: idToUse, level: index })
        }
      })
    })
    nodes.push({id: 'broker' , displayName: 'broker', level: 0, content: null})
  };


  enrichDataForTree(messages);
  console.log(nodes);
  console.log(links);
 
  useEffect(() => renderMindMap(divRef.current, {nodes, links}, noOfLevels /1000), [divRef]);
  return <div ref={divRef} />;
}
