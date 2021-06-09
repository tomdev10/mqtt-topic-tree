# MQTT Topic Tree Visualiser

ToDo:  

1) Check what happens when new messages arrive (avoid expensive re-render)
2) Styling - tailwind? 
3) deploy
4) there’s something weird with the “use this broker” button - it clears the broker URL field and then status says undefined - I htink it should leave the text there in case you get it wrong and have to correct it
5) which port does it assume for wss ? I tried wss://MQTT.eclipseprojects.io:443 (with topic tree ‘andysc/#’ ) and it says offline then reconnecting
6) if you get nodes that are non-leaf nodes (i.e. don’t have a payload) don’t display “Payload: ” under them
7) needs to lay the topics out closer together they’re very far apart
8) subscriptions don’t work yet - maybe that’s why I can’t connect to eclipse