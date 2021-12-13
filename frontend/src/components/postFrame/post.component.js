import React, { Component } from 'react'
import Moment from 'moment';
import { connect } from "react-redux";
import CommentComponent from './comment.component';
import CommentService from '../../services/comment.service'
import PostReactService from '../../services/postReaction.service'
import PostService from '../../services/post.service';
import UserService from '../../services/user.service'
import { Redirect } from 'react-router-dom'
class PostComponent extends Component {

    constructor(props) {
        super(props);
        this.handlePostComment = this.handlePostComment.bind(this);
        this.handleReaction = this.handleReaction.bind(this);
        this.recupUser = this.recupUser.bind(this);

        this.state = {
            datas: this.props.datas
        }
    };

    recupUser(userId) {
        return new Promise((resolve, reject) => {
            UserService.getOneUser(userId)

                .then(user => {
                    console.log(user);
                    resolve(`/deleteProfil?userId=${userId}&email=${user.email}&pseudo=${user.pseudo}&register=${user.createdAt}`)
                }).catch(err => {
                    reject(err)
                })
        })

    }


    handlePostComment(commentData) {

        CommentService.postComment(commentData)
            .then(result => {

                this.setState = {
                    datas: this.state.datas.comments = result.data
                }
                this.forceUpdate()

            }).catch(err => {
                console.log(err);
            })

    }
    handleReaction(reactData) {
        PostReactService.Reaction(reactData)
            .then(result => {
                this.props.datas.userHasLiked = result.data.userHasLiked;
                this.props.datas.userHasDisLiked = result.data.userHasDisLiked;

                this.setState = {
                    datas: this.props.datas.likes = result.data.like,
                    datas: this.props.datas.dislikes = result.data.dislike,
                }

                this.forceUpdate()

            }).catch(err => console.log(err))
    }




    render() {
        const { user: currentUser } = this.props;
        return (
            <div className="card postFrame mb-2" >
                <div className="card-body px-0 pb-0">
                    <div className="position-relative mb-2 px-2">
                        <div className="d-flex justify-content-between">
                            <p>
                                <strong>{this.props.datas.pseudo}</strong>
                                <a className='pl-2 text-primary' role='button' onClick={() => {
                                    this.recupUser(this.props.datas.userId)
                                        .then(url => {
                                            document.location.href = url
                                        })

                                }}  >
                                    <i className="fas fa-sign-in-alt"></i>
                                </a>
                            </p>
                            <p><em>{Moment(this.props.datas.createdAt).format('DD-MM-YYYY')}</em></p>
                        </div>

                    </div>

                    {this.state.datas.content &&

                        <div className="mb-2 px-2" dangerouslySetInnerHTML={{ __html: this.state.datas.content }} >
                        </div>
                    }

                    {this.state.datas.title &&
                        <div className="mb-2 px-2">
                            <p>{this.state.datas.title}</p>
                            {this.state.datas.url &&
                                <a href={this.state.datas.url}>{this.state.datas.url}</a>
                            }
                        </div>
                    }


                    {this.state.datas.imgPath &&
                        <div>
                            <img src={this.state.datas.imgPath} className="img-fluid" alt="photo postée" />
                        </div>
                    }

                    {this.state.datas.videoPath &&
                        <div className="embed-responsive embed-responsive-16by9">
                            <video controls="controls" style={{ objectFit: "cover" }} id="videoPost">
                                <source src={this.state.datas.videoPath} type="video/mp4" />
                                Sorry, your browser doesn't support embedded videos.
                            </video>
                        </div>
                    }
                    <hr />
                    <div className="interactItems">
                        <p className={this.props.datas.userHasLiked ? "text-primary" : ""} onClick={() => {
                            const like = this.props.datas.userHasLiked ? 0 : 1
                            const types = {
                                TextPosts: "text",
                                LinkPosts: "link",
                                VideoPosts: "video",
                                ImgPosts: "img"
                            }
                            const reactData = {
                                postTableName: this.state.datas.postType,
                                idPost: this.state.datas.id,
                                userId: this.props.user.userId,
                                like: like,
                                type: types[this.state.datas.postType],
                                userReact: "like"
                            }

                            this.handleReaction(reactData)
                        }}>
                            <i className="far fa-thumbs-up"></i> <br className="gotoAlign" />Aimer <br className="gotoAlign" />({this.props.datas.likes})</p>
                        <p className={this.props.datas.userHasDisLiked ? "text-primary" : ""} onClick={() => {
                            const dislike = this.props.datas.userHasDisLiked ? 0 : 1
                            const types = {
                                TextPosts: "text",
                                LinkPosts: "link",
                                VideoPosts: "video",
                                ImgPosts: "img"
                            }
                            const reactData = {
                                postTableName: this.state.datas.postType,
                                idPost: this.state.datas.id,
                                userId: this.props.user.userId,
                                dislike: dislike,
                                type: types[this.state.datas.postType],
                                userReact: "dislike"
                            }

                            this.handleReaction(reactData)
                        }}>

                            <i className="far fa-thumbs-down"></i> <br className="gotoAlign" /> Déprécier <br className="gotoAlign" />({this.props.datas.dislikes})
                        </p>
                        <p data-toggle="collapse" href={`#post${this.props.idCollapse}`} role="button" aria-expanded="false"
                            aria-controls="postFrameCollapse">
                            <i className="far fa-comments"></i> <br className="gotoAlign" />
                            Commenter<br className="gotoAlign" />
                            ({this.state.datas.comments.length})
                        </p>
                    </div>

                    <div className="collapse" id={`post${this.props.idCollapse}`}>
                        <div className="card card-body comments">
                            <div className="d-flex">
                                <div className="frameProfil">
                                    <img
                                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                                        className="img-fluid img rounded-circle"
                                        alt="photo de profil"
                                    />
                                </div>
                                <form action="" className="ml-2 flex-grow-1" onSubmit={(e) => {
                                    e.preventDefault()
                                    const postData = {
                                        content: e.target.elements.comment.value,
                                        userId: this.state.datas.userId,
                                        idPost: this.state.datas.id,
                                        pseudo: this.state.datas.pseudo,
                                    }
                                    this.handlePostComment(postData)
                                    e.target.elements.comment.value = ""
                                }}>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="comment" placeholder="Ajouter un commentaire ..." />
                                    </div>
                                </form>
                            </div>
                            {this.state.datas.comments.length === 0 ?
                                <div className="text-center pt-2"><p><em>Aucun commentaire</em></p></div>
                                :
                                <CommentComponent comments={this.state.datas.comments} />
                            }

                        </div>
                    </div>
                </div>
                {currentUser.role === 'admin' &&
                    <div className='btn btn-danger' onClick={() => {
                        console.log(this.state.datas);
                        PostService.deletePost(
                            {
                                idPost: this.state.datas.id,
                                userId: this.state.datas.userId,
                                postType: this.state.datas.postType
                            })
                            .then(result => {
                                if (result.data.message === 1) {

                                    alert("Post supprimé !")
                                    window.location.reload()

                                } else {
                                    alert(result.data.message)
                                }
                            })
                            .catch(err => {
                                alert(err)
                            })
                    }}>Supprimer</div>
                }
            </div>
        )
    }


}

function mapStateToProps(state) {
    const { user } = state.auth;
    const { message } = state.message;
    return {
        user,
        message,
    };
}

export default connect(mapStateToProps)(PostComponent);