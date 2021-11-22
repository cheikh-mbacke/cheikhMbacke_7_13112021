const db = require("../models");
const Post = db.posts;
const TextPost = db.textPosts;
const LinkPost = db.linkPosts;
const VideoPost = db.videoPosts;
const Op = db.Sequelize.Op;

// Create and Save a new TextPost
exports.createATextPost = (req, res) => {
    TextPost.create({content: req.body.content})
    .then(result => {
        Post.create({userId:req.body.userId, idTextPost: result.id})
        .then(() => res.status(201).json({message: "succès"}))
        .catch(err => res.status(500).json({ err }))
        
    })
    .catch(error => res.status(500).json({ error }))
};
// Like a TextPost
exports.likeATextPost = (req, res) => {
    User.findOne({ where: { id: req.body.idTextPost} })
    .then(textPost => {
        if (textPost) {
            TextPost.update(req.body, {where: { id: textPost.id }})
            .then(num => {
                if (num == 1) {
                  res.status(200).json({
                    message: "succès"
                  });
                } else {
                  res.status(400).json({
                    error: `Impossible d'aimer ce post`
                  });
                }
              })
            .catch(err => {
                res.status(500).send({
                  error: "Erreur dans la requête  sql"
                });
              });
             
        } else{
            res.status(404).json({error: `Impossible de trouver ce post !`})
        }
    })
    .catch(error => res.status(500).json({ error: "Erreur dans la requête  sql" }));  
};

// Create and Save a new LinkPost
exports.createALinkPost = (req, res) => {
    LinkPost.create({title: req.body.title, url: req.body.url})
    .then(result => {
        Post.create({userId:req.body.userId, idLinkPost: result.id})
        .then(() => res.status(201).json({message: "succès"}))
        .catch(err => res.status(500).json({ err }))
        
    })
    .catch(error => res.status(500).json({ error }))
};

// Create and Save a new VideoPost
exports.createAVideoPost = (req, res) => {
    const videoPost = req.file ?
    {
      ...req.body,
      path: `${req.protocol}://${req.get('host')}/video/${req.file.filename}`
    } : { ...req.body };

    VideoPost.create({path: videoPost.path, title: videoPost.title, subTitle: videoPost.dubTitle})
    .then(result => {
        Post.create({userId:videoPost.userId, idVideoPost: result.id})
        .then(() => res.status(201).json({message: "succès"}))
        .catch(err => res.status(500).json({ err }))
        
    })
    .catch(error => res.status(500).json({ error }))
};