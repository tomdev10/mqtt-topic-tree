import React from 'react';

import { useMqttState } from 'mqtt-react-hooks';

const ConnectorWrapper = ({onBrokerChange,handleToggleTree,handleToggleNetwork,handleToggleMap,handleToggleRadial,handleToggleVis, handleToggleSun,brokerToUse, topic, clientId, username, password}) => {

  /*
  * Status list
  * - Offline
  * - Connected
  * - Reconnecting
  * - Closed
  * - Error: printed in console too
  */
  const { connectionStatus } = useMqttState();

  const handleReset = () => window.location.reload();
  return (
    <div className="p-6 m-2 bg-white rounded-xl shadow-md flex items-center space-x-4 flex-wrap">
      <form onSubmit={onBrokerChange} style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
        <h2 className="text-lg font-medium text-black">Broker Details</h2>
        <div className="my-4">
          <label className="flex items-center w-full justify-between flex-wrap font-bold">
            Broker URL:
            {connectionStatus !== "Connected" ? 
              <input id="brokerUrl" className="px-4 py-1 mx-4 text-sm text-purple-800 rounded-full border border-purple-400 "/> 
              : <span className="mx-2 font-normal">{brokerToUse}</span>
            }
          </label>
          <label className="flex items-center justify-between w-full flex-wrap font-bold">
            Topic (will default to all):
            {connectionStatus !== "Connected" ? 
              <input id="topicToSubTo" className="px-4 mx-4 my-2 py-1 text-sm text-purple-800 rounded-full border border-purple-400 "/> 
              : <span className="mx-2 font-normal">{topic}</span>
            }
          </label>
          <label className="flex items-center w-full justify-between flex-wrap font-bold">
           Client Id (will default to random):
           {connectionStatus !== "Connected" ?  
           <input id="clientId" className="px-4 py-1 mx-4 text-sm text-purple-800 rounded-full border border-purple-400 "/> 
            : <span className="mx-2 font-normal">{clientId}</span>
           }
          </label>
          <label className="flex items-center justify-between w-full flex-wrap font-bold">
            Username  (will default to unauth):
            {connectionStatus !== "Connected" ? 
              <input id="username" className="px-4 mx-4 my-2 py-1 text-sm text-purple-800 rounded-full border border-purple-400 "/> 
              : <span className="mx-2 font-normal">{username}</span>
            }
          </label>
          <label className="flex items-center w-full justify-between flex-wrap font-bold">
            Password (will default to unauth):
            {connectionStatus !== "Connected" ? 
              <input id="password" className="px-4 py-1 mx-4 text-sm text-purple-800 rounded-full border border-purple-400 "/>
              : <span className="mx-2 font-normal">{password}</span>}
          </label>
        </div>
        {connectionStatus !== "Connected" && <button type="submit" className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-400 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Connect</button>}
        {connectionStatus === "Connected" && <button className="px-4 py-1 text-sm text-red-600 font-semibold rounded-full border border-red-200 hover:text-white hover:bg-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2" onClick={handleReset}>Reset</button>}
      </form>
      <div className="flex items-start justify-center flex-col flex-grow mx-0 my-6 md:mx-10 md:my-0 md:max-w-2xl">
        {connectionStatus && <h4 className="text-lg font-medium text-black">{`Status: ${connectionStatus}`}</h4>}
        {connectionStatus === "Connected" && <div className="flex justify-between items-center">
            <button className="m-2 px-4 py-1 text-sm text-green-600 font-semibold rounded-full border border-green-200 hover:text-white hover:bg-green-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2" onClick={handleToggleTree}>Toggle Tree</button>
            <span className="italic">Best for exploration and development</span>
          </div>
        }
        {connectionStatus === "Connected" && <div className="flex justify-between items-center">
            <button className="m-2 px-4 py-1 text-sm text-pink-600 font-semibold rounded-full border border-pink-200 hover:text-white hover:bg-pink-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-offset-2" onClick={handleToggleNetwork}>Toggle Network</button>
            <span className="italic">Best for visualisation and extraction (not good on mobile!)</span>
          </div>
        }
        {connectionStatus === "Connected" && <div className="flex justify-between items-center">
            <button className="m-2 px-4 py-1 text-sm text-blue-600 font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2" onClick={handleToggleMap}>Toggle Map</button>
            <span className="italic">Best for understanding out the data (not good on mobile!)</span>
          </div>
        }
         {connectionStatus === "Connected" && <div className="flex justify-between items-center">
          <button className="m-2 px-4 py-1 text-sm text-red-600 font-semibold rounded-full border border-red-200 hover:text-white hover:bg-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2" onClick={handleToggleSun}>Toggle Sunburst</button>
            <span className="italic">Best for data on desktop</span>
          </div>
        }
        {connectionStatus === "Connected" && <div className="flex justify-between items-center">
          <button className="m-2 px-4 py-1 text-sm text-yellow-800 font-semibold rounded-full border border-yellow-600 hover:text-white hover:bg-yellow-800 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2" onClick={handleToggleRadial}>Toggle Structured Tree</button>
            <span className="italic">Best for development</span>
          </div>
          }
        {connectionStatus === "Connected" && <div className="flex justify-between items-center">
          <button className="m-2 px-4 py-1 text-sm text-indigo-600 font-semibold rounded-full border border-indigo-200 hover:text-white hover:bg-indigo-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2" onClick={handleToggleVis}>Toggle Freeform Tree</button>
            <span className="italic">Best for fun!</span>
          </div>
        }
      </div>
    </div>

  );
}
export default ConnectorWrapper