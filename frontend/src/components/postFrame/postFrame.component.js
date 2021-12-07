import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import 'suneditor/dist/css/suneditor.min.css';
import { linkPost } from '../../actions/post.action'
import './postFrame.component.css'
import imgTest from '../test.jpg'
class PostFrame extends Component {

    constructor(props) {
        super(props);
        this.handleSubmitPost = this.handleSubmitPost.bind(this);

    }

    handleSubmitPost(form, userId) {
        const postData = {
            title: form.elements.title.value,
            url: form.elements.url.value,
            userId: userId
        }
        console.log(postData);
        const { dispatch } = this.props;

        dispatch(linkPost(postData))
            .then(() => {
                window.location.reload()
            })
    }
    render() {
        const { user: currentUser, message } = this.props;
        if (!currentUser) {
            return <Redirect to="/login" />;
        }
        return (
            <div className="card postFrame">
                <div className="card-body px-0 pb-0">
                    <div className="position-relative mb-2 px-2">
                        <div className="ConnectedBadge rounded-circle bg-success"></div>
                        <div className="ml-3 d-flex justify-content-between">
                            <p>Cheikh</p>
                            <p>publié le <em>10/12/2021</em></p>
                        </div>
                    </div>
                    <div className="mb-2 px-2">
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem obcaecati assumenda
                            nemo, qui temporibus repellendus porro commodi quam blanditiis. Error.
                        </p>
                    </div>
                    <div>
                        <img src={imgTest} className="img-fluid" alt="photo postée" />
                    </div>
                    {/*<div className="embed-responsive embed-responsive-16by9">
                        <video controls="controls" style="object-fit: cover;" id="videoPost">
                            <source src="./test(480p).mp4" type="video/mp4" />
                            Sorry, your browser doesn't support embedded videos.
                        </video>
                    </div>
                    */}
                    <hr />
                    <div className="interactItems ">
                        <p><i className="far fa-thumbs-up"></i> <br className="gotoAlign" />Aimer <br className="gotoAlign" />(400)</p>
                        <p><i className="far fa-thumbs-down"></i> <br className="gotoAlign" /> Déprécier <br className="gotoAlign" />(100)</p>
                        <p data-toggle="collapse" href="#postFrameCollapse" role="button" aria-expanded="false"
                            aria-controls="postFrameCollapse">
                            <i className="far fa-comments"></i><br className="gotoAlign" />
                            Commenter<br className="gotoAlign" />
                            (0)
                        </p>
                    </div>
                    <div className="collapse" id="postFrameCollapse">
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
                            <div>
                                <div className="d-flex mb-2">
                                    <div className="frameProfil" >
                                        <img
                                            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                                            className="img-fluid img rounded-circle"
                                            alt="photo de profil"
                                        />
                                    </div>
                                    <div className="card ml-2 mt-2 p-1" >
                                        <div className="card-body p-2">
                                            <div>
                                                <p><strong>Cheikh</strong>, <em>10/12/2021</em></p>
                                            </div>
                                            This is some text within a card body.
                                        </div>
                                    </div>
                                </div>
                            </div>
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

export default connect(mapStateToProps)(PostFrame);










