import React from "react";
import Graph from "react-graph-vis";
import { debounce } from "lodash";

export default function RadialTree({messages}){
      const canvasWrapperRef = React.createRef();
      const [zoom, setZoom] = React.useState();
      const options ={  
        layout: {
        // hierarchical: true,
        },
        edges: {
          color: "#000000",
          smooth: {
            roundness: 0.25,
            type: 'curvedCCW'
          }
        },
        nodes: {
          color: "#6233FF"
        },
        physics: {
          enabled: true
        },
        interaction: {
          multiselect: true,
          dragView: zoom && zoom < 0.1 ? false : true
        }
      };


      const events = {
        zoom: debounce(function(event) {
          console.log('called')
          const newScale = event.scale
          setZoom(newScale)
        },500)
      };

      let nodes = [];
      let edges = []
    
      function checkIfArrayContainsNode(arr, id, label) {
        return arr.some(function(arrVal) {
          return id === arrVal.id && arrVal.label === label;
        });
      }
    
      function checkIfArrayContainsEdge(arr, id, parent) {
        return arr.some(function(arrVal) {
          return id === arrVal.to && arrVal.from === parent;
        });
      }
    
      const colours = {1: '#ff0000', 2: '#fff000', 3: '#00ff00', 4: '#0000ff', 0: '#ffaaf0'}
    
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
            if (!checkIfArrayContainsNode(nodes,idToUse,messageTopic.split('/')[index])) {
              if (contentToUse) {
                nodes.push({id: idToUse , label: messageTopic.split('/')[index] , color: colours[index], shape: 'box', mass:3, margin: 10});
                nodes.push({id: `${idToUse}${contentToUse}` , label: contentToUse, shape: 'text', mass:10, margin: 100});
                edges.push({ from: idToUse, to: `${idToUse}${contentToUse}`, length: 0.001, smooth: {enabled: false}})
              } else {
                nodes.push({id: idToUse , label: messageTopic.split('/')[index],color: colours[index], mass:3});
              }
            }
            if (!checkIfArrayContainsEdge(edges,idToUse,parentIdToUse)) {
              edges.push({ from: parentIdToUse, to: idToUse})
            }
          })
        })
        nodes.push({id: 'broker' , label: 'broker', color: '#0000ff', mass:3})
      };
    
    
      enrichDataForTree(messages);
    

    return (
      <div id="graph" className="m-2 md:m-20"  style={{height: 800, border: '5px solid black'}}>
        <Graph
          ref={canvasWrapperRef}
          graph={{nodes,edges}}
          options={options}
          events={events}
        />
      </div>
    );
  
}


