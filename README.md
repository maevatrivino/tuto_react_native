# Tutoriel React / React Native
*Par Fabien Cellard et Maëva Trivino*

*Tutoriel de présentation de React et React Native à travers une API Spotify*

## I. :newspaper: Histoire de React / React Native et but du tutoriel

## II. :wrench: Outils nécéssaires

Dans ce tutoriel, réalisé sous Windows, nous allons avoir besoin de NodeJS, un environnement de développement, par exemple Visual Studio Code, qui est gratuit, et expo. Ce dernier s'installe grâce à npm, installé depuis NodeJS.

## III. :factory: Installation des outils

Pour installer Visual Studio Code, télécharger l'environnement de développement ici : https://code.visualstudio.com/Download .

Pour installer NodeJS, vous pouvez le faire ici : https://nodejs.org/en/ (version LTS recommandée).

Une fois que ces outils sont installés, se rendre dans un terminal de commande ou powershell et lancer la commande suivante : 

> `npm install -g expo-cli`

Maintenant, vous avez donc expo et vous êtes en mesure de créer votre premier projet React / React Native. Pour créer ce projet, rendez-vous au dossier dans le terminal où vous souhaitez stocker ce projet (avec la commande `cd dossier`) et lancer la commande suivante : 
> `expo init projectName`

Choississez un projet `blank` (les flèches directionnelles pour changer de mode et *entrée* pour valider votre choix). Ce rendre ensuite dans le dossier du projet avec *cd projectName* puis lancer les commandes suivantes : 
> `npm install`  
`npm start`

Un onglet internet va s'ouvrir avec les logs de l'application. 

### :computer: **Web**

Une fois expo complètement lancé, tapez `W` dans la console, cela aura pour effet de lancer la compilation de votre projet en web. Votre projet est maintenant accessible à l'adresse : 

`http://localhost:19006/`

:warning: Veillez bien au port sur lequel votre site est lancé car cela va nous être utile pour la suite.

### 📱 **IOs & Android**

Si vous possédez un émulateur sur votre machine vous pouvez juste appuyer sur `Run on Android device/emulator` ou `Run on IOs simulator` qui lancera votre application sur votre émulateur. 

Si votre téléphone Android est sur le même réseau que votre machine de développement, vous pouvez télécharger l'application [Expo](https://play.google.com/store/apps/details?id=host.exp.exponent), et flasher le QR code pour lancer l'application sur votre appareil. 

