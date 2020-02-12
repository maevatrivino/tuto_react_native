# Tutoriel React / React Native
*Par Fabien Cellard et Maëva Trivino*

## I. Outils nécéssaires

Ce tutoriel, réalisé sous Windows, nous allons avoir besoin de NodeJS, un environnement de développement, par exemple Visual Studio Code, qui est gratuit, et expo. Ce dernier s'installe grâce à npm, installé depuis NodeJS.

## II. Installation des outils

Pour installer Visual Studio Code, télécharger l'environnement de développement ici : https://code.visualstudio.com/Download .

Pour installer NodeJS, vous pouvez le faire ici : https://nodejs.org/en/ (version LTS recommandée).

Une fois que ces outils sont installés, se rendre dans un terminal de commande ou powershell et lancer la commande suivante : *npm install -g expo-cli*. Maintenant, vous avez donc expo et vous êtes en mesure de crééer votre premier projet React / React Native. Pour créer ce projet, rendez-vous au dossier dans le terminal où vous souhaitez stocker ce projet (avec la commande *cd dossier*) et lancer la commande suivante : *expo init projetName* et choisir un projet *blank* (les flèches directionnelles pour changer de mode et *entrée* pour valider votre choix). Ce rendre ensuite dans le dossier du projet avec *cd projectName* puis lancer les commandes suivantes : *npm install* puis *npm start*.

Un onglet internet va s'ouvrir avec les logs de l'application. Sur la partie gauche, cliquez sur *local* au dessus du QR Code, puis ouvrir votre application sur l'environnement de votre choix (web, IOS, Android). Attention, pour ouvrir sous Android, il faut soit possèder un émulateur sur sa machine, soit brancher son device Android sur son ordinateur. Dans le deuxième cas, veillez à débloquer le débogage USB dans les paramètres développeur du device (aide : https://www.frandroid.com/comment-faire/tutoriaux/229753_questcequelemodedebogageusb).

Lancez le projet, par exemple, dans le navigateur internet, et vous pouvez constaté le démarrage de votre première application React Native.

## III. Arborescence du projet

En ce rendant dans votre environnement de développement, vous allez pouvoir observer l'arborescence du projet.

On peut constater qu'aucun dossier de sources est créé. Nous vous recommandons dès à présent de créer un dossier *src* pour stocker vos scripts. Ceux-ci seront en javascript.

Le fichier *package.json* stocke toutes les dépendances du projet ainsi que leur version. En effet, il est possible d'utiliser npm pour installer des dépendances utiles au projet (des éléments pour le front-end, des API, etc). Utilisez la commande pour installer le paquet fourni par le développeur dans le dossier du projet à l'aide d'un terminal de commande. Sa référence sera automatiquement ajouté au fichier *package.json*. Ensuite, les dépendances sont téléchargés dans le dossier *nodes-modules* du projet. Bien évidement, si vous souhaitez partager votre projet, il est inutile de partager le dossier *nodes-modules* ; ce dossier est très volumineux. Partagez uniquement le fichier *package.json*. Le nouvel utilisateur du projet aura simplement a appliquer la commande *npm install* dans le dossier du projet pour installer toutes les dépendances. Si vous n'avez pas de .gitignore et que vous utilisez git, pensez à en ajouter un adapté pour Node. Cela vous évitera de mettre sur votre dépôt ce dossier.

Le fichier *App.js* est le point d'entrée de l'application. C'est la première vue de l'application. Ce sera donc ici qu'on l'on aura a initer nos outils.

