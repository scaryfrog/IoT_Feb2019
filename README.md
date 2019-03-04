# Sommaire

### 1/ Le besoin

Dans le cadre de notre cours “Internet des objets”, il nous a été demandé de réaliser une station météo complète : de la prise de la température par le biais d’un capteur à son affichage sur une interface graphique. Nous répondons donc au besoin d’un client souhaitant avoir une station météo lui donnant la température intérieure de sa maison et la température extérieure (jardin ou cave par exemple).

Nous avons donc convenue de réaliser une interface graphique du type suivant:
![ ](https://i.imgur.com/OBWqaCE.jpg " ")



### 2/ Les technologies utilisées

Le dispositif que nous proposons s’adresse aux particuliers. La contrainte de distance n’est pas importante ici. La station peut alors sans problème communiquer en wifi avec les capteurs.
Nous utilisons donc le circuit imprimé à microcontrôleur ESP8266. La technologie Sigfox ne nous est pas nécessaire ici. Nous n’avons pas de soucis d'encombrement, ni d’autonomie puisque les capteurs sont facilement accessible à l'intérieur et à l’extérieur de la pièce.
L’ESP8266 dispose d’une carte wifi, fonctionne avec l’IDE arduino que nous connaissons bien et répond donc tout à fait à nos attentes.




### 3/ Graphique récapitulatif


![ ](https://imgur.com/BgDeePb.jpg " ")


### 4/ Modèle Publish / Subscribe

Nous avons choisi d’utiliser le modèle Pub/Sub et non le modèle “client/serveur” classique (HTTP par exemple). Ainsi, les clients n’ont pas     besoin de se connecter entre eux, de se connaître ou d’être synchronisés.
Le broker choisi est Mosquitto. Ce dernier fait le lien entre les capteurs et l’interface web.

Les topics sont les suivants :

- home/inside/temperature
- home/inside/humidity
- home/outside/temperature
- home/outside/humidity
- apiweather/

Nous envoyons les données des capteurs régulièrement sur le broker.
De son côté l’interface web est abonnée à tous les topics et vient récupérer les données nécessaires dès qu’elles sont disponibles. Il n’y a pas de synchronisation et cela permet d’être facilement modifiable selon les besoins.


### 5/ Récupération les valeurs

L’ESP8266 est la carte va faire office “d’interface” entre le capteur et le serveur MQTT. Comme dit précédemment, l’ESP8266 dispose d’une carte wifi. Pour la partie codage dans l’IDE Arduino nous avons du importer 2 bibliothèques: “DHT” pour la partie capteur et “EspMQTTClient” pour la partie serveur.
Pour commencer, on établit la connexion entre la carte et le serveur Mosquitto. Ceci va nous permettre de publier (etape publisher) un message sur un channel de notre choix (appelé topic -t) les valeurs de température et humidité. Puis, de "l´autre coté" notre serveur web va "subscribe" au broker pour récupérer les données voulues (étape subscriber) et les afficher sur l´API weather. Le serveur MQTT sert de passerelle entre la carte




### 6/ Interface web

L’interface choisie pour cette station  est une interface web qui est très portative (pas dépendant d’un matériel spécifique), facile à mettre en place et modulable.
Afin de facilement moduler l’interface, nous avons utilisé Bootstrap afin d’organiser les différentes informations affichées. Cela permet aussi de changer facilement le style de la page en trouvant des feuilles de style adaptées à Bootstrap.
Concernant les relevés des capteurs, un script permettant l’accès au serveur MQTT (ce script se trouve dans le dossier res/mqtt.js). Le script initialise la connection au serveur et met à jour, sur l’interface, les valeurs des capteurs.
L’interface présente également des prévisions météos grâce à l’API OpenWeather et l’affichage est géré par Vue.js (ce script se trouve dans le dossier res/app.js)
On peut noter que l’interface est un exemple de disposition pour deux capteurs et une prévision météo sur 4 jours. Il est facile d’adapter l’affichage pour plus de capteurs en ajoutant des éléments “cards” dans le corps du HTML et en ajoutant la gestion des valeurs affichées dans le script adapté (app.js pour la météo, mqtt.js pour les capteurs).

### 7/ Conclusion

Ce projet de station météo connectée est donc un excellent exemple de réalisation rapide et à moindre coût pour réaliser sa propre station météo. L’ensemble des techniques utilisées sont peu coûteuse et permettent une grande personnalisation.

Le capteur DHT11 est capable de mesurer des températures de 0 à +50°C avec une précision de +/- 2°C et des taux d'humidité relative de 20 à 80% avec une précision de +/- 5%. Une mesure peut être réalisée toutes les secondes.  Ce capteur sera + efficace à l’intérieur ou dans un environnement pas trop froid et pas trop humide.
Si on veut augmenter la précision et avoir un capteur de température + robuste il faudra viser le DHT22: la précision est au demi degré près, il peut indiquer des température jusqu’à -40 degré, permet de d’effectuer 2 mesures à la seconde et présente plus de stabilité au fil des années (+0.5% contre +1% pour le DHT11).
