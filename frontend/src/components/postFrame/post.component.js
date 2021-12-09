import React, { Component } from 'react'
import Moment from 'moment';
import { connect } from "react-redux";
import CommentComponent from './comment.component';
class PostComponent extends Component {


    render() {
        console.log(this.props.datas);
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

                    {this.props.datas.content &&

                        <div className="mb-2 px-2" dangerouslySetInnerHTML={{ __html: this.props.datas.content }} >
                        </div>
                    }

                    {this.props.datas.title &&
                        <div className="mb-2 px-2">
                            <p>{this.props.datas.title}</p>
                            {this.props.datas.url &&
                                <a href={this.props.datas.url}>{this.props.datas.url}</a>
                            }
                        </div>
                    }


                    {this.props.datas.imgPath &&
                        <div>
                            <img src={this.props.datas.imgPath} className="img-fluid" alt="photo postée" />
                        </div>
                    }

                    {this.props.datas.videoPath &&
                        <div className="embed-responsive embed-responsive-16by9">
                            <video controls="controls" style={{ objectFit: "cover" }} id="videoPost">
                                <source src={this.props.datas.videoPath} type="video/mp4" />
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
                            ({this.props.datas.comments.length})
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
                                <form action="" className="ml-2 flex-grow-1">
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Ajouter un commentaire ..." id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    </div>
                                </form>
                            </div>
                            {this.props.datas.comments.length === 0 ?

                                <div className="text-center pt-2"><p><em>Aucun commentaire</em></p></div>
                                :


                                <CommentComponent comments={this.props.datas.comments} />



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