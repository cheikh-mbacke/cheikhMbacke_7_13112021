const db = require("../models/index");
const Comment = db.Comments;
const User = db.Users;

//Create and Save a new Comment
exports.createAComment = (req, res) => {
    console.log(req.body.data)
    
    Comment.create(req.body.data)
        .then(() => {
            Comment.findAll({where: {idPost: req.body.data.idPost}})
            .then(result => {
                res.status(201).json(result)
            })
            .catch(error => res.status(500).json({ message: "Erreur dans la requête sql" }))
            
        })
        .catch(error => res.status(500).json({ message: "Erreur dans la requête sql" }))
};
//Delete a Comment
exports.deleteAComment = (req, res) => {
    
    Comment.destroy({where: {
        id: req.body.id,
        idPost: req.body.idPost,
        userId: req.body.userId
    }})
        .then(num => {
            if(num == 1){
                res.status(200).json({message: "Commentaire supprimé !"}) 
            }else{
                res.status(400).json({message: "Le commentaire n'est pas supprimé !"})  
            }
             
        })
        .catch(err => res.status(500).json({ message: err }))
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


