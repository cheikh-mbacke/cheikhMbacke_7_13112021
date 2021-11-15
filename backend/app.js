const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const sauceRoutes = require('./routes/sauce');
const path = require('path');
const helmet = require('helmet');

//connexion à la BDD mongoDB Atlas
mongoose.connect('mongodb+srv://root:root@cluster0.wf5vb.mongodb.net/tests?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express()
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

//requêtes d'authentification
app.use('/api/auth', authRoutes);

//
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes );

module.exports = app