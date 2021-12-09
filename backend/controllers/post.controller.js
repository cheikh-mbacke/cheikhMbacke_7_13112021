const { text } = require("express");
const db = require("../models");
const Post = db.Posts;
const TextPost = db.TextPosts;
const LinkPost = db.LinkPosts;
const VideoPost = db.VideoPosts;
const ImgPost = db.ImgPosts;
const PostReaction = db.PostReactions;
const User = db.Users;
const Comment = db.Comments;


// Create and Save a new TextPost
exports.createATextPost = (req, res) => {
  console.log(req.body.data);
  TextPost.create({ content: req.body.data.content })
    .then(result => {
      Post.create({ userId: req.body.data.userId, idPost: result.id, postType: "TextPosts" })
        .then(() => res.status(201).json({ message: "succès" }))
        .catch(err => res.status(500).json({ err }))

    })
    .catch(error => res.status(500).json({ error }))
};


// Create and Save a new LinkPost
exports.createALinkPost = (req, res) => {
  LinkPost.create({ title: req.body.data.title, url: req.body.data.url })
    .then(result => {
      Post.create({ userId: req.body.data.userId, idPost: result.id, postType: "LinkPosts" })
        .then(() => res.status(201).json({ message: "succès" }))
        .catch(err => res.status(500).json({ err }))

    })
    .catch(error => res.status(500).json({ error }))
};

// Create and Save a new VideoPost
exports.createAVideoPost = (req, res) => {
  console.log(req.body);
  const videoPost = req.file ?
    {
      ...req.body,
      path: `${req.protocol}://${req.get('host')}/videos/${req.file.filename}`
    } : { ...req.body };

  VideoPost.create({ videoPath: videoPost.path, title: videoPost.title })
    .then(result => {
      Post.create({ userId: req.body.userId, idPost: result.id, postType: "VideoPosts" })
        .then(() => res.status(201).json({ message: "succès" }))
        .catch(err => res.status(500).json({ err }))

    })
    .catch(error => res.status(500).json({ error }))
};

