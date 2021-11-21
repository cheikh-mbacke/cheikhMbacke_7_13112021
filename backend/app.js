
const express = require('express');
const helmet = require('helmet');
const authRoutes = require('./routes/auth.route');
const path = require('path');

global.__basedir = __dirname;
const app = express()

const db = require("./models");
db.sequelize.sync();
app.use(helmet());
/*Analyser les corps des requêtes entrantes
Comme la forme req.body est basée sur une entrée
contrôlée par l'utilisateur, toutes les propriétés
et valeurs de cet objet ne sont pas approuvées et
doivent être validées avant d'être approuvées*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuration CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


//requêtes d'authentification
app.use('/api/auth', authRoutes);
const controller = require("./controllers/file.controller");
//app.use('/api/auth', (req, res, next) => res.status(200).json(req.body));
app.use('/resources/static/assets/uploads/', express.static(path.join(__dirname, 'uploads')));

app.post("/api/upload", controller.upload);
app.get("/files", controller.getListFiles);
app.get("/files/:name", controller.download);

module.exports = app