const express = require('express');
const { body, param, query } = require('express-validator');
const router = express.Router();

const articleController = require('../controllers/articleController');
const { handleValidationErrors } = require('../middlewares/validate');

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: API de gestion des articles du blog
 */

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Créer un nouvel article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titre
 *               - contenu
 *               - auteur
 *               - date
 *               - categorie
 *             properties:
 *               titre:
 *                 type: string
 *               contenu:
 *                 type: string
 *               auteur:
 *                 type: string
 *               date:
 *                 type: string
 *                 example: 2026-03-18
 *               categorie:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Article créé avec succès
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */
router.post(
  '/',
  [
    body('titre').notEmpty().withMessage('Le titre est obligatoire.'),
    body('contenu').notEmpty().withMessage('Le contenu est obligatoire.'),
    body('auteur').notEmpty().withMessage("L'auteur est obligatoire."),
    body('date')
      .notEmpty().withMessage('La date est obligatoire.')
      .isISO8601().withMessage('La date doit être au format YYYY-MM-DD.'),
    body('categorie').notEmpty().withMessage('La catégorie est obligatoire.'),
    body('tags').optional().isArray().withMessage('Les tags doivent être un tableau.')
  ],
  handleValidationErrors,
  articleController.createArticle
);

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Récupérer tous les articles ou filtrer par catégorie, auteur ou date
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: categorie
 *         schema:
 *           type: string
 *         description: Filtrer par catégorie
 *       - in: query
 *         name: auteur
 *         schema:
 *           type: string
 *         description: Filtrer par auteur
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *         description: Filtrer par date
 *     responses:
 *       200:
 *         description: Liste des articles
 *       500:
 *         description: Erreur serveur
 */
router.get('/', articleController.getAllArticles);

/**
 * @swagger
 * /api/articles/search:
 *   get:
 *     summary: Rechercher un article par texte dans le titre ou le contenu
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Texte à rechercher
 *     responses:
 *       200:
 *         description: Résultats de la recherche
 *       400:
 *         description: Paramètre query manquant
 *       500:
 *         description: Erreur serveur
 */
router.get(
  '/search',
  [
    query('query').notEmpty().withMessage("Le paramètre 'query' est obligatoire.")
  ],
  handleValidationErrors,
  articleController.searchArticles
);

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Récupérer un article par son ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'article
 *     responses:
 *       200:
 *         description: Article trouvé
 *       404:
 *         description: Article non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get(
  '/:id',
  [
    param('id').isInt().withMessage("L'ID doit être un entier.")
  ],
  handleValidationErrors,
  articleController.getArticleById
);

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Mettre à jour un article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'article
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titre
 *               - contenu
 *               - auteur
 *               - date
 *               - categorie
 *             properties:
 *               titre:
 *                 type: string
 *               contenu:
 *                 type: string
 *               auteur:
 *                 type: string
 *               date:
 *                 type: string
 *               categorie:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Article mis à jour
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Article non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put(
  '/:id',
  [
    param('id').isInt().withMessage("L'ID doit être un entier."),
    body('titre').notEmpty().withMessage('Le titre est obligatoire.'),
    body('contenu').notEmpty().withMessage('Le contenu est obligatoire.'),
    body('auteur').notEmpty().withMessage("L'auteur est obligatoire."),
    body('date')
      .notEmpty().withMessage('La date est obligatoire.')
      .isISO8601().withMessage('La date doit être au format YYYY-MM-DD.'),
    body('categorie').notEmpty().withMessage('La catégorie est obligatoire.'),
    body('tags').optional().isArray().withMessage('Les tags doivent être un tableau.')
  ],
  handleValidationErrors,
  articleController.updateArticle
);

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Supprimer un article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'article
 *     responses:
 *       200:
 *         description: Article supprimé
 *       404:
 *         description: Article non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete(
  '/:id',
  [
    param('id').isInt().withMessage("L'ID doit être un entier.")
  ],
  handleValidationErrors,
  articleController.deleteArticle
);

module.exports = router;
