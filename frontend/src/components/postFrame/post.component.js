import React, { Component } from 'react'
import Moment from 'moment';
import { connect } from "react-redux";
import CommentComponent from './comment.component';
import CommentService from '../../services/comment.service'
class PostComponent extends Component {

    constructor(props) {
        super(props);
        this.handlePostComment= this.handlePostComment.bind(this);
        this.state = {
            datas: this.props.datas
        }
    };
    
    handlePostComment(commentData) {

        CommentService.postComment(commentData)
        .then(result => {
            
            this.setState = {
                datas: this.state.datas.comments = result.data
            }
            console.log(result.data);
            console.log(this.state.datas.comments);
            this.forceUpdate()
            
        }).catch(err => {
            console.log(err);
        })

    }

    

    render() {
        return (
            <div className="card postFrame mb-2" >
                <div className="card-body px-0 pb-0">
                    <div className="position-relative mb-2 px-2">


                        <div className="d-flex justify-content-between">
                            <p>
                                <strong>{this.props.datas.pseudo}</strong>
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
                    <div className="interactItems ">
                        <p><i className="far fa-thumbs-up"></i> <br className="gotoAlign" />Aimer <br className="gotoAlign" />(400)</p>
                        <p><i className="far fa-thumbs-down"></i> <br className="gotoAlign" /> Déprécier <br className="gotoAlign" />(100)</p>
                        <p data-toggle="collapse" href={`#post${this.props.idCollapse}`} role="button" aria-expanded="false"
                            aria-controls="postFrameCollapse">
                            <i className="far fa-comments"></i> <br className="gotoAlign" />
                            Commenter<br className="gotoAlign" />
                            ({this.state.datas.comments.length})
                        </p>
                    </div>
                    <div className="collapse" id={`post${this.props.idCollapse}`}>
                        <div className="card card-body">
                            <div className="d-flex">
                                <div className="frameProfil">
                                    <img
                                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                                        className="img-fluid img rounded-circle"
                                        alt="photo de profil"
                                    />
                                </div>
                                <form action="" className="ml-2 flex-grow-1" onSubmit={(e) =>{
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
                                        <input type="text" className="form-control" name="comment" placeholder="Ajouter un commentaire ..."  />
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