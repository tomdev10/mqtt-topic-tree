import React from 'react';
import NetworkFrame from "semiotic/lib/NetworkFrame"

let tree = [];

function checkIfArrayContainsNode(arr, name, parent) {
  return arr.some(function(arrVal) {
    return name === arrVal.name && arrVal.parentId === parent;
  });
}

function checkIfChildArrContainsNode(arr, name) {
  return arr.some(function(arrVal) {
    return name === arrVal.name;
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
      
      const parentIdToUse = index === 0 ? 'broker' : generateTopicNameFrom(messageTopic, index -1);
      const contentToUse = index === arrayOfTopicLevels.length - 1 ? messages[messageTopic]: null;

      const idToUse = parentIdToUse !== 'broker' ? (index === messageTopic.split('/').length -1 ? messageTopic : generateTopicNameFrom(messageTopic, index)) : messageTopic.split('/')[index];

      if (!checkIfArrayContainsNode(tree,idToUse,parentIdToUse)) {
        contentToUse ? tree.push({name: idToUse , displayName: messageTopic.split('/')[index], parentId: parentIdToUse, attributes: {payload: contentToUse}}) : tree.push({name: idToUse , displayName: messageTopic.split('/')[index], parentId: parentIdToUse})
      }
    })
  })
  tree.push({name: 'broker' , displayName: 'broker', parentId: null, content: null})
};
 /*eslint-enable*/

 
const generateTree = (data) => {
  const idMapping = data.reduce((acc, el, i) => {
    acc[el.name] = i;
    return acc;
  }, {});


  let root;
  data.forEach(el => {
    // Handle the root element
    if (el.parentId === null) {
      root = el;
      return;
    }
    // Use our mapping to locate the parent element in our data array
    const parentEl = data[idMapping[el.parentId]];
     //Add our current el to its parent's `children` array
     if (parentEl.children) {
      if (!checkIfChildArrContainsNode(parentEl.children,el.name)) {
        parentEl.children = [...(parentEl.children || []), el]
       }
     } else {
        parentEl.children = [...[], el]
     }
      
  });
  return root;
}




const buildTree = (messages) => {
  enrichDataForTree(messages);
  const generatedTree = generateTree(tree);
  return generatedTree
};

const frameProps = { 
    networkType: { type: "force", forceManyBody: -250, distanceMax: 500, edgeStrength: 2 },
    nodeIDAccessor: function(e){return e.hierarchicalID||e.name},
    edgeStyle: { stroke: "#9fd0cb", fill: "none" },
    nodeSizeAccessor: 2
  }

const NetworkExplorer = ({messages}) => {
  const dataForTree = buildTree(messages);
  return <div style={{height: 800, border: '5px solid black', margin: '5rem', padding: '5rem'}}>
    <NetworkFrame 
      edges={dataForTree}  
      hoverAnnotation={true}
      download={true}
      tooltipContent={d =>  (
        <div className="p-2 shadow-md text-xs z-10 bg-white">
          <p className="font-bold">{d.attributes?.payload ? `Topic: ${d.name}` : `Tree: ${d.name}`}</p>
          {d.attributes?.payload && <p>Message: {d.attributes?.payload}</p>}
        </div> 
    )} 
    {...frameProps} 
    />
  </div>;
}


export default NetworkExplorer;