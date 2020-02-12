# Tutoriel React / React Native
*Par Fabien Cellard et Maëva Trivino*

## I. Outils nécéssaires

Ce tutoriel, réalisé sous Windows, nous allons avoir besoin de NodeJS, un environnement de développement, par exemple Visual Studio Code, qui est gratuit, et expo. Ce dernier s'installe grâce à npm, installé depuis NodeJS.

## II. Installation des outils

Pour installer Visual Studio Code, télécharger l'environnement de développement ici : https://code.visualstudio.com/Download .

Pour installer NodeJS, vous pouvez le faire ici : https://nodejs.org/en/ (version LTS recommandée).

Une fois que ces outils sont installés, se rendre dans un terminal de commande ou powershell et lancer la commande suivante : *npm install -g expo-cli*. Maintenant, vous avez donc expo et vous êtes en mesure de crééer votre premier projet React / React Native. Pour créer ce projet, rendez-vous au dossier dans le terminal où vous souhaitez stocker ce projet (avec la commande *cd dossier*) et lancer la commande suivante : *expo init projetName*. Ce rendre ensuite dans le dossier du projet avec *cd projectName* puis lancer la commande suivante : *npm start*.

Un onglet internet va s'ouvrir avec les logs de l'application. Sur la partie gauche, cliquez sur *local* au dessus du QR Code, puis ouvrir votre application sur l'environnement de votre choix (web, IOS, Android). Attention, pour ouvrir sous Android, il faut soit possèder un émulateur sur sa machine, soit brancher son device Android sur son ordinateur. Dans le deuxième cas, veillez à débloquer le débogage USB dans les paramètres développeur du device (aide : https://www.frandroid.com/comment-faire/tutoriaux/229753_questcequelemodedebogageusb).

Lancez le projet, par exemple, dans le navigateur internet, et vous pouvez constaté le démarrage de votre première application React Native.