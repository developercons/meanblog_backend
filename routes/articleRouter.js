const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Articles = require('../models/articles');

const articleRouter = express.Router();

articleRouter.use = (bodyParser.json());

articleRouter.route('/')

.get((req, res, next) => {
        Articles.find({})
            .then((articles) => {
                res.statusCode = 200;
                console.log("hello");
                res.setHeader('Content-Type', 'application/json');
                res.json(articles);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Articles.create(req.body)
            .then((article) => {
                console.log('Article Created', article);
                res.statusCode = 200;
                res.setHeader('content-Type', 'application/json');
                res.json(article)
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('Put operation does not supported on articles');
    })
    .delete((req, res, next) => {
        Articles.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

articleRouter.route('/:articleId')

.get((req, res, next) => {
        Articles.findById(req.params.articleId)
            .then((articles) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(articles);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('Post operation does not supported on /articles/' + req.params.articleId);
    })
    .put((req, res, next) => {
        Articles.findByIdAndUpdate(req.params.articleId, {
                $set: req.body
            }, { new: true })
            .then((articles) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(articles);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Articles.findByIdAndRemove(req.params.articleId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

/**********************************Comments Section******************************/

articleRouter.route('/:articleId/comments')
    .get((req, res, next) => {
        Articles.findById(req.params.articleId)
            .then((articles) => {
                if (articles != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(articles.comments);
                } else {
                    err = new Error('Article' + req.params.articleId + 'not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Articles.findById(req.params.articleId)
            .then((article) => {
                    if (article != null) {
                        article.comments.push(req.body);
                        article.save()
                            .then((article) => {
                                res.statusCode = 200;
                                res.setHeader('content-Type', 'application/json');
                                res.json(article);
                            }, (err) => next(err));
                    } else {
                        err = new Error('Article' + req.params.articleId + 'not found');
                        err.status = 404;
                        return next(err);
                    }
                },
                (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('Put operation does not supported on articles/comments');
    })
    .delete((req, res, next) => {
        Articles.findById(req.params.articleId)
            .then(() => {
                if (article != null) {
                    for (var i = (dish.comments.length - 1); i >= 0; i--) {
                        article.comments.id(article.comments[i]._id).remove();
                    }
                    dish.save()
                        .then((dish) => {
                            res.statusCode = 200;
                            res.setHeader('content-Type', 'application/json');
                            res.json(article);
                        }, (err) => next(err));
                } else {
                    err = new Error('Article' + req.params.articleId + 'not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })

articleRouter.route('/:articleId/comments/:commentId')
    .get((req, res, next) => {
        Articles.findById(req.params.articleId)
            .then((articles) => {
                if (articles != null && articles.comments.id(req.params.commentId) != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(articles.comments.id(req.params.commentId));
                } else if (articles == null) {
                    err = new Error('Article' + articles.params.articleId + 'not found');
                    err.status = 404;
                    return next(err);
                } else {
                    err = new Error('comment' + req.params.commentId + 'not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('Post operation does not supported on /articles/' + req.params.articleId);
    })
    .put((req, res, next) => {
        Articles.findById(req.params.articleId)
            .then((articles) => {
                if (articles != null && articles.comments.id(req.params.commentId) != null) {
                    if (req.body.comment) {
                        articles.comments.id(req.params.commentId).comment = req.body.comment;
                    }
                    articles.save()
                        .then((articles) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(articles);
                        }, (err) => next(err));
                } else if (articles == null) {
                    err = new Error('Article' + articles.params.articleId + 'not found');
                    err.status = 404;
                    return next(err);
                } else {
                    err = new Error('comment' + req.params.commentId + 'not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    /*.delete((req, res, next) => {
        Articles.findByIdAndRemove(req.params.articleId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });*/
module.exports = articleRouter;