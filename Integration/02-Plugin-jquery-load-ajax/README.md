# Plugin jQuery Fremin Florian

> jQuery plugin permettant la création d'une navigation en Ajax.

- Demo : https://demo-plugin-ajax-jquery.herokuapp.com/
- Le plugin fonctionne sur les liens d'une page choisits
- Le plugin si il est désactiver n'empêche pas le fonctionnement de votre navigation.
- Le plugin prend en charge l'historique du navigateur (gestion de l'api History, et de l'event popstate)
- Une transition est mis en place pour indiquer à l'utilisateur qu'un contenu est en cours de chargement

## Getting started

- Cloner le repo: `git@github.com:fremin33/plugin_jquery_ajax_fremin.git`

## Setup

1. Créer un menu qui va contenir un id unique qui contiendra les differents liens des pages à charger par le plugin : 

```html
<!-- index.html -->
<nav id="myMenu">
    <ul>
        <li><a href="./">Home Page</a></li>
        <li><a href="page2.html">Simpsons</a></li>
    </ul>
</nav>

<div class="output" id="data">
    Le contenu de ma page principal et des autres pages
</div>
```

2. Inclure jQuery, plugin.js et votre fichier JS qui sera chargé d'appeler le script à la fin de votre body:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="js/plugin.js"></script>
<script src="js/index.js"></script>
```

3. Appeler le plugin dans votre fichier JS en sélectionnant les liens de votre menu :

```javascript
// js/index.js
$(document).ready(function () {
    $('#myMenu a').myPlugin();
});
```

4. Pour charger le contenu des autres pages dans notre home, il suffirat d'y introduire la div data avec les différents scripts mentionné dans l'étape 2.

```html
<!-- page2.html -->
<div id="data">
    Ce contenu sera chargé par mon index.html
</div>
```



## Options

Listes des options disponibles

```javascript
$('#myMenu a').myPlugin({
    output: 'output',
    dataDiv: 'data',
    removeExtension: true,
    loader: {
        source: 'https://bit.ly/2Jmnf3u',
        css: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "none",
        }
    },
});
```

| Attribute         | Default                  | Type    | Description                                    |
| ----------------- | ------------------------ | ------- | :--------------------------------------------- |
| `output`          | `output`                 | *class* | Class de la div qui réceptionnera la data      |
| `dataDiv`         | `data`                   | *id*    | Id de la div où sera stocké les data à charger |
| `removeExtension` | `false`                  | boolean | Permet de supprimer l'extension dans l'url     |
| `loader`          |                          | object  | Objet qui permet de personnaliser le loader    |
| `source`          | `https://bit.ly/2Jmnf3u` | string  | Chemin de l'url du loader                      |
| `css`             |                          | object  | Propriété css du loader                        |

## Structure

Structure basic du project est donnée ci-dessous : 

```
|-- index.html
|-- page2.html
|-- js/
|   |-- plugin.js
|   |-- index.js
```

#### index.html

Page principale du site qui contiendra la div avec la class **output** et l'id **data**

#### page2.html

Page secondaire qui contiendra seulement la div avec l'id data pour l'afficher dans l'index

#### js/

Contient les fichiers javascript (le plugin et le fichier qui chargera le plugin)

#### 
