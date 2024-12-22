
TERMINAL MACOS:


Nodejs:
1: # installs nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

2: # download and install Node.js (you may need to restart the terminal)
nvm install 22

3: # verifies the right Node.js version is in the environment
node -v # should print `v22.12.0`

4: # verifies the right npm version is in the environment
npm -v # should print `10.9.0`

SOCKET.IO

1: npm init -y

2: npm install express cors

3: npm install socket.io

Du skal ha en mappe i prosjektet som heter "Musikkvideouka"
Naviger dit i TERMINAL.

Kjør følgende kommando for å initialisere et nytt Node.js-prosjekt:

1: npm init -y

Dette oppretter en package.json-fil.

Du trenger Express for å sette opp serveren og socket.io for sanntidskommunikasjon.

1: npm install express socket.io


Naviger til prosjektmappe i TERMINAL.

Start server med å kjøre:
    node admin-server.js

    
Forklaring på mappestrukturen:
server.js: Denne filen starter serveren din (Express + Socket.io). Her definerer du logikken for hvordan admin- og publikum-sidene kommuniserer i sanntid.
public/:

publikum.html: HTML-filen som viser informasjon til publikum.
publikumstyle.css: CSS-filen for styling av publikum-siden.
publikum.js: JavaScript-filen som håndterer Socket.io for å motta data fra serveren og oppdatere publikum i sanntid.
admin.html: HTML-filen for administrasjonssiden (f.eks. for oppdatering av poeng).
adminstyle.css: CSS-filen for styling av admin-siden.
admin.js: JavaScript-filen for admin-siden som sender data til serveren via Socket.io.

node_modules/:
Denne mappen inneholder alle de eksterne Node.js-pakkene som prosjektet ditt bruker, som Express og Socket.io. Denne mappen blir automatisk opprettet når du kjører npm install.

package.json:
Denne filen holder oversikt over alle npm-pakkene og prosjektets avhengigheter.

package-lock.json:
Denne filen låser versjonen av installerte npm-pakker for å sikre at prosjektet ditt bruker de samme versjonene på tvers av ulike maskiner.
