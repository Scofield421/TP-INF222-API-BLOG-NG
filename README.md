```md
 Blog API

API backend simple de gestion des articles de blog realisee avec Node.js, Express, SQLite, better-sqlite3 et Swagger UI.

 Description

Ce projet est une API REST permettant de gerer des articles de blog.  
Il permet de :

- creer un article
- recuperer tous les articles
- recuperer un article par son identifiant
- modifier un article
- supprimer un article
- rechercher des articles par mot-cle

Ce projet a ete realise dans le cadre d'un apprentissage du developpement backend avec une architecture claire de type MVC.


 Technologies utilisees

- Node.js
- Express.js
- SQLite
- better-sqlite3
- Swagger UI
- express-validator
- cors
- nodemon


Fonctionnalites

L'API prend en charge les fonctionnalites suivantes :

1. Creation d'un article
2. Recuperation de tous les articles
3. Filtrage des articles par categorie, auteur ou date
4. Recuperation d'un article par ID
5. Mise a jour d'un article
6. Suppression d'un article
7. Recherche d'articles par texte dans le titre ou le contenu
8. Documentation interactive avec Swagger


 Structure du projet

```bash
blog-api/
├── app.js
├── package.json
├── README.md
├── .gitignore
├── config/
│   ├── db.js
│   └── swagger.js
├── controllers/
│   └── articleController.js
├── middlewares/
│   ├── errorHandler.js
│   └── validate.js
├── models/
│   └── articleModel.js
├── routes/
│   └── articleRoutes.js
└── database/
    └── blog.db
```

Role des principaux fichiers

- `app.js` : point d'entree de l'application
- `config/db.js` : configuration de la base SQLite
- `config/swagger.js` : configuration de Swagger
- `controllers/articleController.js` : logique de traitement des requetes
- `models/articleModel.js` : operations sur la base de donnees
- `routes/articleRoutes.js` : definition des endpoints de l'API
- `middlewares/validate.js` : validation des donnees
- `middlewares/errorHandler.js` : gestion des erreurs serveur



Installation du projet

1. Cloner le depot

```bash
git clone <lien-du-depot>
cd blog-api
```

 2. Installer les dependances

```bash
npm install
```
 3. Lancer le serveur

En mode developpement :

```bash
npm run dev
```

En mode normal :

```bash
npm start
```

Demarrage attendu

Si tout fonctionne correctement, le terminal doit afficher un message proche de celui-ci :

```bash
Connecte a la base SQLite.
Serveur lance sur http://localhost:3000
Documentation Swagger disponible sur http://localhost:3000/api-docs
```

Acces a l'application

Une fois le serveur lance, les adresses suivantes sont disponibles :

- API : `http://localhost:3000`
- Documentation Swagger : `http://localhost:3000/api-docs`


Base de donnees

La base de donnees utilisee est SQLite.

Le fichier de base est stocke ici :

```bash
database/blog.db
```

La table `articles` est creee automatiquement au demarrage si elle n'existe pas.

 Structure des articles

Chaque article contient les champs suivants :

- `id` : identifiant unique
- `titre` : titre de l'article
- `contenu` : contenu principal
- `auteur` : nom de l'auteur
- `date` : date de publication
- `categorie` : categorie de l'article
- `tags` : liste de mots-cle stockee sous forme de texte

Endpoints disponibles

 1. Creer un article
**POST** `/api/articles`

 Corps JSON attendu

```json
{
  "titre": "Introduction a Express.js",
  "contenu": "Express.js est un framework minimaliste pour Node.js.",
  "auteur": "Auteur",
  "date": "2026-03-18",
  "categorie": "Backend",
  "tags": ["nodejs", "express", "api"]
}
```

Reponse attendue
- Code `201` si la creation reussit
- Code `400` si les donnees sont invalides
- Code `500` si une erreur serveur survient



2. Recuperer tous les articles
**GET** `/api/articles`

 Reponse attendue
- Code `200`
- Tableau JSON contenant les articles enregistres



3. Filtrer les articles
**GET** `/api/articles?categorie=Backend`  
**GET** `/api/articles?auteur=Auteur`  
**GET** `/api/articles?date=2026-03-18`

 Reponse attendue
- Code `200`
- Tableau JSON des articles correspondants au filtre

 4. Recuperer un article par ID
**GET** `/api/articles/1`

 Reponse attendue
- Code `200` si l'article existe
- Code `404` si l'article n'existe pas


5. Mettre a jour un article
**PUT** `/api/articles/1`

Corps JSON attendu

