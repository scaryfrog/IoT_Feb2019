IoTFeb2019

Descriptif du projet 
Nous allons réaliser une station météo avec les caractéristiques suivantes :

Heure et Date

Prévision Météo
  5 icones météo
  prévisons à 4 jours
  
Infotmation intérieur
  température en °C
  résolution O,1°C
  humidité en %
    relevé toutes les n secondes
  
Température extérieur  
  température en °C
  résolution O,1°C
  humidité en %
    relevé toutes les n secondes
    
 
 Transmission Wifi
 
 
 
 
 
 
Technologies utilisées
 
Dans le cadre du projet, nous utilisons deux cartes Nodemcu v3. Une va être placée à l'intérieur, l'autre à l'extérieur.
Les deux cartes sont équipées de deux capteurs : un capteur de température et un capteur d'humidité.
 
Nous connectons les deux cartes en Wifi. Nous avons choisi de ne pas utiliser la technologie Sigfox car nous n'avons pas besoin de communiquer à grande distance. 
 
Nous utilisons la technologie MQTT


image






Les topics sont les suivants
* home/inside/temperature
* home/inside/humidity
* home/outside/temperature
* home/outside/humidity
* apiweather/



Choix du niveau de service


Serveur MQTT : mosquitto
