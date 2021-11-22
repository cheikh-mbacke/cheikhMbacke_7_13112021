
const db = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = db.users;

const Op = db.Sequelize.Op;


// Create and Save a new User
exports.signup = (req, res) => {
  User.findOne({ where: { email: req.body.email } })
  .then(user => {
    if (!user) {
      //Hash password
      bcrypt.hash(req.body.password, 10)
        .then(hash => {
        // Create a new User
          const newUser = {
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: hash
          }
        // Save User in the database
        User.create(newUser)
          .then(() => res.status(201).json({message: 'success'}))
          .catch(error => res.status(500).json({ error }))
      })
      .catch(error => res.status(500).json({ error: 'Decryptage de mot de passe echoué !' }))
    } else {
        res.status(401).json({
        error: `L'adresse ${req.body.email} existe déjà, réessayez avec une autre !`
      });
    }
  })
  .catch(error => res.status(500).json({ error: "Erreur dans la requête  sql" }));

};

// Find a single User with an id
exports.login = (req, res) => {

  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (user) {
        //So Hash password
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if(!valid){
              return res.status(401).json({ error: 'Mot de passe incorrect !' })
          }
          return res.status(200).json({
            userId: user.id,
              token: jwt.sign(
                  {userId: user._id},
                  'secret',
                  {expiresIn: '24h'}, 
              )
            })
        })
        .catch(error => res.status(500).json({ error: 'Decryptage de mot de passe echoué !' }))

      } else {
          res.status(404).json({
          error: `Impossible de trouver l'utlisateur avec l'adresse  ${req.body.email}.`
        });
      }
    })
    .catch(error => res.status(500).json({ error: "Erreur dans la requête  sql" }));
  
};

// Update user profil by the id in the request
exports.updateUser = (req, res) => {

  const user = req.file ?
    {
      ...req.body,
      avatarPath: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  User.update(user, {
    where: { id: user.userId }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).json({
          message: "succès"
        });
      } else {
        res.status(400).json({
          error: `Mise à jour échouée ! Contactez votre administrateur pour en savoir plus`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        error: "Erreur dans la requête  sql"
      });
    });
};


// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};

