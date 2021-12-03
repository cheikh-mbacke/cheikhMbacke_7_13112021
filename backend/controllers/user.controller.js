
const db = require("../models");
const User = db.Users;
const Privilege = db.Privileges;
const Post = db.Posts;
const TextPost = db.TextPosts;
const LinkPost = db.LinkPosts;
const VideoPost = db.VideoPosts;
const PostReaction = db.PostReactions;
const Comment = db.Comments;

// Delete a User with the specified id in the request
exports.deleteUser = (req, res) => {
    console.log(req.body);
    const userId = req.body.userId;
    destroyUserTextPosts(userId).then(() => {
        destroyUserLinkPosts(userId).then(() => {
            destroyUserVideoPosts(userId).then(() => {
                destroyUserPosts(userId).then(() => {
                    destroyUserComments(userId).then(() => {
                        destroyUserReactions(userId).then(() => {
                            destroyUserCredentials(userId).then(() => {
                                res.status(200).json({ message: "succès" })
                            }).catch(err => res.status(500).json({message: err}))
                        }).catch(err => res.status(500).json({message: err}))
                    }).catch(err => res.status(500).json({message: err}))
                }).catch(err => res.status(500).json({message: err}))
            }).catch(err => res.status(500).json({message: err}))
        }).catch(err => res.status(500).json({message: err}))
    }).catch(err => res.status(500).json({message: err}))
};

//get standars users 
exports.standardsUsers = (req, res) => {
    Privilege.findAll({ where: { role: 'user' }, attributes: ['userId'] })
        .then(result => {
            const ids = []
            result.forEach(obj => ids.push(obj.userId))
            User.findAll({ where: { id: ids } })
                .then(users => res.status(200).json(users))
                .catch(() => res.status(500).json({ error: "Erreur dans la requête sql !" }))
        })
        .catch((err) => res.status(500).json({ error: "Erreur dans la requête sql !" + err }))
}

//get admin users 
exports.adminUsers = (req, res) => {
    Privilege.findAll({ where: { role: 'admin' }, attributes: ['userId'] })
        .then(result => {
            const ids = []
            result.forEach(obj => ids.push(obj.userId))
            User.findAll({ where: { id: ids } })
                .then(users => res.status(200).json(users))
                .catch(() => res.status(500).json({ error: "Erreur dans la requête sql !" }))
        })
        .catch((err) => res.status(500).json({ error: "Erreur dans la requête sql !" + err }))
}

function destroyUserCredentials(userId) {

    return new Promise((resolve, reject) => {
        //delete user from privileges table
        Privilege.destroy({
            where: { userId: userId }
        }).then(num => {
            if (num == 1) {
                //delete user from users table
                User.destroy({
                    where: { id: userId }
                }).then(() => resolve())
            } else {
                reject()
            }
        }).catch(err => reject(err));
    })
}

function destroyUserTextPosts(userId) {

    return new Promise((resolve, reject) => {
        //Retriev posts from posts table and delete them
        Post.findAll({
            where: { userId: userId, postType: "TextPosts" }
        }).then(result => {
            if (result.length !== 0) {
                //delete text posts from TextPosts table
                let ids = []
                result.forEach(elt => ids.push(elt.idPost))
                TextPost.destroy({
                    where: { id: ids }
                }).then(() => resolve()).catch(err => reject(err))
            } else {
                resolve()
            }
        }).catch(err => reject(err));
    })
}

function destroyUserLinkPosts(userId) {
    return new Promise((resolve, reject) => {
        //Retriev posts from posts table and delete them
        Post.findAll({
            where: { userId: userId, postType: "LinkPosts" }
        }).then(result => {
            if (result.length !== 0) {
                //delete link posts from TextPosts table
                let ids = []
                result.forEach(elt => ids.push(elt.idPost))
                LinkPost.destroy({
                    where: { id: ids }
                }).then(() => resolve()).catch(err => reject(err))
            } else {
                resolve()
            }
        }).catch(err => reject(err));
    })
}

function destroyUserVideoPosts(userId) {
    return new Promise((resolve, reject) => {
        //Retriev posts from posts table and delete them
        Post.findAll({
            where: { userId: userId, postType: "VideoPosts" }
        }).then(result => {
            if (result.length !== 0) {
                //delete video posts from TextPosts table
                let ids = []
                result.forEach(elt => ids.push(elt.idPost))
                VideoPost.destroy({
                    where: { id: ids }
                }).then(() => resolve()).catch(err => reject(err))
            } else {
                resolve()
            }
        }).catch(err => reject(err));
    })
}

function destroyUserPosts(userId) {
    return new Promise((resolve, reject) => {
        Post.destroy({
            where: { userId: userId }
        }).then(() => {
            resolve()
        }).catch(err => reject(err));
    })
}

function destroyUserComments(userId) {
    return new Promise((resolve, reject) => {
        Comment.destroy({
            where: { userId: userId }
        }).then(() => {
            resolve()
        }).catch(err => reject(err));
    })
}

function destroyUserReactions(userId) {
    return new Promise((resolve, reject) => {
        PostReaction.destroy({
            where: { userId: userId }
        }).then(() => {
            resolve()
        }).catch(err => reject(err));
    })
}
