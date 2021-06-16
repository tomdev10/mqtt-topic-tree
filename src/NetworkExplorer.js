import React from 'react';
import { ResponsiveNetworkCanvas } from '@nivo/network'
// import { linkHorizontal, linkVertical } from 'd3-shape';

let tree =[];
let links = [];

const stylingForDepth = (depth) => {
  if (depth === 1) return {"radius": 12, "depth": depth, "color": "#ff0000"}
  if (depth === 2) return {"radius": 8, "depth": depth, "color": "#00ff00"}
  if (depth === 3) return {"radius": 6, "depth": depth, "color": "#0000ff"}
  if (depth === 4) return {"radius": 4, "depth": depth, "color": "pink"}
  if (depth === 5) return {"radius": 3, "depth": depth, "color": "#ffbb00"}
}

const generateTopicNameFrom = (messageTopic,index) => {
  let splitArray = messageTopic.split('/');
  splitArray.length = index +1;
  return splitArray.join('/')
};

function checkIfArrayContainsNode(arr, id) {
  return arr.some(function(arrVal) {
    return id === arrVal.id;
  });
}

const addNodesToTree = (messages) => {
  Object.keys(messages).map(messageTopic => {
    const arrayOfTopicLevels = messageTopic.split('/'); 
    arrayOfTopicLevels.map((singleNode, index) => {  
      if (!checkIfArrayContainsNode(tree,generateTopicNameFrom(messageTopic, index))) {
        tree.push({
          "id": generateTopicNameFrom(messageTopic, index),
          ...stylingForDepth(index +2)
        })
        links.push({
          "source": index === 0 ? 'root' : generateTopicNameFrom(messageTopic, index -1),
          "target": generateTopicNameFrom(messageTopic, index),
          "distance": 30
        })
      }
    }) 
    })
};





const buildTree = (messages) => {
  addNodesToTree(messages);
  return tree
};

const NetworkExplorer = ({messages}) => {
  const dataForTree = buildTree(messages);
  return <div style={{height: 800, border: '5px solid black', margin: '5rem'}}>
    <ResponsiveNetworkCanvas
        nodes={[...dataForTree, {id: 'root' ,  ...stylingForDepth(1)}]}
        links={links}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        linkDistance="distance"
        repulsivity={37}
        iterations={60}
        nodeColor={function(e){return e.color}}
        nodeBorderWidth={1}
        nodeBorderColor={{ theme: 'background' }}
        linkColor="black"
        animate={false}
        tooltip={(node)=><span>{JSON.stringify(node)}</span>}
    />
  </div>;
}


export default NetworkExplorer;