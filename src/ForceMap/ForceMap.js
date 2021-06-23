import React, { createRef, useEffect } from 'react';
import renderMindMap from './renderMindMap';

export default function ForceMap({messages}) {
  console.log(Object.keys(messages));
  const divRef = createRef();


  function checkIfArrayContainsNode(arr, name, level) {
    return arr.some(function(arrVal) {
      return name === arrVal.name && arrVal.level === level;
    });
  }

  const generateTopicNameFrom = (messageTopic,index) => {
    let splitArray = messageTopic.split('/');
    splitArray.length = index +1;
    return splitArray.join('/')
  };

  /*eslint-disable*/
  const enrichDataForTree = (messages) => {
    let tempTree = [];
    Object.keys(messages).map(messageTopic => {
      const arrayOfTopicLevels = messageTopic.split('/');
      arrayOfTopicLevels.map((singleNode, index) => {
        const contentToUse = index === arrayOfTopicLevels.length - 1 ? messages[messageTopic]: null;
        const idToUse = index === messageTopic.split('/').length -1 ? messageTopic : generateTopicNameFrom(messageTopic, index);
        if (!checkIfArrayContainsNode(tempTree,idToUse,index)) {
          contentToUse ? tempTree.push({id: idToUse , displayName: messageTopic.split('/')[index], level: index +1 , attributes: {payload: contentToUse}}) : tempTree.push({id: idToUse , displayName: messageTopic.split('/')[index], level: index +1})
        }
      })
    })
    tempTree.push({id: 'broker' , displayName: 'broker', level: 0, content: null})
    return tempTree;
  };


  const formattedTree = enrichDataForTree(messages);
  console.log(formattedTree);
  // const generatedTree = generateTree(tree);
  // console.log(tree);

  useEffect(() => renderMindMap(divRef.current), [divRef]);
  return <div ref={divRef} />;
}
