# Tutoriel React / React Native
*Par Fabien Cellard et Maëva Trivino*

## I. Outils nécéssaires

Ce tutoriel, réalisé sous Windows, nous allons avoir besoin de NodeJS, un environnement de développement, par exemple Visual Studio Code, qui est gratuit, et expo. Ce dernier s'installe grâce à npm, installé depuis NodeJS.

## II. Installation des outils

Pour installer Visual Studio Code, télécharger l'environnement de développement ici : https://code.visualstudio.com/Download .

Pour installer NodeJS, vous pouvez le faire ici : https://nodejs.org/en/ (version LTS recommandée).

Une fois que ces outils sont installés, se rendre dans un terminal de commande ou powershell et lancer la commande suivante : *npm install -g expo-cli*. Maintenant, vous avez donc expo et vous êtes en mesure de crééer votre premier projet React / React Native. Pour créer ce projet, rendez-vous au dossier dans le terminal où vous souhaitez stocker ce projet (avec la commande *cd dossier*) et lancer la commande suivante : *expo init projetName* et choisir un projet *blank* (les flèches directionnelles pour changer de mode et *entrée* pour valider votre choix). Ce rendre ensuite dans le dossier du projet avec *cd projectName* puis lancer les commandes suivantes : *npm install* puis *npm start*.

Un onglet internet va s'ouvrir avec les logs de l'application. Sur la partie gauche, cliquez sur *local* au dessus du QR Code, puis ouvrir votre application sur l'environnement de votre choix (web, IOS, Android). Attention, pour ouvrir sous Android, il faut soit possèder un émulateur sur sa machine, soit brancher son device Android sur son ordinateur. Dans le deuxième cas, veillez à débloquer le débogage USB dans les paramètres développeur du device (aide : https://www.frandroid.com/comment-faire/tutoriaux/229753_questcequelemodedebogageusb).

Lancez le projet, par exemple, dans le navigateur internet, et vous pouvez constater le démarrage de votre première application React Native.

## III. Arborescence du projet

En ce rendant dans votre environnement de développement, vous allez pouvoir observer l'arborescence du projet.

On peut constater qu'aucun dossier de sources est créé. Nous vous recommandons dès à présent de créer un dossier *src* pour stocker vos scripts. Ceux-ci seront en javascript.

Le fichier *package.json* stocke toutes les dépendances du projet ainsi que leur version. En effet, il est possible d'utiliser npm pour installer des dépendances utiles au projet (des éléments pour le front-end, des API, etc). Utilisez la commande pour installer le paquet fourni par le développeur dans le dossier du projet à l'aide d'un terminal de commande. Sa référence sera automatiquement ajouté au fichier *package.json*. Ensuite, les dépendances sont téléchargés dans le dossier *nodes-modules* du projet. Bien évidement, si vous souhaitez partager votre projet, il est inutile de partager le dossier *nodes-modules* ; ce dossier est très volumineux. Partagez uniquement le fichier *package.json*. Le nouvel utilisateur du projet aura simplement a appliquer la commande *npm install* dans le dossier du projet pour installer toutes les dépendances. Si vous n'avez pas de .gitignore et que vous utilisez git, pensez à en ajouter un adapté pour Node. Cela vous évitera de mettre sur votre dépôt ce dossier.

Le fichier *App.js* est le point d'entrée de l'application. C'est la première vue de l'application. Ce sera donc ici qu'on l'on aura a initer nos outils.

## IV. Mise en place du Front-end

Dans le dossier *src* créé précédement, nous allons créé un dossier *components* pour stocker nos vues.

### IV.I. La vue d'accueil

La vue d'accueil va contenir un message et un bouton pour se connecter à l'API Spotify. Nous allons donc créer dans le *components*, un fichier javascript intitulé *homeView.js*.

Pour avoir la possibilité d'afficher une vue, il faut définir une classe étendue à un composant React : 
```
import React, { Component } from 'react';

export default class LoginScreen extends Component
{
    constructor(props) {
        super(props);
    }

    render() {
        return(
           //Code de la vue
        )
    }
}
```

Cette classe possède deux parties importantes : 
- Le constructeur de la classe via la méthode *constructor(props)*.
- La méthode *render()* va permettre d'effectuer des méthodes, puis, dans le return, retourner la vue du composant.

On va donc pouvoir ajouter un bouton et du texte dans cette vue : 
```
render() {
        return(
            <View>
                <View>
                    <Text>Tutorial React / React Native</Text>
                </View>
                <View>
                    <Button
                        onPress={LoginScreen._LoginToAPI()}
                        title="Connect to Spotify"
                        color="#20D760"
                    />
                </View>
            </View>
        )
    }
```

Les éléments de la vue sont représentés comme des balises HTML. Il est important de concaténer les éléments de la vue dans un container *View*, un équivalent du container *div* en développement HTML. Il existe différents types de vues mais dans notre cas, nous allons juste utiliser des vues simples. De même, pour appliquer des styles aux éléments, il faut bien séparer les éléments dans des containers différents si vous souhaitez effectuer des comportements différents.

Pour créer un affichage de texte, on utilise la balise *Text*. Entre les 2 balises, il suffit simplement de placer le texte choisi.

Pour créer un bouton, on utilise la balise *Button*. Celui-ci possède 3 paramètres importants : 
- *onPress* permet d'effectuer une action quand le bouton est pressé.
- *title* permet d'afficher du texte dans le bouton.
- *color* permet d'appliquer une couleur au bouton.

Il est nécessaire de créer une fonction *_LoginToAPI()*, vide dans un premier temps, pour prévoir le comportement du bouton (et surtout que le paramètre *onPress* est requis pour le bouton. Dans le composant, ajoutez : 

```
static _LoginToAPI()
{
        
}
```

