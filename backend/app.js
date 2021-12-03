const express = require('express');
const path = require('path');
const helmet = require('helmet');
const authRoutes = require('./routes/auth.route');
const postRoutes = require('./routes/post.route');
const commentRoutes = require('./routes/comment.route');
const userRoutes = require('./routes/user.route');


const app = express()
//connexion à la BDD mongoDB Atlas

const db = require("./models");
db.sequelize.sync();
app.use(helmet());
/*Analyser les corps des requêtes entrantes
Comme la forme req.body est basée sur une entrée
contrôlée par l'utilisateur, toutes les propriétés
et valeurs de cet objet ne sont pas approuvées et
doivent être validées avant d'être approuvées*/
app.use(express.json());

//Configuration CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use('/videos', express.static(path.join(__dirname, 'videos')));
//requêtes d'authentification
app.use('/api/auth', authRoutes);

//user req
app.use('/api/users', userRoutes);

//requête post
app.use('/api/post', postRoutes);

//comments req
app.use('/api/comment', commentRoutes);

module.exports = app