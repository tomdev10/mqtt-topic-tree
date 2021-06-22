import React from 'react';
import data from './data';
import initializeScene from './initializeScene';
import ThreeForceGraph from 'three-forcegraph';
import renderToSprite from './renderToSprite';
import MindMapNode from './MindMapNode';
import * as THREE from 'three';
import colorsByLevel from './colorsByLevel';
import updateLinkPosition from './updateLinkPosition';

// safeguard against crashing CodeSandbox:
// stop animation loop after X cycles
const maxCycles = 100;

export default async function renderMindMap(div) {
  const { scene, renderer, camera } = initializeScene(div, data);
  data.nodes = await Promise.all(
    data.nodes.map((node) =>
      renderToSprite(<MindMapNode label={node.name} level={node.level} />, {
        width: 120,
        height: 60
      }).then((sprite) => ({ ...node, sprite }))
    )
  );
  const graph = new ThreeForceGraph().graphData(data);
  graph.nodeThreeObject(({ sprite }) => sprite);
  graph.linkMaterial(
    ({ level }) => new THREE.MeshBasicMaterial({ color: colorsByLevel[level] })
  );
  graph.linkPositionUpdate(updateLinkPosition);
  graph.numDimensions(2);
  graph.linkWidth(1);
  graph.scale.set(0.005, 0.005, 0.005);
  scene.add(graph);
  camera.lookAt(graph.position);

  let counter = 0;

  (function animate() {
    graph.tickFrame();
    renderer.render(scene, camera);
    if (++counter === maxCycles) {
      return;
    }
    requestAnimationFrame(animate);
  })();
}