Si votre téléphone est relié en USB à votre machine de développement (*veillez à débloquer le débogage USB dans les paramètres développeur de l'appareil comme indiqué [ici](https://www.frandroid.com/comment-faire/tutoriaux/229753_questcequelemodedebogageusb*)*) cliquez sur `local` au dessus du QR Code et `Run on Android device/emulator` pour lancer l'application sur votre téléphone (:warning: Vous aurez peut être à télécharger l'application Expo au premier lancement).

## IV. 🌳 Arborescence du projet 

En ce rendant dans votre environnement de développement, vous allez pouvoir observer l'arborescence du projet.

On peut constater qu'aucun dossier de sources est créé. Nous vous recommandons dès à présent de créer un dossier ***src*** pour stocker vos scripts. Ceux-ci seront en javascript.

Le fichier ***package.json*** stocke toutes les dépendances du projet ainsi que leur version. En effet, il est possible d'utiliser npm pour installer des dépendances utiles au projet (des éléments pour le front-end, des API, etc). Utilisez la commande pour installer le paquet fourni par le développeur dans le dossier du projet à l'aide d'un terminal de commande. Sa référence sera automatiquement ajouté au fichier *package.json*. Les dépendances seront téléchargées dans le dossier ***nodes-modules*** du projet. Bien évidement, si vous souhaitez partager votre projet, il est inutile de le partager sur votre repo car ilest très volumineux. Partagez uniquement le fichier *package.json*. Le nouvel utilisateur du projet aura simplement a appliquer la commande `npm install` dans le dossier du projet pour installer toutes les dépendances. Si vous n'avez pas de .gitignore et que vous utilisez git, pensez à en ajouter un adapté pour Node. Cela vous évitera de mettre des éléments trop volumineux et téléchargeable en local sur votre dépôt.

Le fichier ***App.js*** est le point d'entrée de l'application. C'est la première vue de l'application. Ce sera donc ici qu'on l'on aura à initer nos outils.

## V. :lipstick: Mise en place du Front-end

Dans le dossier ***src*** créé précédement, nous allons créé un dossier ***components*** pour stocker nos vues. L'idée est de faire un fichier par écran.

### V.I. :house: La vue d'accueil

La vue d'accueil va contenir un message et un bouton pour se connecter à l'API Spotify. Nous allons donc créer dans le dossier ***components***, un fichier javascript intitulé ***loginScreen.js***.

Pour avoir la possibilité d'afficher une vue, il faut définir une classe étendue à un composant React : 

```js
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
- Le constructeur de la classe via la méthode ***constructor(props)***.
- La méthode ***render()*** va permettre d'effectuer des méthodes, puis, dans le return, retourner la vue du composant.

On va donc pouvoir ajouter un bouton et du texte dans cette vue : 
```js
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

Les éléments de la vue sont représentés comme des balises HTML. Il est important de concaténer les éléments de la vue dans un container ***View***, un équivalent du container ***div*** en développement HTML. Il existe différents types de vues mais dans notre cas, nous allons juste utiliser des vues simples. De même, pour appliquer des styles aux éléments, il faut bien séparer les éléments dans des containers différents si vous souhaitez avoir des comportements différents.

Pour créer un affichage de texte, on utilise la balise ***Text***. Entre les 2 balises, il suffit simplement de placer le texte choisi.

Pour créer un bouton, on utilise la balise ***Button***. Celui-ci possède 3 paramètres importants : 
- ***onPress*** permet d'effectuer une action quand le bouton est pressé.
- ***title*** permet d'afficher du texte dans le bouton.
- ***color*** permet d'appliquer une couleur au bouton.

Il est nécessaire de créer une fonction *_LoginToAPI()*, vide dans un premier temps, pour prévoir le comportement du bouton (le paramètre *onPress* est requis pour le bouton). Dans le composant, ajoutez : 

```js
static _LoginToAPI()
{
        
}
```

Pour appliquer du style sur des éléments, on utilise le paramètre ***style*** dans les balises. On pourrait simplement écrire le style dans la balise mais pour plus de propreté, nous allons créer une constante de style et appliquer ses éléments à nos balises. Pour appliquer du style, cela fonctionne sous la même logique que du css, certains paramètres et leur utilisation peuvent être légèrement différent mais ressemble en grande partie. Placez cette constante en dehors du composant : 

```css
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonContainer: {
        marginLeft: 50,
        marginRight: 50,
        marginTop: 20,
        marginBottom: 20
    },
    titleContainer: {
        margin: 5,
        alignItems: 'center'
    },
    titleStyle: {
        fontSize: 30
    }

});
```

Maintenant, on modifie la vue en ajoutant ces éléments de style : 
```js
render() {
	return(
    	<View style={styles.container}>
        	<View style={styles.titleContainer}>
            	<Text style={styles.titleStyle}>Tutorial React / React Native</Text>
            </View>
            <View style={styles.buttonContainer}>
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

Pour lancer l'affichage de cette vue à l'extérieur du composant, il faut créer une méthode statique dans le composant pour le construire. Pour cela, il suffit simplement de l'appeler avec une balise. Le nom de celle-ci est celle du composant, dans notre cas ***LoginScreen*** : 

```js
static loginScreenView () {
	return(
    	<LoginScreen/>
    );
}
```

Cette méthode statique, du moment qu'elle est définie dans le composant, pourra être appelé dans un autre composant.

### V.II. :factory: La vue principale

Une fois connecté à l'API Spotify, il faudra avoir une vue principale. Vous pouvez donc créer un nouveau fichier dans le dossier *components* intitulé ***mainScreen.js***.

Vous pouvez définir un composant tel que le menu d'accueil avec un texte et un bouton de déconnexion. Vous pouvez aussi définir votre style et pensez à créer une méthode statique dans le composant intulé ***mainScreenView*** pour avoir construire cette vue dans un autre composant.

### V.III. :boat: Naviguer entre les écrans

#### V.III.I. ⚙️ Définir le système de navigation

Pour naviguer entre les écrans, nous allons utiliser ***React Navigation***. Pour l'installer, ouvrez le terminal de commande à la racine du projet et appliquez ces commandes : 

`npm install @react-navigation/native`

`expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view`. 

Ces dépendances permettent d'utiliser un système de navigation entre les écrans.

Notre premier système de navigation va être intégrer dans le fichier ***App.js*** à la racine du projet : 

```js
import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import loginScreen from "./src/components/loginScreen";
import mainScreen from "./src/components/mainScreen";
import {navigationRef} from "./src/navigation/navigatorRef";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

function LoginScreen() {
    return (
        loginScreen.loginScreenView()
    );
}

function MainScreen() {
    return (
        mainScreen.mainScreenView()
    );
}

function App() {
  return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Home" component={MainScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
```

Le premier import est essentiel pour utiliser React Navigation. Ensuite, il faut définir une constante ***stackNavigator***. Dans la fonction ***App()***, on défini ce navigateur. Tout d'abord, on applique un container pour notre navigateur. Ensuite, dans le stack que l'on a défini, on répertorie les écrans avec lequel on veut naviguer. On donne un nom et on spécifie une méthode qui devra renvoyer une vue. On va donc définir des fonctions qui retournent les fonctions statiques que l'on a défini dans les composants.

#### V.III.II. :arrows_counterclockwise: Changer d'écran dans un autre composant

Il est possible de changer de composant dans un autre écran si l'on a la référence du navigateur (la référence est déjà placé sur le container dans *App.js*). Il suffit de placer une référence sur le container de navigation. Cette référence va pointer sur un fichier javascript dans un dossier ***navigation*** dans le dossier *src* intitulé ***navigatorRef.js*** : 

```js
import { StackActions } from '@react-navigation/routers';

export const navigationRef = React.createRef();

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}

export function replace(name, params){
    const pushAction = StackActions.replace(name, params);

    navigationRef.current?.dispatch(pushAction);
}
```

Définir ces fonctions permet d'utiliser les fonctions de navigation de notre navigateur dans n'importe quel composant : 
- La méthode ***navigate*** permet de changer d'écran avec la possibilité de retourner à l'écran précédant.
- La méthode ***replace*** permet de ne pas pouvoir retourner à l'écran précédant.

Dans le cas d'une connexion à un compte, il est intéressant de bloquer le retour à l'écran précédant.
 
Il faut impérativement préciser le ***export*** dans la définition de la fonction pour qu'elle soit utilisable dans n'importe quel composant.

Pour utiliser cette référence, nous allons placer une redirection au moment où l'on appuie sur le bouton de redirection. Dans un premier temps, précisez cet import dans le fichier ***loginScreen.js*** : 

```js
import * as NavigatorRef from '../navigation/navigatorRef'
```

On peut donc assez facilement, dans la méthode *_LoginToAPI*, utiliser la méthode *replace* de la référence : 

```js
NavigatorRef.replace('Home');
```

En appuyant sur le bouton de connexion, vous allez être capable de naviguer à votre écran d'accueil.

### V.IV. 🔨 Création d'onglets à la vue principale

Vous allez, pour commencer, créez un dossier ***tabs*** dans le dossier ***components***, pour stocker les écrans des onglets.

#### V.IV.I. 📌 Onglet principal

Pour cet onglet principal, créez un fichier dans le dossier *tabs* intitulé *homeTab.js*. Implémentez un composant *HomeTab* sous les exemples des composants créés précedement. Vous pouvez reprendre la vue créée dans *mainScreen* et supprimer sa vue (et non son composant), puisque nous placerons un nouveau navigateur dans cette dernière.

#### V.IV.II. 📝 Onglet Playlists

Pour afficher les playlists, implémentez un composant avec une vue vide intitulé ***playlistTab.js*** dans le dossier ***tab***. Pour afficher les playlists nous allons utiliser une ***ScrollView*** et des cartes dans ***React Native Elements***. Pour installer cette dépendance, dans une terminal de commandes à la racine du projet, faites la commande suivante :

`npm install react-native-elements`

Pour tester l'affichage de nos cartes (puisque nous n'avons encore pas de connexion à l'API), nous allons créer une constante à l'extérieur du composant pour répertorier les différentes playlists : 

```js
const playlists = [
    {
        name : 'Toad Party !',
        imageUrl : 'https://vignette.wikia.nocookie.net/mario/images/3/38/CTTTChampignonD%27invincibilit%C3%A9.png/revision/latest?cb=20170322153140&path-prefix=fr'
    },
    {
        name : 'Mario Party !',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a9/MarioNSMBUDeluxe.png'
    }
];
```

On va donc pouvoir établir la vue en fonction de cette liste : 

```js
render() {
	return(
 	   <ScrollView style={stylePlaylist.container}>
       {
	       playlists.map((playlist, i) =>{
         	  return(
      	        <Card key={i}>
     	           <View style={stylePlaylist.cardContainer}>
         	          <View>
              	      	<Image
               	        	style={stylePlaylist.imageStyle}
                           resizeMode="cover"
                           source={{ uri: playlist.imageUrl }}
                       />
                       </View>
                       <View style={stylePlaylist.infoPlaylistContainer}>
    	                   <Text>{playlist.name}</Text>
                       </View>
                   </View>
                </Card>
               );
           })
    	}
        </ScrollView>
    )
}
```

Dans le *ScrollView*, on effectue un ***map*** sur la variable *playlists* pour créer une carte pour chaque éléments de la liste. Chaque élément va pouvoir être récupéré ainsi qu'une clé unique pour l'identifier facilement. On applique cette clé à chaque carte. On implémente ensuite une image et le titre de la playlist. 

Le style est à votre discrétion pour la suite du tutoriel, le code source fourni peut vous donner un exemple d'implémentation.

#### V.IV.III. 🔍 Onglets Recherche

Cette fois, nous allons créer un dernier onglet de recherche de chansons, intitulé ***searchTab.js*** dans le le dossier *tabs*. La aussi, implémentez un composant avec un render vide.

La différence avec la vue précédente, c'est d'ajouter un ***TextInput*** comme barre de recherche et de changer quelque peu la liste de retour de la recherche. Nous allons aussi placer un bouton pour lancer la recherche, pour plus de facilité de traitement, à placer hors de la  ***ScrollView*** par vos soins.

Pour ajouter un ***TextInput***, nous avons besoin d'utiliser la variable ***state*** du composant React, qui permet d'être stockée et d'être modifiée en temps réel, pendant que la vue est affichée. Le constructeur du composant sera donc implémenté de la sorte : 

```js
constructor(props) {
	super(props);
   	this.state = {
  	  textSearch: ""
    }
}
```

Dans la vue, avant le *ScrollView*, nousa allons ajouter le *TextInput* : 

```js
<View style={styleSearch.textInputContainer}>
	<TextInput
 		style={styleSearch.textInput}
		placeholder="Search a song !"
        onChangeText={(textSearch) => this.setState({textSearch})}
        value={this.state.textSearch}
        onSubmitEditing={}
	/>
</View>
```

Ici, lorsque l'input est modifié, on adapte la variable *state* pour stocker le résultat en temps réel.

La propriété ***onSubmitEditing*** va nous permettre de définir un comportement quand l'utilisateur appuyera sur la touche entrée de son clavier. 

Pour implémenter les cartes, inspirez vous du code de l'onglet précédent tous en prenant soin de s'adapter à ce type de résultat : 

```js
const result = [
    {
        name: 'GoGoToad',
        mainArtist : 'Toad',
        albumName: 'Toad Dance',
        imageUrl : 'https://vignette.wikia.nocookie.net/mario/images/3/38/CTTTChampignonD%27invincibilit%C3%A9.png/revision/latest?cb=20170322153140&path-prefix=fr'
    },
    {
        name : 'Marrrriiiooo',
        mainArtist: 'Mario',
        albumName: 'Mario and the Gambas',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a9/MarioNSMBUDeluxe.png'
    }
];
```

#### V.IV.IV. :anchor: Navigateur de la vue principale

Dans le fichier ***mainScreen.js***, nous allons implémenter dans la vue uniquement un nouveau navigateur. En effet, nous allons implémenter celui-ci sous un système de barre avec des onglets.

Dans un premier temps, il faut créer la variable du navigateur en dehors du composant : 

```js
const Tab = createBottomTabNavigator();
```

La navigateur contiendra des icônes et dans notre cas, nous allons utiliser ***vector-icons*** de expo. Cette dépendance contient de nombreux icônes de différentes plateformes gratuites. Pour l'installer , ouvrez un terminal de commandes à la racine du projet et lancez : 

`npm i @expo/vector-icons`

Pour cet exemple, nous allons s'orienter sur les icons *Iosicons*. Il suffit de placer cet import dans le fichier javascript : 

```js
import { Ionicons } from '@expo/vector-icons';
```

Nous sommes enfin en capacité de construire notre vue : 

```js
render() {
	return(
		<NavigationContainer independent={true}>
			<Tab.Navigator screenOptions={({route}) => ({
				tabBarIcon: ({focused, color, size}) => {
					let iconName;

					if(route.name === 'Home') {
						iconName = 'md-home';
					}else if(route.name === 'Playlist'){
						iconName = 'ios-list';
					}else if(route.name === 'Search'){
						iconName = 'md-search';
					}

					return <Ionicons name={iconName} size={size} color={color}/>;
				},
				})}
				tabBarOptions={{
					activeTintColor: '#20D760',
					inactiveTintColor: 'gray',
				}}
			>
				<Tab.Screen name="Home" component={HomeView} />
				<Tab.Screen name="Playlist" component={PlaylistView} />
				<Tab.Screen name="Search" component={SearchView} />
			</Tab.Navigator>
		</NavigationContainer>
	)
}
```

Sous le même principe que le premier navigateur, on répertorie les différentes vues dans lequelles on pourra naviguer. Il nous faut aussi spécifier des icônes pour chaque onglet, ce que l'on fait dans le paramètre ***tabBarIcon*** de la balise ***Tab.Navigator***. On défini aussi un comportement du navigateur pour nous indiquer l'onglet dans lequel nous sommes, dans le paramètre ***tabBarOptions***. Comme dans l'exemple du premier navigateur, pensez à créer les fonctions qui vont appeler les vues des onglets que l'on a créé précédement.

Attention, il ne peut normalement avoir qu'un navigateur par application. Pour spécifier à l'application qu'il faut remplacer le navigateur du ***App.js*** par celui-ci, nous devons ajouter le paramètre `independent={true}` à la balise ***NavigationContainer***.

### V.V. ✨ Conclusion

A travers cet exemple, nous avons pu être en mesure de vous donner quelques bases sous React et React Native. Nous allons ensuite implémenter l'utilisation de l'API et l'intégrer à ce front-end.











