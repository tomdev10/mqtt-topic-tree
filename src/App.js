import { useState, useEffect } from "react";

import ConnectionStatus from "./ConnectionStatus";
import ConnectorWrapper from "./ConnectorWrapper";
import Instructions from "./Instructions";
import MessageLog from "./MessageLog";

const getBrokerUrlFromParams = () =>
  window.location.search.includes("usingProxy=true")
    ? "wss://localhost:8888"
    : null;

function App() {
  const [brokerUrl, setBrokerUrl] = useState(() => getBrokerUrlFromParams());
  const [subTopic, setSubTopic] = useState();
  const [clientId, setClientId] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [view, setView] = useState(false);

  const handleBrokerChange = (e) => {
    e.preventDefault();
    if (e.target[0].value !== "") {
      setBrokerUrl(e.target[0].value);
      setSubTopic(e.target[1].value);
      setClientId(e.target[2].value);
      if (e.target[3].value !== "" && e.target[4].value !== "") {
        setUsername(e.target[3].value);
        setPassword(e.target[4].value);
      }
    }
  };

  useEffect(() => {
    if (brokerUrl) document.getElementById("brokerUrl").value = brokerUrl;
    if (subTopic) document.getElementById("topicToSubTo").value = subTopic;
    if (clientId) document.getElementById("clientId").value = clientId;
    if (username) document.getElementById("username").value = username;
    if (password) document.getElementById("password").value = password;
  }, [brokerUrl, clientId, password, subTopic, username]);

  const randomId =`mqttjs_ ${Math.random().toString(16).substr(2, 8)}`;


  const handleToggleNetwork = () => {
    setView(view === "network" ? null : "network");
  };

  const handleToggleTree = () => setView(view === "tree" ? null : "tree");

  const handleToggleMap = () => setView(view === "map" ? null : "map");

  const handleToggleSun = () => setView(view === "sun" ? null : "sun");

  const handleToggleVis = () => {
    window.scrollTo(0, 500);
    setView(view === "vis" ? null : "vis");
  };

  const handleToggleRadial = () => {
    window.scrollTo(0, 500);
    setView(view === "radial" ? null : "radial");
  };

  return (
    <div className="App">
      <ConnectorWrapper brokerUrlToUse={brokerUrl} 
          topic={subTopic || "#"}
          clientId={clientId ? (clientId !== "" || randomId) : randomId}
          username={username}
          password={password}>
        <Instructions />
        <ConnectionStatus
          onBrokerChange={handleBrokerChange}
          handleToggleTree={handleToggleTree}
          handleToggleNetwork={handleToggleNetwork}
          handleToggleMap={handleToggleMap}
          handleToggleVis={handleToggleVis}
          handleToggleRadial={handleToggleRadial}
          handleToggleSun={handleToggleSun}
          brokerToUse={brokerUrl}
          topic={subTopic || "#"}
          clientId={clientId ? (clientId !== "" || randomId) : randomId}
          username={username}
          password={password}
        />
        <MessageLog view={view} subTopic={subTopic} />
      </ConnectorWrapper>
    </div>
  );
}

export default App;
