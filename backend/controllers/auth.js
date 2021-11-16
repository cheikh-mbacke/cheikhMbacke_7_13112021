const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const sql = require("../models/db.js");
const User = require('../models/user');


//User logout
exports.signup = (req, res) => {
    
    //Verify if user exists
    sql.query("SELECT email FROM users WHERE email = '" +req.body.email+ "'", (err, result) => {
        
      if (err) {
        console.log("error: ", err);
        return res.status(500).json({ err });
      }

      if (result.length) {
        return res.status(403).json({error: 'Cette adresse e-mail existe déjà, choisi une autre !'});
      }
    
      //If user not found with the email
      //So Hash password
      bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const newUser = {
          pseudo: req.body.pseudo,
          email: req.body.email,
          password: hash
        }

        sql.query("INSERT INTO users SET ?", newUser, (err, result) => {
          if (err) {
            return res.status(500).json({err});
          }
          res.status(201).json({ id: result.insertId, ...req.body });
        });
      })
      .catch(error => res.status(500).json({ error }))
  });
    
};


//User login
exports.login = (req, res) => {
    sql.query("SELECT id, email, pseudo, password FROM users WHERE email = '" +req.body.email+ "'", (err, result) => {
        
        if (err) {
          return res.status(500).json({ err });
        }
        
        //Verify if password is correct
        if (result.length) {
          const user = result[0];
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
                    {expiresIn: '24h'}
                )
            })
        })
        .catch(error => res.status(500).json({ error }))
      }else{
        // If user not found with the email
        res.status(401).json({ error: 'Utilisateur non trouvé !'})
      }      
    });
}
