<div align="center">
  <img src="https://centresrelier.org/wp-content/uploads/2022/01/CR_logo.svg" width="400">
</div>

# Guide Maux D'enfants

Le projet associatif a pour but de regrouper toutes les associations de france en rapport avec les enfants victimes
de harcèlement ou violences sous toutes ses formes.

L'application prend la forme d'un moteur de recherche avec la possibilité de filtrer les résultats par catégories âge et adresse.


# Stack thechnique

Ce project est fait avec [Quasar](https://quasar.dev/), un framework pour [Vue3](https://vuejs.org/). Quasar est responsable pour les composants, le _look and feel_ et les outils de dev. Vue sert de moteur sous le capot.
L'état interne de l'application est géré avec [pinia](https://pinia.vuejs.org/) pour Vue.

Le client http choisi pour interagir avec le back-end est [Axios](https://axios-http.com/docs/intro).

Le site utilise [hCaptcha](https://www.hcaptcha.com/) comme solution d'antispam/anti-robot.

La partie back-end est un Strapi.

## Installer les dépendances
```bash
yarn
# or
npm install
```

### Run le projet
```bash
quasar dev
```

Pour pouvoir éditer / faire des call au backend, ajouter un fichier `.env` dans le dossier racine avec le token dedans. Le fichier est parsé avec le paquet `dotenv`.

### Lint
```bash
yarn lint
# or
npm run lint
```



### Production
```bash
quasar build
```

### Configuration
Voir [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js)

