#include "DHT.h"
#include "EspMQTTClient.h"

DHT dht;

void setup()
{
  Serial.begin(9600);
  Serial.println();
  Serial.println("Status\tHumidity (%)\tTemperature (C)\t(F)");

  dht.setup(14); // data pin 2
}




void onConnectionEstablished();

EspMQTTClient client(
  "lemicho",           // Wifi ssid
  "lemifroid",           // Wifi password
  "broker.mqttdashboard.com",  // MQTT broker ip a rensigner
  1883,             // MQTT broker port a renseigner
  "meteo",            // MQTT username
  "iot",       // MQTT password
  "station",          // Client name
  onConnectionEstablished, // Connection established callback
  true,             // Enable web updater
  true              // Enable debug messages
);


void onConnectionEstablished()
{
  client.subscribe("home/test", [] (const String &payload) // faire un test de fonctionnement puis
  {
    Serial.println(payload);
  });
  
  
 }


void loop()
{
  delay(dht.getMinimumSamplingPeriod());

  float humidity = dht.getHumidity();
  float temperature = dht.getTemperature();

  Serial.print(dht.getStatusString());
  Serial.print("\t");
  Serial.print(humidity, 1);
  client.publish("home/outside/humidity", String (humidity));

  Serial.print("\t\t");
  Serial.print(temperature, 1);
  client.publish("home/outside/temperature", String (temperature));
  Serial.print("\t\t");
  Serial.println(dht.toFahrenheit(temperature), 1);
  delay(10000);
  client.loop();
  
}
