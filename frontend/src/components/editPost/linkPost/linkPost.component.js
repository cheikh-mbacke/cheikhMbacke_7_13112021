import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import 'suneditor/dist/css/suneditor.min.css';
import { linkPost } from '../../../actions/post.action'
import PostService from "../../../services/post.service";

class LinkPost extends Component {

    constructor(props) {
        super(props);
        this.handleSubmitPost = this.handleSubmitPost.bind(this);
        this.handleUpdatePost = this.handleUpdatePost.bind(this)
        this.state = {
            authError: false,
        }

    }

    handleSubmitPost(form, userId) {
        const postData = {
            title: form.elements.title.value,
            url: form.elements.url.value,
            userId: userId
        }
        const { dispatch } = this.props;

        dispatch(linkPost(postData))
            .then(() => {
                window.location.reload()
            }).catch(err => {
                this.setState = {
                    authError: this.state.authError = true,
                }
                this.forceUpdate()
            })
    }
    handleUpdatePost(form){
        const postData = {
            title: form.elements.title.value,
            idPost: this.props.idPost,
            url: form.elements.url.value,
            postType: "LinkPosts"
        }
        PostService.updatePost(postData)
        .then(response => {
            alert('Votre post a été mis à jour !')
            document.location.href ="/home"
        }).catch(err => {
            console.log(err);
        })
    }
    render() {
        const { user: currentUser, message } = this.props;
        if (!currentUser) {
            return <Redirect to="/login" />;
        }
        return (
            <form className="pb-2" onSubmit={(e) => {
                e.preventDefault()
                if(this.props.update){
                    this.handleUpdatePost(e.target)
                }else{
                    this.handleSubmitPost(e.target, currentUser.userId)
                }
                
            }}>
                <div className="form-group">
                    <textarea className="form-control"
                        name="title" placeholder="Titre ... (facultatif)"
                        rows="3">

                    </textarea>
                </div>
                <div className="form-group">
                    <input type="url" name="url" id="url"
                        placeholder="https://example.com"
                        className="form-control"
                        required />
                </div>
                <div className="form-group w-75 m-auto pb-2">
                    <input type="submit" className="w-100" value="Poster" />
                </div>
                {this.state.authError &&
                    <div className="alert alert-danger w-75 m-auto" role="alert">
                        Vous n'êtes pas autorisés à poster !
                    </div>
                }
            </form>
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

export default connect(mapStateToProps)(LinkPost);











