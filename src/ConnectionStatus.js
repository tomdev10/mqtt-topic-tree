import React from 'react';

import { useMqttState } from 'mqtt-react-hooks';

const ConnectorWrapper = ({onBrokerChange,handleToggleTree,handleToggleNetwork}) => {

  /*
  * Status list
  * - Offline
  * - Connected
  * - Reconnecting
  * - Closed
  * - Error: printed in console too
  */
  const { connectionStatus } = useMqttState();

  return (
    <div className="p-6 m-6 bg-white rounded-xl shadow-md flex items-center space-x-4">
      <form onSubmit={onBrokerChange} style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
        <h3 className="text-lg font-medium text-black">Broker Details</h3>
        <div className="my-4">
          <label className="flex items-center w-full justify-between">
            Broker URL:
            <input id="brokerUrl" class="px-4 py-1 mx-4 text-sm text-purple-400 rounded-full border border-purple-200 "/>
          </label>
          <label className="flex items-center justify-between w-full ">
            Topic (will default to all):
            <input id="topicToSubTo" class="px-4 mx-4 my-2 py-1 text-sm text-purple-400 rounded-full border border-purple-200 "/>
          </label>
          <label className="flex items-center w-full justify-between">
           Client Id (will default to random):
            <input id="clientId" class="px-4 py-1 mx-4 text-sm text-purple-400 rounded-full border border-purple-200 "/>
          </label>
          <label className="flex items-center justify-between w-full ">
            Username  (will default to unauth):
            <input id="username" class="px-4 mx-4 my-2 py-1 text-sm text-purple-400 rounded-full border border-purple-200 "/>
          </label>
          <label className="flex items-center w-full justify-between">
            Password (will default to unauth):
            <input id="password" class="px-4 py-1 mx-4 text-sm text-purple-400 rounded-full border border-purple-200 "/>
          </label>
        </div>
        <button type="submit" class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Connect</button>
      </form>
      <div className="flex items-center justify-center flex-col max-w-lg flex-grow">
        {connectionStatus && <h4 class="text-lg font-medium text-black">{`Status: ${connectionStatus}`}</h4>}
        {connectionStatus === "Connected" && <button class="my-2 px-4 py-1 text-sm text-green-600 font-semibold rounded-full border border-green-200 hover:text-white hover:bg-green-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2" onClick={handleToggleTree}>Toggle Tree</button>}
        {connectionStatus === "Connected" && <button class="my-2 px-4 py-1 text-sm text-pink-600 font-semibold rounded-full border border-pink-200 hover:text-white hover:bg-pink-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-offset-2" onClick={handleToggleNetwork}>Toggle Network</button>}
      </div>
    </div>

  );
}
export default ConnectorWrapper