import React from 'react';
import {Sunburst as SunburstChart, Hint} from 'react-vis';


let tree = [];
 
const colours = {1: '#ff0000', 2: '#fff000', 3: '#00ff00', 4: '#0000ff', 0: '#ffaaf0'}

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
        contentToUse ? tree.push({name: idToUse , title: messageTopic.split('/')[index], parentId: parentIdToUse, size: 100, color: colours[index],attributes: {payload: contentToUse}}) : tree.push({name: idToUse , title: messageTopic.split('/')[index], parentId: parentIdToUse,color: colours[index]})
      }
    })
  })
  tree.push({name: 'broker' , title: 'broker', parentId: null, content: null, "color": "#12939A"})
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




const Sunburst = ({messages}) => {
    const dataForTree = buildTree(messages);
    const [hoveredCell, setHoveredCell] = React.useState();
    function buildValue(hoveredCell) {
        const {radius, angle, angle0} = hoveredCell;
        const truedAngle = (angle + angle0) / 2;
        return {
          x: radius * Math.cos(truedAngle),
          y: radius * Math.sin(truedAngle)
        };
      }

    return <div className="m-2 md:m-20" style={{height:600, width: 600, border: '5px solid black', position: 'relative'}}>
    <SunburstChart 
        colorType="literal"
        data={dataForTree}
        style={{stroke: '#000'}}
        height={600}
        width={600}
        onValueMouseOver={v => {
            setHoveredCell( v.x && v.y ? v : false)
        }}
        onValueMouseOut={() => setHoveredCell(false)}
        > 
        {hoveredCell ? (
            <Hint value={buildValue(hoveredCell)}>
            <div style={{background: 'white', border: '2px solid black'}}>
              <p style={{fontWeight: 'bold'}}>{hoveredCell.title}</p>
              {hoveredCell.attributes?.payload && <p>{hoveredCell.attributes?.payload}</p>}
            </div>
          </Hint>
        ) : null}

        </SunburstChart>
  </div>;
}


export default Sunburst;