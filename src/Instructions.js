import React from 'react';
import {ReactComponent as Logo} from "./logo.svg";

const Instructions = () => {
  return (
    <div className="p-6 m-6 bg-white rounded-xl shadow-md space-x-4 flex justify-between items-center flex-wrap">
      <div>
      <h1 className="text-xl font-medium text-black mb-6">MQTT Topic Tree Visualiser 🌳</h1>
      <div className="my-4">
          <p>This tool has been created to help visualise an MQTT Topic Tree in your web browser. Set up your broker, and then explore the tree using various visualisations.</p>
          <p>The subscription will stay active, meaning that the tree will be updated with the latest topics, and payloads.</p>
      </div>
        
          <ol>
              <li>1) Connect to your broker below, adding in all required details</li>
              <li>2) Check the connection is active using the panel on the right</li>
              <li>3) Toggle your chosen view on, and explore!</li>
          </ol>
          <div className="text-xs py-2 mb-6 italic">(The message log is avaliable at the bottom to aid debugging!)</div>
          <div className="flex flex-col md:flex-row max-w-s">
            <a class="m-2 px-4 py-1 text-center text-sm text-black-600 font-semibold rounded-full border border-black-200 hover:text-white hover:bg-black hover:border-transparent focus:outline-none focus:ring-2 focus:ring-black-600 focus:ring-offset-2" href="https://github.com/tomdev10/mqtt-topic-tree" target="_blank" rel="noreferrer">View Source Code 💻</a>
            <a class="m-2 px-4 py-1 text-center text-sm text-yellow-600 font-semibold rounded-full border border-yellow-200 hover:text-white hover:bg-yellow-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2" href="https://buymeacoffee.com/tomdev10" target="_blank" rel="noreferrer">Buy me a beer 🍻</a>
          </div>   
      </div>
      <div>
        <Logo width={200} height={200} className="p-6" />
      </div>
    </div>
  )
};

export default Instructions;