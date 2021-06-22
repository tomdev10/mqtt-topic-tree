import React, { createRef, useEffect } from 'react';
import renderMindMap from './renderMindMap';

export default function ForceMap() {
  const divRef = createRef();
  useEffect(() => renderMindMap(divRef.current), [divRef]);
  return <div ref={divRef} />;
}
