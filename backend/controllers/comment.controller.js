const db = require("../models/index");
const Comment = db.Comments;
const User = db.Users;

//Create and Save a new Comment
exports.createAComment = (req, res) => {
    console.log(req.body)
    
    Comment.create(req.body)
        .then(() => {
            res.status(201).json({ message: "succès" })
        })
        .catch(error => res.status(500).json({ message: "Erreur dans la requête sql" }))
};

//Get all comments for a post
exports.getAllcomments = (req, res) => {
    Comment.findAll({
        where: { idPost: req.body.idPost, postType: req.body.postTableName },
        attributes: ['id', 'content', 'createdAt', 'userId', 'postType']
    })
        .then(result => {
            if (result.length === 0) {
                res.status(200).json({ commentNbr: 0, result })
            } else {
                res.status(200).json({ commentNbr: result.length, result })
            }
        })
        .catch(err => res.status(500).json({ error: "Erreur dans la requête sql !" }))
}


