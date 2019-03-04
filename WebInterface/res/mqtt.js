// Create a client instance
client = new Paho.MQTT.Client("localhost", 61614, "clientId");
// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
// connect the client
client.connect({onSuccess:onConnect});
// called when the client connects
function onConnect() {
  // When connected, subscribing meteo topic then send message to topic World
  client.subscribe("home_inside/#");
  client.subscribe("#");
  message = new Paho.MQTT.Message("Un utilisateur vient de se connecter");
  message.destinationName = "World";
  client.send(message);
}
// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}
// called when a message arrives
function onMessageArrived(message) {
  console.log("Nouveau message du topic "+message.destinationName+" : "+message.payloadString);
  if(message.destinationName == "home/inside/temperature")
  {
    document.getElementById("indoor_temp").innerHTML = message.payloadString;
  }
  if(message.destinationName == "home/outside/temp")
  {
    document.getElementById("outdoor_temp").innerHTML = message.payloadString;
  }
  if(message.destinationName == "home/inside/humidite")
  {
    document.getElementById("indoor_hum").innerHTML = message.payloadString;
  }
  if(message.destinationName == "home/outside/humidite")
  {
    document.getElementById("outdoor_hum").innerHTML = message.payloadString;
  }

}
