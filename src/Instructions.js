import React from 'react';
import {ReactComponent as Logo} from "./logo.svg";

const Instructions = () => {
  return (
    <div className="p-6 m-6 bg-white rounded-xl shadow-md space-x-4 flex justify-between items-center">
      <div>
      <h1 className="text-xl font-medium text-black mb-6">MQTT Topic Tree Visualiser 🌳</h1>
      <div className="my-4">
          <p>This tool has been created to help visualise an MQTT Topic Tree in your web browser. Set up your broker, and then explore the tree.</p>
          <p>The subscription will stay active, meaning that the tree will be updated with the latest topics, and payloads.</p>
      </div>
        
          <ol>
              <li>1) Connect to your broker below, adding in all required details</li>
              <li>2) Check the connection is active using the panel on the right</li>
              <li>3) Toggle your tree on, and explore!</li>
          </ol>
          <div className="text-xs py-2 italic">(The message log is avaliable at the bottom to aid debugging!)</div>
      </div>
      <div>
        <Logo width={200} height={200} className="p-6" />
      </div>
    </div>
  )
};

export default Instructions;