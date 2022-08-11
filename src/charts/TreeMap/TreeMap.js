import React from "react";
import { ResponsiveTreeMap } from "@nivo/treemap";

let tree = [];

function checkIfArrayContainsNode(arr, name, parent) {
  return arr.some(function (arrVal) {
    return name === arrVal.name && arrVal.parentId === parent;
  });
}

function checkIfChildArrContainsNode(arr, name) {
  return arr.some(function (arrVal) {
    return name === arrVal.name;
  });
}

const generateTopicNameFrom = (messageTopic, index) => {
  let splitArray = messageTopic.split("/");
  splitArray.length = index + 1;
  return splitArray.join("/");
};

/*eslint-disable*/
const enrichDataForTree = (messages) => {
  Object.keys(messages).map((messageTopic) => {
    const arrayOfTopicLevels = messageTopic.split("/");
    arrayOfTopicLevels.map((singleNode, index) => {
      const parentIdToUse =
        index === 0 ? "broker" : generateTopicNameFrom(messageTopic, index - 1);
      const contentToUse =
        index === arrayOfTopicLevels.length - 1 ? messages[messageTopic] : null;

      const idToUse =
        parentIdToUse !== "broker"
          ? index === messageTopic.split("/").length - 1
            ? messageTopic
            : generateTopicNameFrom(messageTopic, index)
          : messageTopic.split("/")[index];

      if (!checkIfArrayContainsNode(tree, idToUse, parentIdToUse)) {
        contentToUse
          ? tree.push({
              name: idToUse,
              displayName: messageTopic.split("/")[index],
              parentId: parentIdToUse,
              attributes: { payload: contentToUse },
              loc: 1000,
            })
          : tree.push({
              name: idToUse,
              displayName: messageTopic.split("/")[index],
              parentId: parentIdToUse,
            });
      }
    });
  });
  tree.push({
    name: "broker",
    displayName: "broker",
    parentId: null,
    content: null,
  });
};
/*eslint-enable*/

const generateTree = (data) => {
  const idMapping = data.reduce((acc, el, i) => {
    acc[el.name] = i;
    return acc;
  }, {});

  let root;
  data.forEach((el) => {
    // Handle the root element
    if (el.parentId === null) {
      root = el;
      return;
    }
    // Use our mapping to locate the parent element in our data array
    const parentEl = data[idMapping[el.parentId]];
    //Add our current el to its parent's `children` array
    if (parentEl.children) {
      if (!checkIfChildArrContainsNode(parentEl.children, el.name)) {
        parentEl.children = [...(parentEl.children || []), el];
      }
    } else {
      parentEl.children = [...[], el];
    }
  });
  return root;
};

const buildTree = (messages) => {
  enrichDataForTree(messages);
  const generatedTree = generateTree(tree);
  return generatedTree;
};

const TreeExplorer = ({ messages }) => {
  const dataForTree = buildTree(messages);
  return (
    <div style={{ height: 600, border: "5px solid black", margin: "5rem" }}>
      <ResponsiveTreeMap
        data={dataForTree}
        identity="name"
        value="loc"
        valueFormat=".02s"
        label={function (e) {
          return e.data.displayName;
        }}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        labelSkipSize={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.2]] }}
        parentLabelTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        borderColor={{ from: "color", modifiers: [["darker", 0.1]] }}
        tooltip={({ node }) => (
          <>
            <strong style={{ color: node.color }}>{node.data.name}</strong>
            <span>
              {node.data?.attributes?.payload
                ? `:${" "}${node.data?.attributes?.payload}`
                : null}
            </span>
          </>
        )}
      />
    </div>
  );
};

export default TreeExplorer;