// Create and Save a new VideoPost
exports.createAImgPost = (req, res) => {

  const imgPost = req.file ?
    {
      ...req.body,
      path: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

  ImgPost.create({ imgPath: imgPost.path, title: imgPost.title })
    .then(result => {
      Post.create({ userId: req.body.userId, idPost: result.id, postType: "ImgPosts" })
        .then(() => res.status(201).json({ message: "succès" }))
        .catch(err => res.status(500).json({ err }))

    })
    .catch(error => res.status(500).json({ error }))
};

//Get All posts
exports.getAllPosts = (req, res) => {
  const postTypes = {
    TextPosts: TextPost,
    VideoPosts: VideoPost,
    LinkPosts: LinkPost,
    ImgPosts: ImgPost,
  }
  const posts = []

  Post.findAll({ order: [['id', 'DESC']] })
    .then(result => {
      let nbrTour = (result.length);
      result.forEach(elt => {
        const table = postTypes[elt.postType];
        table.findOne({ where: { id: elt.idPost } })
          .then(post => {
            User.findOne({ where: { id: elt.userId } })
              .then(data => {
                Comment.findAll({ where: { idPost: post.id } })
                  .then(comments => {
                    post['dataValues'].pseudo = data.pseudo;
                    post['dataValues'].userId = elt.userId;
                    post['dataValues'].comments = comments;
                    posts.push(post['dataValues'])
                    nbrTour--;
                    if (nbrTour === 0) return res.status(200).send(posts)
                  })

              })
          })
      })


    })

}
// Like a Post
exports.likeAPost = (req, res) => {
  //Retrieve the type of the post
  const postTypes = {
    text: TextPost,
    video: VideoPost,
    link: LinkPost
  }
  const ReqPost = postTypes[req.body.type]

  //if user likes this post
  if (req.body.like === 1) {
    //we find the post that user has liked
    ReqPost.findOne({ where: { id: req.body.idPost } })
      .then(post => {
        //if we found the post 
        if (post) {
          //we search this post in postReactions table
          PostReaction.findOne({ where: { idPost: post.id, userId: req.body.userId } })
            .then(reaction => {
              //if we foud something, that means user has already liked this post
              //We check if he doesn't disliked the same post
              if (reaction) {
                const userDisliked = reaction.dislikes == null || 0 ? false : true
                if (!userDisliked) {
                  PostReaction.update({ likes: 1, postType: req.body.postTableName }, { where: { idPost: post.id, userId: req.body.userId } })
                    .then(num => {
                      if (num == 1) {
                        res.status(200).json({
                          message: "succès"
                        });
                      } else {
                        res.status(400).json({
                          error: `Impossible d'aimer ce poste`
                        });
                      }
                    })
                    .catch(err => {
                      res.status(500).send({
                        err
                      });
                    });
                }
                else {
                  PostReaction.update({ dislikes: 0, likes: 1, postType: req.body.postTableName }, { where: { idPost: post.id, userId: req.body.userId } })
                    .then(num => {
                      if (num == 1) {
                        res.status(200).json({
                          message: "succès"
                        });
                      } else {
                        res.status(400).json({
                          error: `Impossible d'aimer ce poste`
                        });
                      }
                    })
                    .catch(err => {
                      res.status(500).send({
                        error: "Erreur dans la requête  sql "
                      });
                    });
                }
              }
              //This user never reacts about this post
              else {
                PostReaction.create({ likes: 1, idPost: post.id, postType: req.body.postTableName, userId: req.body.userId })
                  .then(newReaction => {
                    if (newReaction) {
                      res.status(200).json({
                        message: "succès"
                      });
                    } else {
                      res.status(400).json({
                        error: `Impossible d'aimer ce post 1`
                      });
                    }
                  })
                  .catch(err => {
                    res.status(500).send({
                      error: "Erreur dans la requête  sql"
                    });
                  });
              }
            })

        } else {
          res.status(404).json({ error: `Impossible de trouver ce post !` })
        }

      })
      .catch(error => res.status(500).json({ error: "Erreur dans la requête  sql 1" + error }));
  }
  //User cancels his like
  else {
    //we find the post that user has liked
    ReqPost.findOne({ where: { id: req.body.idPost } })
      .then(post => {
        if (post) {
          PostReaction.update({ likes: 0 }, { where: { idPost: post.id, userId: req.body.userId } })
            .then(num => {
              if (num == 1) {
                res.status(200).json({
                  message: "succès"
                });
              } else {
                res.status(400).json({
                  error: `Impossible d'aimer ce post 1`
                });
              }
            })

        } else {
          res.status(404).json({ error: `Impossible de trouver ce post !` })
        }

      })
      .catch(error => res.status(500).json({ error: "Erreur dans la requête  sql" }));
  }
};

// Dislike a Post
exports.dislikeAPost = (req, res) => {
  //Retrieve the type of the post
  const postTypes = {
    text: TextPost,
    video: VideoPost,
    link: LinkPost
  }
  const ReqPost = postTypes[req.body.type]

  //if user dislikes this post
  if (req.body.dislike === 1) {
    //we find the post that user has disliked
    ReqPost.findOne({ where: { id: req.body.idPost } })
      .then(post => {
        //if we found the post 
        if (post) {
          //we search this post in postReactions table
          PostReaction.findOne({ where: { idPost: post.id, userId: req.body.userId } })
            .then(reaction => {
              //if we foud something, that means user has already liked this post
              //We check if he doesn't disliked the same post
              if (reaction) {
                const userLiked = reaction.likes == null || 0 ? false : true
                if (!userLiked) {
                  PostReaction.update({ dislikes: 1, postType: req.body.postTableName }, { where: { idPost: post.id, userId: req.body.userId } })
                    .then(num => {
                      if (num == 1) {
                        res.status(200).json({
                          message: "succès"
                        });
                      } else {
                        res.status(400).json({
                          error: `Impossible de désaprouver ce poste`
                        });
                      }
                    })
                    .catch(err => {
                      res.status(500).send({
                        err
                      });
                    });
                }
                else {
                  PostReaction.update({ dislikes: 1, likes: 0, postType: req.body.postTableName }, { where: { idPost: post.id, userId: req.body.userId } })
                    .then(num => {
                      if (num == 1) {
                        res.status(200).json({
                          message: "succès"
                        });
                      } else {
                        res.status(400).json({
                          error: `Impossible de désaprouver ce poste`
                        });
                      }
                    })
                    .catch(err => {
                      res.status(500).send({
                        error: "Erreur dans la requête  sql "
                      });
                    });
                }
              }
              //This user never reacts about this post
              else {
                PostReaction.create({ dislikes: 1, idPost: post.id, postType: req.body.postTableName, userId: req.body.userId })
                  .then(newReaction => {
                    if (newReaction) {
                      res.status(200).json({
                        message: "succès"
                      });
                    } else {
                      res.status(400).json({
                        error: `Impossible de désaprouver ce poste `
                      });
                    }
                  })
                  .catch(err => {
                    res.status(500).send({
                      error: "Erreur dans la requête  sql"
                    });
                  });
              }
            })

        } else {
          res.status(404).json({ error: `Impossible de trouver ce post !` })
        }

      })
      .catch(error => res.status(500).json({ error: "Erreur dans la requête  sql 1" }));
  }
  //User cancels his dislike
  else {
    //we find the post that user has liked
    ReqPost.findOne({ where: { id: req.body.idPost } })
      .then(post => {
        if (post) {
          PostReaction.update({ dislikes: 0 }, { where: { idPost: post.id, userId: req.body.userId } })
            .then(num => {
              if (num == 1) {
                res.status(200).json({
                  message: "succès"
                });
              } else {
                res.status(400).json({
                  error: `Impossible de désaprouver ce post 1`
                });
              }
            })

        } else {
          res.status(404).json({ error: `Impossible de trouver ce post !` })
        }

      })
      .catch(error => res.status(500).json({ error: "Erreur dans la requête  sql" }));
  }
};

//Get all Likies
exports.getAllLikes = (req, res) => {
  PostReaction.findAll({
    where: { idPost: req.body.idPost, postType: req.body.postTableName, likes: 1 },
    attributes: ['likes']
  })
    .then(result => {
      if (result.length === 0) {
        res.status(200).json({ like: 0 })
      } else {
        let likesNbr = 0;
        result.forEach(Element => {
          likesNbr += Element.likes;
        });
        res.status(200).json({ like: likesNbr })
      }
    })
    .catch(err => res.status(500).json({ error: "Erreur dans la requête sql !" }))
}

//Get all disLikies
exports.getAllDislikes = (req, res) => {
  PostReaction.findAll({
    where: { idPost: req.body.idPost, postType: req.body.postTableName, dislikes: 1 },
    attributes: ['dislikes']
  })
    .then(result => {
      if (result.length === 0) {
        res.status(200).json({ dislike: 0 })
      } else {
        let dislikesNbr = 0;
        result.forEach(Element => {
          dislikesNbr += Element.dislikes;
        });
        res.status(200).json({ dislike: dislikesNbr })
      }

    })
    .catch(err => res.status(500).json({ error: "Erreur dans la requête sql !" }))
}

//this allows to knw if a user has liked or disliked a post
exports.userReact = (req, res) => {
  PostReaction.findOne({
    where: { id: req.body.id, userId: req.body.userId },
    attributes: ['likes', 'dislikes']
  })
    .then(result => {
      if ((result.likes === 0 || null) && (result.dislikes === 0 || null)) {
        res.status(200).json({ like: false, dislike: false })
      } else if (result.likes === 1) {
        res.status(200).json({ like: true, dislike: false })
      } else if (result.dislikes === 1) {
        res.status(200).json({ like: false, dislike: true })
      }

    })
    .catch(err => res.status(500).json({ error: "Erreur dans la requête sql !" }))
}
function commentUser(comments){
  return new Promise((resolve, reject) =>{
    let nbrComments = comments.length
    comments.forEach(comment =>{
      User.findOne({where: comment.userId})
      .then(user =>{
        comment['dataValues'].pseudo = user.pseudo;
        nbrComments--;
        if(nbrComments === 0) resolve(comments)
      }).catch((err) =>{
        reject(err)
      })
    })
  })
}