```json
{
  "titre": "Introduction a Express.js mise a jour",
  "contenu": "Express.js facilite la creation d'API REST avec Node.js.",
  "auteur": "Auteur",
  "date": "2026-03-18",
  "categorie": "Backend",
  "tags": ["express", "rest", "mvc"]
}
```

Reponse attendue
- Code `200` si la mise a jour reussit
- Code `400` si les donnees sont invalides
- Code `404` si l'article n'existe pas
- Code `500` si une erreur serveur survient

 6. Supprimer un article
**DELETE** `/api/articles/1`

 Reponse attendue
- Code `200` si la suppression reussit
- Code `404` si l'article n'existe pas
- Code `500` si une erreur serveur survient

7. Rechercher un article
**GET** `/api/articles/search?query=Express`

Cette route permet de rechercher un mot ou une expression dans :

- le titre
- le contenu

 Reponse attendue
- Code `200`
- Tableau JSON des articles trouves
- Code `400` si le parametre `query` est absent
- Code `500` si une erreur serveur survient

 Validation des donnees

La validation des donnees est assuree avec `express-validator`.

Les regles principales sont les suivantes :

- le `titre` est obligatoire
- le `contenu` est obligatoire
- l'`auteur` est obligatoire
- la `date` doit etre au format `YYYY-MM-DD`
- la `categorie` est obligatoire
- l'`id` doit etre un entier
- les `tags` doivent etre un tableau lorsqu'ils sont fournis

Si les donnees sont invalides, l'API renvoie un code `400 Bad Request`.


Codes HTTP utilises

L'API utilise les codes suivants :

- `200 OK` : operation reussie
- `201 Created` : creation reussie
- `400 Bad Request` : requete invalide ou donnees incorrectes
- `404 Not Found` : ressource non trouvee
- `500 Internal Server Error` : erreur interne du serveur

 Documentation Swagger

La documentation interactive de l'API est disponible ici :

```bash
http://localhost:3000/api-docs
```

Cette interface permet de :

- voir tous les endpoints disponibles
- comprendre les parametres attendus
- tester directement les routes dans le navigateur
- consulter les formats de requetes et de reponses

 Tests rapides avec curl

 Creer un article

```bash
curl -X POST http://localhost:3000/api/articles \
-H "Content-Type: application/json" \
-d '{
  "titre": "Mon premier article",
  "contenu": "Ceci est le contenu de mon premier article.",
  "auteur": "Auteur",
  "date": "2026-03-18",
  "categorie": "Tech",
  "tags": ["node", "express"]
}'
```
 Recuperer tous les articles

```bash
curl http://localhost:3000/api/articles
```

 Recuperer un article par ID

```bash
curl http://localhost:3000/api/articles/1
```

Rechercher un article

```bash
curl "http://localhost:3000/api/articles/search?query=article"
```

Mettre a jour un article

```bash
curl -X PUT http://localhost:3000/api/articles/1 \
-H "Content-Type: application/json" \
-d '{
  "titre": "Article modifie",
  "contenu": "Nouveau contenu",
  "auteur": "Auteur",
  "date": "2026-03-18",
  "categorie": "Backend",
  "tags": ["api", "sqlite"]
}'
```

Supprimer un article

```bash
curl -X DELETE http://localhost:3000/api/articles/1
```

roblemes frequents et solutions

 1. Le serveur ne demarre pas
Verifier que les dependances sont bien installees :

```bash
npm install
```

 2. Le port 3000 est deja utilise
Arreter les processus Node actifs :

```bash
killall node
```

Puis relancer :

```bash
npm run dev
```

3. Erreur 400
Cela signifie souvent que les donnees envoyees sont invalides.
Verifier :
- les champs obligatoires
- le format de la date
- le type de `tags`
- le parametre `query`

4. Erreur 500
Cela signifie qu'un probleme interne est survenu.
Verifier :
- le terminal
- la base de donnees
- les fichiers du projet
- la syntaxe du JSON envoye

 5. JSON invalide
Verifier qu'il n'y a pas :
- de virgule apres le dernier champ
- de texte en trop apres `}`
- de guillemets simples a la place des guillemets doubles


Script disponibles

Dans `package.json`, les scripts disponibles sont :

```json
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js"
}
```
 Utilisation

Lancer normalement :
```bash
npm start
```

Lancer en developpement avec redemarrage automatique :
```bash
npm run dev
```

Ameliorations possibles

Ce projet peut etre ameliore de plusieurs manieres :

- ajout d'une authentification utilisateur
- ajout d'une pagination pour les articles
- stockage des tags dans une table separee
- ajout d'une interface frontend
- deploiement sur Render ou Railway
- ajout de tests automatises
