const Article = require('../models/articleModel');

exports.createArticle = (req, res) => {
  const { titre, contenu, auteur, date, categorie, tags } = req.body;

  const articleData = {
    titre,
    contenu,
    auteur,
    date,
    categorie,
    tags: Array.isArray(tags) ? tags.join(',') : (tags || '')
  };

  Article.create(articleData, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Erreur serveur lors de la création de l'article.",
        error: err.message
      });
    }

    return res.status(201).json({
      message: "Article créé avec succès.",
      article: result
    });
  });
};

exports.getAllArticles = (req, res) => {
  const filters = {
    categorie: req.query.categorie,
    auteur: req.query.auteur,
    date: req.query.date
  };

  Article.findAll(filters, (err, articles) => {
    if (err) {
      return res.status(500).json({
        message: "Erreur serveur lors de la récupération des articles.",
        error: err.message
      });
    }

    return res.status(200).json(articles);
  });
};

exports.getArticleById = (req, res) => {
  const { id } = req.params;

  Article.findById(id, (err, article) => {
    if (err) {
      return res.status(500).json({
        message: "Erreur serveur lors de la récupération de l'article.",
        error: err.message
      });
    }

    if (!article) {
      return res.status(404).json({
        message: "Article non trouvé."
      });
    }

    return res.status(200).json(article);
  });
};

exports.updateArticle = (req, res) => {
  const { id } = req.params;
  const { titre, contenu, auteur, date, categorie, tags } = req.body;

  Article.findById(id, (err, existingArticle) => {
    if (err) {
      return res.status(500).json({
        message: "Erreur serveur lors de la vérification de l'article.",
        error: err.message
      });
    }

    if (!existingArticle) {
      return res.status(404).json({
        message: "Article non trouvé."
      });
    }

    const updatedData = {
      titre,
      contenu,
      auteur,
      date,
      categorie,
      tags: Array.isArray(tags) ? tags.join(',') : (tags || '')
    };

    Article.update(id, updatedData, (err, changes) => {
      if (err) {
        return res.status(500).json({
          message: "Erreur serveur lors de la mise à jour.",
          error: err.message
        });
      }

      return res.status(200).json({
        message: "Article mis à jour avec succès.",
        updatedRows: changes
      });
    });
  });
};

exports.deleteArticle = (req, res) => {
  const { id } = req.params;

  Article.findById(id, (err, article) => {
    if (err) {
      return res.status(500).json({
        message: "Erreur serveur lors de la vérification de l'article.",
        error: err.message
      });
    }

    if (!article) {
      return res.status(404).json({
        message: "Article non trouvé."
      });
    }

    Article.delete(id, (err, changes) => {
      if (err) {
        return res.status(500).json({
          message: "Erreur serveur lors de la suppression.",
          error: err.message
        });
      }

      return res.status(200).json({
        message: "Article supprimé avec succès.",
        deletedRows: changes
      });
    });
  });
};

exports.searchArticles = (req, res) => {
  const { query } = req.query;

  if (!query || query.trim() === '') {
    return res.status(400).json({
      message: "Le paramètre de recherche 'query' est obligatoire."
    });
  }

  Article.search(query, (err, articles) => {
    if (err) {
      return res.status(500).json({
        message: "Erreur serveur lors de la recherche.",
        error: err.message
      });
    }

    return res.status(200).json(articles);
  });
};
