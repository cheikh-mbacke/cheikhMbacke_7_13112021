const db = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = db.Users;
const Privilege = db.Privileges;

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
              .then(userCreated => {
                Privilege.create({ userId: userCreated.id, role: 'user' })
                  .then(() => res.status(201).json({ message: "Votre compte a été créé !"}))
                  .catch(() => res.status(500).json({ message: "Création droit utilisateur échouée !" }))
              })
              .catch(() => res.status(500).json({ message: "Création compte utilisateur échouée !" }))
          })
          .catch(error => res.status(500).json({ message: 'Decryptage de mot de passe echoué !' }))
      } else {
        res.status(401).json({
          message: `L'adresse ${req.body.email} existe déjà, réessayez avec une autre !`
        });
      }
    })
    .catch(() => res.status(500).json({ message: "Erreur dans la requête  sql" }));

};

// Find a single User with an id
exports.signin = (req, res) => {

  User.findOne({ where: {email: req.body.email} })
    .then(user => {
      if (user) {
        //So Hash password
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ message: 'Mot de passe incorrect !' })
            }
            Privilege.findOne({ where: { userId: user.id }})
              .then(privilege => {
                return res.status(200).json({
                  userId: user.id,
                  pseudo: user.pseudo,
                  email: user.email,
                  role: privilege.role,
                  registerDate: user.createdAt,
                  accessToken: jwt.sign(
                    { userId: user._id },
                    'secret',
                    { expiresIn: '24h' },
                  )
                })
              })
              .catch(() => res.status(500).json({ message: "Echec de récupération des droits !" }))

          })
          .catch(() => res.status(500).json({ message: 'Decryptage de mot de passe echoué !' }))

      } else {
        res.status(404).json({
          message: `Impossible de trouver l'utlisateur avec l'adresse  ${req.body.email}.`
        });
      }
    })
    .catch(() => res.status(500).json({ message: "Le serveur rencontre un problème de traitement de cette requête"}));

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




